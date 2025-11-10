<div align="center">

# Career Vision

Your personalised career operations hub with learning plans, assessments, job search tooling, and an AI advisor.

</div>

## 🌍 Overview

Career Vision is an end-to-end career operating system designed for students and professionals who want to plan their next move with structure, insight, and coaching support. The platform brings together planning tools, guided assessments, learning recommendations, and an AI assistant into a single workspace so that you can:

- Capture goals, skills, and job applications in one dashboard.
- Analyse strengths through curated quizzes and assessment frameworks.
- Discover courses, domains, and action plans tailored to your responses.
- Chat with an AI advisor that leverages offline playbooks when the network is unavailable.

The experience mimics a dedicated career coach that remembers your history, keeps your documentation organised, and nudges progress through contextual recommendations.

## 🎯 Why Career Vision?

- **Holistic planning**: tie together goals, skills, interviews, jobs, and learning with linked records instead of scattered spreadsheets.
- **Actionable insights**: the quiz and assessment engines translate qualitative answers into recommended domains and next steps.
- **Always-on guidance**: the AI advisor persists conversations for each profile and continues to help even if the mock API or Gemini service is offline.
- **Collaboration ready**: every entity is backed by a consistent schema, making it easy to extend or integrate with real services later.

## 🔄 How the Platform Works

1. **Sign in / seed profile** – The app boots with a sample account so you can explore the workspace immediately.
2. **Persisted workspace** – `careerVisionClient` syncs data with the Express mock API when online and mirrors everything to localStorage for offline continuity.
3. **Organise initiatives** – Manage goals, job applications, interviews, skills, and documents through focused CRUD screens with filters and progress indicators.
4. **Assess & learn** – Complete assessments and a 36-question scenario-based quiz to unlock recommended domains, subdomains, and courses from the curated catalog.
5. **AI advisor** – Start a conversation in the chat page. When the Gemini API is configured, responses come from the live model; otherwise, Career Vision serves contextual offline guidance captured in playbooks.
6. **Track momentum** – Dashboards showcase upcoming interviews, goal completion percentages, and recent quiz results so you always know what to tackle next.

## 🧭 Core Modules

- **Dashboard**: overview cards for goals, job search, skills, and upcoming tasks.
- **AI Advisor**: contextual chat with conversation history scoped per user.
- **Goals & Skills**: plan initiatives, log progress, and connect skills to goals.
- **Job Search & Interviews**: monitor applications, interview rounds, follow-ups, and supporting notes.
- **Learning Library & Courses**: browse domain-specific resources aligned with quiz outcomes.
- **Assessments & Quiz**: structured surveys and scenarios that produce tailored recommendations.
- **Document Vault**: manage resumes, cover letters, and certificates with version history and metadata tagging.

## ✨ Feature Highlights

- **AI Career Advisor** – guided assistant that persists conversations per user and stays available offline with cached guidance.
- **Goal & Skill Management** – track goals, job applications, interviews, and skill progress with rich CRUD workflows.
- **Learning & Assessment Library** – explore curated domains, courses, and assessments mapped to recommended pathways.
- **Career Quiz Engine** – answer 36 scenario-based questions to receive tailored domain and subdomain recommendations.
- **Document Vault** – upload resumes, cover letters, and certificates with version control and tagging.
- **Offline-friendly Storage** – the `careerVisionClient` keeps profile-scoped data in local storage whenever the API is unavailable.

## 🏗️ Architecture & Data Flow

- **Client app (React + Vite)** handles routing (`src/pages`), UI state, and component composition. It communicates exclusively through `careerVisionClient`, keeping feature pages declarative.
- **Data layer (`src/api/careerVisionClient.js`)** provides entity APIs (`careerVision.entities.*`) and auth helpers. It abstracts persistence so the UI never worries about the online/offline boundary.
- **Mock API (`server/index.js`)** simulates a backend with seeded JSON (`server/state.json`). All reads and writes are mirrored here when available.
- **Offline cache** stores the entire workspace under the `careerVision.offlineState` key, ensuring user context survives refreshes or API downtime.
- **AI integrations** live behind `careerVision.agents`. When `GEMINI_API_KEY` is set, chat routes proxy to Gemini; otherwise, the advisor falls back to curated advice.

## 🔐 Data Layer Overview

All user-specific resources (goals, documents, conversations, quiz results, etc.) are routed through `src/api/careerVisionClient.js`. The client:

- Persists to the mock API when online.
- Mirrors changes to localStorage under `careerVision.offlineState`.
- Hydrates profile data after a refresh, even if the API is down.
- Exposes entity-specific helper methods (e.g., `careerVision.entities.JobApplication.create`).

## 🧱 Tech Stack

- React 19 + Vite 7
- React Router 7
- @tanstack/react-query for client state and caching
- Tailwind CSS and shadcn-inspired UI components
- Express mock API (`server/index.js`) for local data seeding
- Lucide icons for consistent visuals

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/teja-sai-2006/career-vision.git
cd career-vision
npm install
```

### Environment Variables

Copy `.env.local` (already included) and add your [Gemini API key](https://aistudio.google.com/) if you want live AI responses:

```
GEMINI_API_KEY=your-key-here
```

Without a key, the assistant falls back to curated offline playbooks.

### Running the App

```bash
npm run dev
```

This concurrently starts:

- `npm run dev:client` – Vite dev server at http://localhost:5173
- `npm run dev:server` – Express mock API at http://localhost:4000

The client proxies API requests to the mock server; no additional setup is required.

### Production Build & Preview

```bash
npm run build
npm run preview
```

`preview` serves the production build locally so you can validate routing, assets, and API calls before deployment.

## 📁 Project Structure

```
career-vision/
├── public/                # Static assets served as-is
├── server/                # Express mock API and seed state
├── src/
│   ├── api/               # `careerVisionClient` – profile-scoped data layer
│   ├── assets/            # Images and media
│   ├── components/        # UI and feature components
│   ├── data/              # Static datasets (domains, quiz questions, catalog)
│   ├── Entities/          # JSON schema definitions for stored records
│   ├── pages/             # Route-aligned screens
│   ├── lib/               # Shared utilities (cn helper, etc.)
│   └── utils/             # Routing helpers and misc utilities
├── package.json
└── README.md
```

## 🧪 Quality Checklist

- ESLint: `npm run lint`
- Production build: `npm run build`
- Preview build locally: `npm run preview`

## 🛣️ Roadmap Ideas

- Real authentication and multi-user management backed by a hosted database.
- Calendar integrations for interview scheduling and reminders.
- Expanded analytics dashboard surfacing weekly progress snapshots.
- Integration with real job boards and LMS providers for live data.

## 📣 Contributing

1. Create a feature branch from `main`.
2. Update documentation where applicable.
3. Ensure linting and build succeed.
4. Submit a pull request with context on behaviour and testing.

## � Maintainer & Contact

- **Name**: Teja Sai
- **Email**: tejasai13052006@gmail.com

For collaboration requests or questions about the roadmap, reach out via email or open an issue in this repository.
