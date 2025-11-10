import React, { useState, useEffect, useRef, useCallback } from "react";
import { careerVision } from "@/api/careerVisionClient";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Plus, MessageSquare, Loader2, LineChart, Trash2, RefreshCcw } from "lucide-react";
import MessageBubble from "../components/chat/MessageBubble";

const OFFLINE_PLAYBOOKS = [
  {
    id: "weekly-sprint",
    title: "Plan a 7-day sprint",
    description: "Daily focus areas to build momentum.",
    prompt: "Outline a 7-day plan to grow as a product designer while I'm searching for jobs.",
    response: `**7-Day Momentum Sprint**

**Day 1 - Anchor your goals**
- Save the top 3 job descriptions you love.
- Highlight recurring skills and metrics to target.

**Day 2 - Portfolio audit**
- Pick one case study to tighten.
- Add a short paragraph on challenge -> action -> outcome.

**Day 3 - Story bank**
- Draft two STAR stories for leadership and collaboration wins.
- Record quick voice notes to practice delivery.

**Day 4 - Skill reps**
- Block 60 minutes for a targeted skill drill (design system tokens, user flows, etc.).
- Log what you produced as proof of progress.

**Day 5 - Outreach + follow-up**
- Message two peers or mentors with a concise update and ask.
- Refresh your LinkedIn headline to match target roles.

**Day 6 - Metrics check-in**
- Track applications sent, responses, and portfolio views.
- Note one bottleneck and one win.

**Day 7 - Reset + plan**
- Reflect on what moved the needle.
- Set one measurable goal for the coming week.`,
  },
  {
    id: "interview-stack",
    title: "Interview warm-up stack",
    description: "Prep stories, drills, and follow-ups fast.",
    prompt: "Give me a fast-track interview warm-up for a product design role.",
    response: `**Interview Warm-Up Stack**

1. **Refresh your stories**
- Choose three projects that show discovery, execution, and collaboration.
- Outline Situation -> Task -> Action -> Result in three bullets each.

2. **Practice narrative delivery**
- Record yourself answering "Tell me about yourself" (2 minutes max).
- Time-box five mock answers with a 90-second timer.

3. **Design challenge drill**
- Pick a random prompt (e.g., "Improve campus navigation") and sketch flows for 10 minutes.
- Summarize problem framing, constraints, and success metrics.

4. **Stakeholder Q&A list**
- Brainstorm six stakeholder-specific questions (PM, engineer, director).
- Prepare two thoughtful questions you can close with.

5. **Closing checklist**
- Draft a short thank-you template with a results recap.
- Bundle portfolio links and resume into one quick-share doc.`,
  },
  {
    id: "resume-refresh",
    title: "Resume refresh toolkit",
    description: "Turn bullets into quantifiable wins.",
    prompt: "Help me refresh my resume bullets so they sound impactful.",
    response: `**Resume Refresh Toolkit**

**Step 1 - Inventory your wins**
- List recent projects and quantify impact (users reached, revenue, time saved).
- Capture quotes or feedback snippets from stakeholders.

**Step 2 - Metric-forward formula**
- Use: Action verb + ownership + outcome metric + proof.
- Example: "Led a 5-person squad to launch onboarding redesign, cutting drop-off 23% in 60 days."

**Step 3 - Tighten formatting**
- Start each line with a strong verb and keep tense consistent.
- Limit bullets to two lines; move detail into supporting links if needed.

**Step 4 - Target the role**
- Mirror keywords from your top job description.
- Add a "Key wins" or "Toolbox" section to surface relevant skills quickly.

**Step 5 - Final polish**
- Run a spell and grammar check.
- Export to PDF and align your LinkedIn headline with the updated story.`,
  },
  {
    id: "portfolio-sprint",
    title: "Portfolio case study sprint",
    description: "Ship a polished story in two hours.",
    prompt: "Give me a playbook for polishing a portfolio case study quickly.",
    response: `**Portfolio Case Study Sprint**

**Phase 1 - Frame the problem (30 min)**
- Write a crisp problem statement, audience, and success metric.
- Capture constraints (timeline, resources, tools).

**Phase 2 - Process highlights (45 min)**
- Choose three moments that show your thinking: insight, iteration, validation.
- Pair each with a visual (sketch, screenshot, data snippet).

**Phase 3 - Outcome + proof (20 min)**
- Quantify impact (metrics, testimonials, qualitative wins).
- Add a "What I'd do next" reflection.

**Phase 4 - Visual polish (25 min)**
- Apply consistent typography, spacing, and color cues.
- Check that mobile and desktop views stay readable.

**Phase 5 - Share + feedback (15 min)**
- Publish or export, then send to a peer for a quick gut check.
- Capture their feedback in a backlog for the next iteration.`,
  },
];

