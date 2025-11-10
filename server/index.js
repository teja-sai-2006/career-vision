/* eslint-env node */
import dotenv from "dotenv";
import express from "express";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const envRoot = process.cwd();
dotenv.config({ path: path.resolve(envRoot, ".env") });
dotenv.config({ path: path.resolve(envRoot, ".env.local"), override: true });

const app = express();
app.use(express.json({ limit: "2mb" }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STATE_PATH = path.join(__dirname, "state.json");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_MODEL_CHAIN = (process.env.GEMINI_MODEL_CHAIN || "gemini-2.0-flash-lite,gemini-2.0-flash,gemini-flash-latest")
  .split(",")
  .map((token) => token.trim())
  .filter(Boolean);
const DEFAULT_OFFLINE_MESSAGE =
  "I'm offline right now, so I'm sharing guidance from saved playbooks instead.";
const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta";

async function readStateFromDisk() {
  try {
    const raw = await readFile(STATE_PATH, "utf-8");
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeStateToDisk({});
      return {};
    }
    console.error("Failed to read state from disk", error);
    return {};
  }
}

async function writeStateToDisk(data) {
  const payload = data ?? {};
  await writeFile(STATE_PATH, JSON.stringify(payload, null, 2), "utf-8");
}

app.get("/api/state", async (_req, res) => {
  const state = await readStateFromDisk();
  res.json(state);
});

app.post("/api/state", async (req, res) => {
  await writeStateToDisk(req.body);
  res.json({ success: true });
});

function mapMessagesToGeminiContents(messages) {
  return messages.map((message) => {
    const role = message.role === "assistant" ? "model" : "user";
    const prefix = message.role === "system" ? "[system instruction]\n" : "";
    const content = Array.isArray(message.content)
      ? message.content.join("\n")
      : String(message.content ?? "");

    return {
      role,
      parts: [{ text: `${prefix}${content}`.trim() }],
    };
  });
}

async function callGemini(model, messages, temperature = 0.6) {
  if (!GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY environment variable");
  }

  const url = `${GEMINI_API_BASE}/models/${encodeURIComponent(model)}:generateContent?key=${GEMINI_API_KEY}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: mapMessagesToGeminiContents(messages),
      generationConfig: {
        temperature,
        maxOutputTokens: 1024,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini ${model} failed with ${response.status}: ${errorBody}`);
  }

  const payload = await response.json();
  const candidate = payload?.candidates?.[0];
  const text = candidate?.content?.parts?.map((part) => part.text).join("\n").trim();

  if (!text) {
    throw new Error(`Gemini ${model} returned no text`);
  }

  return {
    text,
    model,
    usage: payload?.usageMetadata || null,
  };
}

app.post("/api/ai/chat", async (req, res) => {
  const { messages = [], temperature } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array is required" });
  }

  if (!GEMINI_API_KEY) {
    return res.json({
      ok: true,
      offline: true,
      message: DEFAULT_OFFLINE_MESSAGE,
      model: null,
      error: "GEMINI_API_KEY is not configured on the server",
    });
  }

  let lastError = null;
  for (const model of GEMINI_MODEL_CHAIN) {
    try {
      const result = await callGemini(model, messages, temperature);
      return res.json({ ok: true, offline: false, ...result });
    } catch (error) {
      lastError = error;
      console.warn(`[AI] Model ${model} failed`, error);
    }
  }

  return res.json({
    ok: true,
    offline: true,
    message: DEFAULT_OFFLINE_MESSAGE,
    model: null,
    error: lastError?.message || "All Gemini models failed",
  });
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

const PORT = Number(process.env.PORT ?? 4000);
app.listen(PORT, () => {
  console.log(`Career Vision mock API listening on http://localhost:${PORT}`);
});