export default function Chat() {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => careerVision.auth.me(),
  });

  const {
    data: aiStatus,
    refetch: refetchAiStatus,
    isFetching: isFetchingAiStatus,
  } = useQuery({
    queryKey: ['ai-status'],
    queryFn: () => careerVision.agents.status(),
    enabled: !!user,
    refetchOnWindowFocus: false,
  });

  const loadConversation = useCallback(async (conversationId) => {
    try {
  const convo = await careerVision.agents.getConversation(conversationId);
      setCurrentConversation(convo);
      setMessages(convo.messages || []);
    } catch (error) {
      console.error("Error loading conversation:", error);
    }
  }, []);

  const createConversation = useCallback(
    async (metadataOverrides = {}) => {
      try {
        const now = new Date();
        const type = metadataOverrides.type || "chat";
        const defaultLabel = type === "chart" ? "Chart Thread" : "Career Chat";
        const metadata = {
          name: `${metadataOverrides.name || defaultLabel} ${now.toLocaleString()}`,
          type,
          ...metadataOverrides,
        };

  const newConvo = await careerVision.agents.createConversation({
          agent_name: "career_advisor",
          metadata,
        });

        setConversations((prev) => [newConvo, ...prev]);
        setCurrentConversation(newConvo);
        setMessages(newConvo.messages || []);
        await refetchAiStatus();
        return newConvo;
      } catch (error) {
        console.error("Error creating conversation:", error);
        return null;
      }
    },
    [refetchAiStatus]
  );

  const createNewConversation = useCallback(() => {
    void createConversation();
  }, [createConversation]);

  const createChartConversation = useCallback(() => {
    void createConversation({ type: "chart", name: "Chart Advisor" });
  }, [createConversation]);

  const loadConversations = useCallback(async () => {
    try {
  const convos = await careerVision.agents.listConversations({ agent_name: "career_advisor" });
      setConversations(convos || []);

      // Auto-select first conversation or create new one if none exist
      if (convos && convos.length > 0) {
        loadConversation(convos[0].id);
      } else {
        createNewConversation();
      }
    } catch (error) {
      console.error("Error loading conversations:", error);
    }
  }, [createNewConversation, loadConversation]);

  // Load conversations on mount
  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user, loadConversations]);

  // Subscribe to conversation updates
  useEffect(() => {
    if (!currentConversation?.id) return undefined;

    let isMounted = true;
    let cleanup = () => {};

  careerVision.agents
      .subscribeToConversation(currentConversation.id, (data) => {
        if (isMounted) {
          setMessages(data.messages || []);
        }
      })
      .then((unsubscribe) => {
        cleanup = unsubscribe;
      })
      .catch((error) => {
        console.error("Error subscribing to conversation:", error);
      });

    return () => {
      isMounted = false;
      cleanup();
    };
  }, [currentConversation?.id]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !currentConversation || isSending) return;

    setIsSending(true);
    const messageText = inputMessage;
    setInputMessage("");

    try {
  await careerVision.agents.addMessage(currentConversation, {
        role: "user",
        content: messageText,
      });
      await refetchAiStatus();
    } catch (error) {
      console.error("Error sending message:", error);
      setInputMessage(messageText);
    } finally {
      setIsSending(false);
    }
  };
  const deleteConversation = useCallback(
    async (conversationId) => {
      try {
  await careerVision.agents.deleteConversation(conversationId);
        await loadConversations();
        if (currentConversation?.id === conversationId) {
          setMessages([]);
        }
        await refetchAiStatus();
      } catch (error) {
        console.error("Error deleting conversation:", error);
      }
    },
    [currentConversation?.id, loadConversations, refetchAiStatus]
  );

  const handleOfflinePlaybook = useCallback(
    async (playbook) => {
      try {
        let activeConversation = currentConversation;

        if (!activeConversation?.id) {
          activeConversation = await createConversation();
          if (!activeConversation?.id) {
            return;
          }
        }

        const conversationId = activeConversation.id;
        const now = Date.now();
        const userTimestamp = new Date(now).toISOString();
        const assistantTimestamp = new Date(now + 500).toISOString();

        const userMessage = {
          id: `local-user-${now}`,
          role: "user",
          content: playbook.prompt,
          created_at: userTimestamp,
          tool_calls: [],
        };

        const assistantMessage = {
          id: `local-assistant-${now + 1}`,
          role: "assistant",
          content: playbook.response,
          created_at: assistantTimestamp,
          tool_calls: [],
        };

        setMessages((prev) => [...prev, userMessage, assistantMessage]);

  await careerVision.agents.appendOfflineInteraction(conversationId, {
          prompt: playbook.prompt,
          response: playbook.response,
          playbookId: playbook.id,
        });

        await loadConversation(conversationId);
        await refetchAiStatus();
      } catch (error) {
        console.error("Error applying offline playbook:", error);
      }
    },
    [currentConversation, createConversation, loadConversation, refetchAiStatus]
  );

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Conversations Sidebar */}
      <div className="w-80 border-r border-slate-200 bg-white hidden lg:flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <div className="flex flex-col gap-2">
            <Button
              onClick={createNewConversation}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Conversation
            </Button>
            <Button
              onClick={createChartConversation}
              variant="outline"
              className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              <LineChart className="w-4 h-4 mr-2" />
              Add Chart Thread
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {conversations.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-2 text-slate-300" />
              <p className="text-sm">No conversations yet</p>
            </div>
          ) : (
            conversations.map((convo) => {
              const isActive = currentConversation?.id === convo.id;
              const isChart = convo.metadata?.type === "chart";
              return (
                <div key={convo.id} className="group flex items-center gap-2">
                  <button
                    onClick={() => loadConversation(convo.id)}
                    className={`
                      w-full text-left p-3 rounded-lg transition-all flex-1
                      ${isActive
                        ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-600'
                        : 'hover:bg-slate-50'
                      }
                    `}
                  >
                    <div className="font-medium text-sm text-slate-900 truncate">
                      {convo.metadata?.name || 'Career Chat'}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {new Date(convo.created_date).toLocaleDateString()}
                    </div>
                    {isChart && (
                      <span className="mt-2 inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                        Chart
                      </span>
                    )}
                  </button>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      void deleteConversation(convo.id);
                    }}
                    className="hidden rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 group-hover:flex"
                    aria-label="Delete conversation"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900">AI Career Advisor</h2>
                <p className="text-xs text-slate-500">Your personal career guidance assistant</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => refetchAiStatus()}
              disabled={isFetchingAiStatus}
              className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                aiStatus?.online !== false
                  ? 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50'
              } ${isFetchingAiStatus ? 'opacity-70' : ''}`}
            >
              <span
                className={`inline-flex h-2.5 w-2.5 rounded-full ${
                  aiStatus?.online !== false ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                }`}
              />
              {aiStatus?.online !== false ? 'AI Online' : 'AI Offline'}
              {aiStatus?.online !== false && aiStatus?.lastModel && (
                <span className="text-[10px] text-emerald-600">• {aiStatus.lastModel}</span>
              )}
              <RefreshCcw className={`h-3.5 w-3.5 ${isFetchingAiStatus ? 'animate-spin' : ''}`} />
            </button>
          </div>
          {aiStatus?.online === false && aiStatus?.offlineMessage && (
            <p className="mt-2 text-xs text-amber-600">
              {aiStatus.offlineMessage}
              {aiStatus?.lastError && (
                <span className="ml-1 text-amber-500">(Last error: {aiStatus.lastError})</span>
              )}
            </p>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-4xl space-y-6">
            {aiStatus?.online === false && (
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 shadow-sm">
                <div>
                  <p className="text-sm font-semibold text-amber-900">Offline playbooks</p>
                  <p className="text-xs text-amber-700">
                    Pick a topic to drop a ready-made guide into the chat while the live AI is offline.
                  </p>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {OFFLINE_PLAYBOOKS.map((playbook) => (
                    <button
                      key={playbook.id}
                      type="button"
                      onClick={() => void handleOfflinePlaybook(playbook)}
                      className="rounded-xl border border-amber-200 bg-white/70 px-4 py-3 text-left shadow-sm transition hover:border-amber-300 hover:bg-white"
                    >
                      <div className="text-sm font-semibold text-amber-900">{playbook.title}</div>
                      <p className="mt-1 text-xs text-amber-700">{playbook.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.length === 0 ? (
              <div className="flex min-h-[320px] items-center justify-center">
                <Card className="max-w-lg border-none shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
                  <CardHeader>
                    <CardTitle className="text-center text-slate-900">
                      Welcome to Your AI Career Advisor!
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600 text-center">
                      I'm here to help you with:
                    </p>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-600" />
                        Career planning and goal setting
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-600" />
                        Skill development strategies
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-600" />
                        Job search and interview preparation
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-600" />
                        Career transition guidance
                      </li>
                    </ul>
                    <p className="text-slate-600 text-center text-sm mt-4">
                      Ask me anything about your career!
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <>
                {messages.map((message, idx) => (
                  <MessageBubble key={message.id || idx} message={message} />
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-slate-200 bg-white p-4">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                name="message"
                placeholder="Ask me anything about your career..."
                className="flex-1 border-slate-300 focus:border-purple-500 focus:ring-purple-500"
                disabled={isSending}
              />
              <Button
                type="submit"
                disabled={!inputMessage.trim() || isSending}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
              >
                {isSending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}