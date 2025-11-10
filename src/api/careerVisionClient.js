const REMOTE_STATE_ENDPOINT = "/api/state";
const DEFAULT_USER_PASSWORD = "12345678";
const SEED_USER_ID = "user-tejasai";
const SEED_USER_EMAIL = "tejasai13052006@gmail.com";
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const DEFAULT_OFFLINE_MESSAGE =
  "I'm offline right now, so I'm sharing guidance from saved playbooks instead.";
const DEFAULT_AI_STATUS = {
  online: true,
  lastModel: null,
  lastChecked: null,
  lastError: null,
  usage: null,
  offlineMessage: DEFAULT_OFFLINE_MESSAGE,
};
const MAX_MESSAGES_FOR_AI = 12;

function sanitizeErrorMessage(rawMessage) {
  if (!rawMessage) return null;
  let normalized = String(rawMessage);
  normalized = normalized.replace(/<[^>]+>/g, "");
  normalized = normalized.replace(/\s+/g, " ").trim();

  if (normalized.includes("Cannot POST /api/ai/chat")) {
    normalized = "API route /api/ai/chat is not reachable. Start the mock API server (npm run dev).";
  }

  if (/NOT_FOUND/i.test(normalized) && /gemini/i.test(normalized)) {
    normalized = "Gemini model name not supported for the v1beta API. Update GEMINI_MODEL_CHAIN with current model IDs.";
  }

  if (normalized.length > 160) {
    normalized = `${normalized.slice(0, 157)}...`;
  }

  return normalized;
}

function isoDateOffset(days) {
  const date = new Date(Date.now() + days * MS_PER_DAY);
  return date.toISOString().split("T")[0];
}

function isoTimestampOffset(days) {
  return new Date(Date.now() + days * MS_PER_DAY).toISOString();
}

function isoDateTimeOffset(days, hours = 0, minutes = 0) {
  const date = new Date(Date.now() + days * MS_PER_DAY);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString().slice(0, 16);
}

function createSeedUserProfile() {
  const now = new Date().toISOString();
  return {
    id: SEED_USER_ID,
    email: SEED_USER_EMAIL,
    password: DEFAULT_USER_PASSWORD,
    full_name: "Teja Sai",
    role: "Career Explorer",
    current_role: "Product Designer",
    company: "BrightPath Labs",
    years_experience: 6,
    industry: "Technology",
    profile_type: "professional",
    student_profile: {
      institution: "",
      degree: "",
      branch: "",
      current_year: "",
      graduation_year: "",
      cgpa: "",
      placement_focus: "",
      notes: "",
    },
    skills: [
      "Design Strategy",
      "User Research",
      "Figma",
    ],
    career_interests: [
      "Leadership",
      "UX Research",
      "Product Strategy",
    ],
    bio: "Product designer focused on crafting inclusive experiences that help people navigate their careers with confidence.",
    created_date: now,
    updated_date: now,
  };
}

const seedUserProfile = createSeedUserProfile();
const { password: _password, ...sanitizedSeedUser } = seedUserProfile;

const defaultData = {
  currentUser: sanitizedSeedUser,
  currentUserId: seedUserProfile.id,
  session: null,
  aiStatus: { ...DEFAULT_AI_STATUS },
  profilesByUserId: {},
  users: [
    seedUserProfile,
    {
      id: "user-92182c2c-ba44-4968-96a1-95d9bed5fbe3",
      full_name: "sarha",
      email: "sarha@gmail.com",
      password: DEFAULT_USER_PASSWORD,
      role: "Career Explorer",
      current_role: "",
      company: "",
      years_experience: 0,
      industry: "",
      profile_type: "professional",
      student_profile: {
        institution: "",
        degree: "",
        branch: "",
        current_year: "",
        graduation_year: "",
        cgpa: "",
        placement_focus: "",
        notes: "",
      },
      skills: [],
      career_interests: [],
      bio: "",
      created_date: isoTimestampOffset(-1),
      updated_date: isoTimestampOffset(-1),
    },
  ],
  goals: [
    {
      id: "goal-1",
      title: "Build a career portfolio website",
      description: "Create a modern portfolio site that highlights my most impactful projects and outcomes.",
      category: "portfolio",
      status: "in_progress",
      priority: "high",
      target_date: isoDateOffset(30),
      progress: 65,
      notes: "Need to gather testimonials from recent clients.",
      created_date: isoTimestampOffset(-35),
      updated_date: isoTimestampOffset(-2),
      created_by: SEED_USER_EMAIL,
    },
    {
      id: "goal-2",
      title: "Earn the Google UX certificate",
      description: "Complete the professional certificate to deepen UX research capabilities.",
      category: "education",
      status: "not_started",
      priority: "medium",
      target_date: isoDateOffset(110),
      progress: 10,
      notes: "Block Sunday mornings for coursework.",
      created_date: isoTimestampOffset(-20),
      updated_date: isoTimestampOffset(-3),
      created_by: SEED_USER_EMAIL,
    },
    {
      id: "goal-3",
      title: "Grow leadership skills",
      description: "Shadow senior design leads and collect feedback on leadership style.",
      category: "career_change",
      status: "in_progress",
      priority: "high",
      target_date: isoDateOffset(150),
      progress: 35,
      notes: "Schedule monthly 1:1s with design manager.",
      created_date: isoTimestampOffset(-55),
      updated_date: isoTimestampOffset(-5),
      created_by: SEED_USER_EMAIL,
    },
  ],
  jobApplications: [
    {
      id: "job-1",
      company: "Aurora Systems",
      position: "Senior Product Designer",
      job_url: "https://careers.aurora.example/jobs/123",
      status: "interviewing",
      application_date: isoDateOffset(-18),
      salary_range: "$120k - $140k",
      location: "Remote - North America",
      job_type: "full_time",
      remote_type: "remote",
      notes: "Second round scheduled, prep case study.",
      contact_person: "Morgan Lee",
      contact_email: "morgan.lee@aurora.example",
      follow_up_date: isoDateOffset(2),
      created_date: isoTimestampOffset(-18),
      updated_date: isoTimestampOffset(-1),
      created_by: SEED_USER_EMAIL,
    },
    {
      id: "job-2",
      company: "Northwind Retail",
      position: "UX Researcher",
      job_url: "https://northwind.example/careers/uxr",
      status: "applied",
      application_date: isoDateOffset(-7),
      salary_range: "$110k - $130k",
      location: "Seattle, WA",
      job_type: "full_time",
      remote_type: "hybrid",
      notes: "Sent thank-you email to recruiter.",
      contact_person: "Jamie Patel",
      contact_email: "jamie.patel@northwind.example",
      follow_up_date: isoDateOffset(10),
      created_date: isoTimestampOffset(-7),
      updated_date: isoTimestampOffset(-1),
      created_by: SEED_USER_EMAIL,
    },
  ],
  interviews: [
    {
      id: "int-1",
      company: "Aurora Systems",
      position: "Senior Product Designer",
      interview_date: isoDateTimeOffset(2, 20, 30),
      interview_type: "video_call",
      interviewer_name: "Morgan Lee",
      status: "scheduled",
      preparation_notes: "Review product vision deck and case study.",
      interview_notes: "",
      outcome: "pending",
      location: "Zoom",
      created_date: isoTimestampOffset(-1),
      updated_date: isoTimestampOffset(-1),
      created_by: SEED_USER_EMAIL,
    },
  ],
  skills: [
    {
      id: "skill-1",
      name: "Design Systems",
      category: "technical",
      proficiency: "advanced",
      target_level: "expert",
      years_experience: 4,
      last_practiced: isoDateOffset(-5),
      notes: "Partnered with frontend team to document tokens.",
      created_date: isoTimestampOffset(-5),
      updated_date: isoTimestampOffset(-2),
      created_by: SEED_USER_EMAIL,
    },
    {
      id: "skill-2",
      name: "Stakeholder Communication",
      category: "soft_skill",
      proficiency: "intermediate",
      target_level: "advanced",
      years_experience: 5,
      last_practiced: isoDateOffset(-12),
      notes: "Led quarterly roadmap review last week.",
      created_date: isoTimestampOffset(-8),
      updated_date: isoTimestampOffset(-3),
      created_by: SEED_USER_EMAIL,
    },
  ],
  careerQuizzes: [],
  documents: [
    {
      id: "doc-1",
      title: "Resume 2025",
      document_type: "resume",
      file_url: "https://example-files.online/resume.pdf",
      version: "v3.1",
      description: "Latest resume tailored for product design leadership roles.",
      tags: ["resume", "product", "design"],
      last_updated: isoDateOffset(-4),
      is_current: true,
      created_date: isoTimestampOffset(-6),
      updated_date: isoTimestampOffset(-4),
      created_by: SEED_USER_EMAIL,
    },
    {
      id: "doc-2",
      title: "Cover Letter - Aurora",
      document_type: "cover_letter",
      file_url: "https://example-files.online/cover-letter.pdf",
      version: "v1.0",
      description: "Tailored cover letter for Aurora Systems.",
      tags: ["cover letter", "aurora"],
      last_updated: isoDateOffset(-6),
      is_current: false,
      created_date: isoTimestampOffset(-6),
      updated_date: isoTimestampOffset(-5),
      created_by: SEED_USER_EMAIL,
    },
  ],
  assessmentDomains: [
    {
      id: "domain-technology",
      name: "Technology & Development",
      description: "Deepen core coding and software fundamentals.",
      icon: "Code2",
      gradient: "from-violet-500 via-indigo-500 to-blue-500",
      order: 1,
    },
    {
      id: "domain-web",
      name: "Web & Experience Design",
      description: "Polish front-end craft and UX storytelling.",
      icon: "MonitorSmartphone",
      gradient: "from-sky-500 to-cyan-500",
      order: 2,
    },
    {
      id: "domain-data",
      name: "Data Science & AI",
      description: "Build analytics, machine learning, and AI mastery.",
      icon: "Brain",
      gradient: "from-emerald-500 to-teal-500",
      order: 3,
    },
    {
      id: "domain-career",
      name: "Career & Interview Prep",
      description: "Prepare for real interviews and track your growth over time.",
      icon: "UserCheck",
      gradient: "from-rose-500 to-purple-500",
      order: 4,
    },
    {
      id: "domain-cloud",
      name: "Cloud & DevOps",
      description: "Deploy scalable systems and master cloud automation.",
      icon: "CloudCog",
      gradient: "from-blue-500 via-sky-500 to-cyan-500",
      order: 5,
    },
    {
      id: "domain-healthcare",
      name: "Healthcare & Medical Careers",
      description: "Prepare for clinical pathways and patient-centered excellence.",
      icon: "Stethoscope",
      gradient: "from-rose-400 via-red-500 to-orange-500",
      order: 6,
    },
    {
      id: "domain-legal",
      name: "Legal & Policy",
      description: "Sharpen legal reasoning and policy advocacy skills.",
      icon: "Scale",
      gradient: "from-amber-500 to-yellow-500",
      order: 7,
    },
  ],
  assessmentSubdomains: [
    {
      id: "sub-coding-practice",
      domain_id: "domain-technology",
      name: "Coding Practice",
      description: "Daily challenges to reinforce language fluency and problem solving.",
      order: 1,
    },
    {
      id: "sub-competitive-programming",
      domain_id: "domain-technology",
      name: "Competitive Programming",
      description: "Timed contests and algorithm sprints to sharpen speed and accuracy.",
      order: 2,
    },
    {
      id: "sub-frontend-projects",
      domain_id: "domain-web",
      name: "Frontend Projects",
      description: "Real-world briefs to practise responsive layouts and component architecture.",
      order: 1,
    },
    {
      id: "sub-ui-ux-design",
      domain_id: "domain-web",
      name: "UI/UX Design",
      description: "Scenario-based exercises covering research, heuristics, and visual systems.",
      order: 2,
    },
    {
      id: "sub-data-foundations",
      domain_id: "domain-data",
      name: "Data Foundations",
      description: "Interactive tracks to master Python, SQL, and analytics workflows.",
      order: 1,
    },
    {
      id: "sub-ml-competitions",
      domain_id: "domain-data",
      name: "ML Competitions",
      description: "Leaderboard-driven machine learning challenges with real datasets.",
      order: 2,
    },
    {
      id: "sub-ai-challenges",
      domain_id: "domain-data",
      name: "AI Challenges",
      description: "Applied AI problem sets spanning NLP, vision, and analytics cases.",
      order: 3,
    },
    {
      id: "sub-generative-ai",
      domain_id: "domain-data",
      name: "Generative & Applied AI",
      description: "Workshops for large language models, prompt design, and applied AI.",
      order: 4,
    },
    {
      id: "sub-responsible-ai",
      domain_id: "domain-data",
      name: "Responsible AI & Ethics",
      description: "Frameworks to evaluate fairness, transparency, and governance.",
      order: 5,
    },
    {
      id: "sub-technical-interviews",
      domain_id: "domain-career",
      name: "Technical Interviews",
      description: "Structured prep paths to benchmark algorithms, data structures, and systems thinking.",
      order: 1,
    },
    {
      id: "sub-behavioral-interviews",
      domain_id: "domain-career",
      name: "Behavioral Interviews",
      description: "Practice STAR storytelling and leadership scenarios with targeted feedback.",
      order: 2,
    },
    {
      id: "sub-product-case-interviews",
      domain_id: "domain-career",
      name: "Product & Case Interviews",
      description: "Framework drills for product sense, strategy cases, and consulting prompts.",
      order: 3,
    },
    {
      id: "sub-cloud-foundations",
      domain_id: "domain-cloud",
      name: "Cloud Foundations",
      description: "Certification-aligned labs for AWS, Azure, and Google Cloud.",
      order: 1,
    },
    {
      id: "sub-devops-automation",
      domain_id: "domain-cloud",
      name: "DevOps Automation",
      description: "Hands-on pipelines covering CI/CD, infrastructure as code, and observability.",
      order: 2,
    },
    {
      id: "sub-site-reliability",
      domain_id: "domain-cloud",
      name: "Site Reliability Engineering",
      description: "Operational excellence drills for high-availability systems.",
      order: 3,
    },
    {
      id: "sub-medical-knowledge",
      domain_id: "domain-healthcare",
      name: "Medical Knowledge",
      description: "Board-style questions covering anatomy, physiology, and pharmacology.",
      order: 1,
    },
    {
      id: "sub-clinical-skills",
      domain_id: "domain-healthcare",
      name: "Clinical Skills",
      description: "Simulated cases to practice differential diagnosis and patient communication.",
      order: 2,
    },
    {
      id: "sub-healthtech",
      domain_id: "domain-healthcare",
      name: "Healthcare Technology",
      description: "Digital health, EHR workflows, and AI in medicine accelerators.",
      order: 3,
    },
    {
      id: "sub-legal-foundations",
      domain_id: "domain-legal",
      name: "Legal Foundations",
      description: "Core doctrine refreshers across contracts, torts, and constitutional law.",
      order: 1,
    },
    {
      id: "sub-bar-prep",
      domain_id: "domain-legal",
      name: "Bar & Case Prep",
      description: "Exam prep banks and case-brief drills with timed modules.",
      order: 2,
    },
    {
      id: "sub-policy-advocacy",
      domain_id: "domain-legal",
      name: "Policy & Advocacy",
      description: "Simulations for policy analysis, negotiation, and public affairs strategy.",
      order: 3,
    },
  ],
  assessmentWebsites: [
    { id: "site-codewars", subdomain_id: "sub-coding-practice", name: "Codewars Kata", url: "https://www.codewars.com/", description: "Advance through progressively harder katas across dozens of languages.", difficulty: "mixed", is_free: true },
    { id: "site-exercism", subdomain_id: "sub-coding-practice", name: "Exercism Tracks", url: "https://exercism.io/", description: "Peer-mentored code practice with automated tests and mentoring support.", difficulty: "beginner", is_free: true },
    { id: "site-edabit", subdomain_id: "sub-coding-practice", name: "Edabit Challenges", url: "https://edabit.com/", description: "Short, daily puzzles great for reinforcing programming fundamentals.", difficulty: "beginner", is_free: true },
    { id: "site-freecodecamp", subdomain_id: "sub-coding-practice", name: "freeCodeCamp Certifications", url: "https://www.freecodecamp.org/learn", description: "Project-based certification paths spanning responsive web, JS, and APIs.", difficulty: "beginner", is_free: true },
    { id: "site-hackerrank", subdomain_id: "sub-competitive-programming", name: "HackerRank Challenges", url: "https://www.hackerrank.com/", description: "Timed algorithm tracks with editorial breakdowns and leaderboards.", difficulty: "mixed", is_free: true },
    { id: "site-codechef", subdomain_id: "sub-competitive-programming", name: "CodeChef Practice", url: "https://www.codechef.com/practice", description: "Monthly contests and topic playlists curated by difficulty.", difficulty: "advanced", is_free: true },
    { id: "site-codeforces", subdomain_id: "sub-competitive-programming", name: "Codeforces Rounds", url: "https://codeforces.com/", description: "Daily programming rounds to benchmark competitive problem solving.", difficulty: "advanced", is_free: true },
    { id: "site-atcoder", subdomain_id: "sub-competitive-programming", name: "AtCoder Contests", url: "https://atcoder.jp/", description: "Algorithm contests from Japan with beginner-friendly to grandmaster tiers.", difficulty: "advanced", is_free: true },
    { id: "site-frontend-mentor", subdomain_id: "sub-frontend-projects", name: "Frontend Mentor", url: "https://www.frontendmentor.io/challenges", description: "Pixel-perfect briefs covering HTML, CSS, and modern component patterns.", difficulty: "intermediate", is_free: false },
    { id: "site-devchallenges", subdomain_id: "sub-frontend-projects", name: "DevChallenges", url: "https://devchallenges.io/", description: "Community-led challenges for responsive design and full-stack apps.", difficulty: "mixed", is_free: true },
    { id: "site-codepen", subdomain_id: "sub-frontend-projects", name: "CodePen Challenges", url: "https://codepen.io/challenges", description: "Weekly creative prompts to experiment with CSS and micro-interactions.", difficulty: "mixed", is_free: true },
    { id: "site-w3schools", subdomain_id: "sub-frontend-projects", name: "W3Schools Quiz", url: "https://www.w3schools.com/quiztest/", description: "Quick quizzes that reinforce HTML, CSS, and JavaScript basics.", difficulty: "beginner", is_free: true },
    { id: "site-uxtools", subdomain_id: "sub-ui-ux-design", name: "UX Tools Challenges", url: "https://uxtools.co/challenges", description: "Product design scenarios focusing on flows, IA, and UX writing.", difficulty: "intermediate", is_free: true },
    { id: "site-nng", subdomain_id: "sub-ui-ux-design", name: "NN/g UX Quiz", url: "https://www.nngroup.com/quiz/", description: "Evaluate your knowledge of usability heuristics and UX best practices.", difficulty: "beginner", is_free: true },
    { id: "site-uxcel", subdomain_id: "sub-ui-ux-design", name: "Uxcel Skill Checks", url: "https://uxcel.com/challenges", description: "Timed UI skills checks covering typography, layout, and accessibility.", difficulty: "mixed", is_free: false },
    { id: "site-datacamp", subdomain_id: "sub-data-foundations", name: "DataCamp Tracks", url: "https://www.datacamp.com/", description: "Interactive Python, SQL, and BI learning paths with instant feedback.", difficulty: "beginner", is_free: false },
    { id: "site-dataquest", subdomain_id: "sub-data-foundations", name: "DataQuest Missions", url: "https://www.dataquest.io/", description: "Hands-on missions for analytics, data engineering, and visualization.", difficulty: "intermediate", is_free: false },
    { id: "site-kaggle-learn", subdomain_id: "sub-data-foundations", name: "Kaggle Learn", url: "https://www.kaggle.com/learn", description: "Short, practical lessons on ML, data viz, and applied AI notebooks.", difficulty: "beginner", is_free: true },
    { id: "site-kaggle-competitions", subdomain_id: "sub-ml-competitions", name: "Kaggle Competitions", url: "https://www.kaggle.com/competitions", description: "Global machine learning competitions with public and private leaderboards.", difficulty: "advanced", is_free: true },
    { id: "site-drivendata", subdomain_id: "sub-ml-competitions", name: "DrivenData", url: "https://www.drivendata.org/", description: "Social impact challenges blending machine learning and real-world data.", difficulty: "advanced", is_free: true },
    { id: "site-analytics-vidhya", subdomain_id: "sub-ml-competitions", name: "Analytics Vidhya", url: "https://www.analyticsvidhya.com/contest/", description: "Hackathons, case studies, and data-thons for analytics practitioners.", difficulty: "mixed", is_free: true },
    { id: "site-hackerrank-ai", subdomain_id: "sub-ai-challenges", name: "HackerRank AI", url: "https://www.hackerrank.com/domains/ai", description: "AI-focused tracks across statistics, NLP, and deep learning fundamentals.", difficulty: "mixed", is_free: true },
    { id: "site-kaggle-hackerrank", subdomain_id: "sub-ai-challenges", name: "Kaggle x HackerRank", url: "https://www.kaggle.com/HackerRank", description: "Joint datasets and notebooks curated for AI and ML interview preparation.", difficulty: "advanced", is_free: true },
    { id: "site-stratascratch", subdomain_id: "sub-ai-challenges", name: "StrataScratch", url: "https://www.stratascratch.com/", description: "Real company SQL and Python interview problems with detailed walkthroughs.", difficulty: "advanced", is_free: false },
    { id: "site-codingninjas-ai", subdomain_id: "sub-ai-challenges", name: "Coding Ninjas AI", url: "https://www.codingninjas.com/AI", description: "Structured AI interview prep spanning ML concepts and coding drills.", difficulty: "intermediate", is_free: false },
    { id: "site-hackerrank-prep", subdomain_id: "sub-technical-interviews", name: "HackerRank Interview Kit", url: "https://www.hackerrank.com/interview/interview-preparation-kit", description: "Curated data structure and algorithms plan mapped to interview rounds.", difficulty: "mixed", is_free: true },
    { id: "site-interviewbit", subdomain_id: "sub-technical-interviews", name: "InterviewBit Tracks", url: "https://www.interviewbit.com/", description: "Progressive interview curriculum with peer leaderboard and streaks.", difficulty: "advanced", is_free: true },
    { id: "site-leetcode", subdomain_id: "sub-technical-interviews", name: "LeetCode", url: "https://leetcode.com/", description: "Extensive DSA library with company-tagged problems and contests.", difficulty: "advanced", is_free: false },
    { id: "site-geeksforgeeks", subdomain_id: "sub-technical-interviews", name: "GeeksforGeeks Practice", url: "https://practice.geeksforgeeks.org/", description: "Topic-wise interview questions with editorial explanations and IDE.", difficulty: "mixed", is_free: true },
    { id: "site-pramp", subdomain_id: "sub-behavioral-interviews", name: "Pramp Mock Interviews", url: "https://www.pramp.com/", description: "Live peer mock interviews with structured behavioral prompts and feedback.", difficulty: "intermediate", is_free: true },
    { id: "site-biginterview", subdomain_id: "sub-behavioral-interviews", name: "Big Interview", url: "https://biginterview.com/", description: "Recorded practice questions with AI insights for behavioral and executive interviews.", difficulty: "mixed", is_free: false },
    { id: "site-levelsfyi-practice", subdomain_id: "sub-behavioral-interviews", name: "Levels.fyi Practice", url: "https://www.levels.fyi/practice/interviews/behavioral", description: "Scenario banks mapped to top tech companies with timed mock responses.", difficulty: "advanced", is_free: false },
    { id: "site-productalliance", subdomain_id: "sub-product-case-interviews", name: "Product Alliance Drills", url: "https://www.productalliance.com/practice", description: "Interactive product sense cases with scoring rubrics and exemplars.", difficulty: "advanced", is_free: false },
    { id: "site-rocketblocks", subdomain_id: "sub-product-case-interviews", name: "RocketBlocks", url: "https://www.rocketblocks.me/", description: "Micro-drills for consulting, strategy, and product case interviews.", difficulty: "advanced", is_free: false },
    { id: "site-preplounge", subdomain_id: "sub-product-case-interviews", name: "PrepLounge", url: "https://www.preplounge.com/en", description: "Global case interview community with live partner practice and analytics.", difficulty: "mixed", is_free: true },
    { id: "site-aws-skillbuilder", subdomain_id: "sub-cloud-foundations", name: "AWS Skill Builder", url: "https://skillbuilder.aws/", description: "Certification-aligned learning paths with interactive labs for AWS services.", difficulty: "mixed", is_free: true },
    { id: "site-azure-microsoft-learn", subdomain_id: "sub-cloud-foundations", name: "Microsoft Learn Azure", url: "https://learn.microsoft.com/en-us/training/azure/", description: "Role-based Azure modules with sandboxes and knowledge checks.", difficulty: "beginner", is_free: true },
    { id: "site-google-skills-boost", subdomain_id: "sub-cloud-foundations", name: "Google Cloud Skills Boost", url: "https://www.cloudskillsboost.google/", description: "Hands-on quests using Qwiklabs to practise Google Cloud workloads.", difficulty: "mixed", is_free: true },
    { id: "site-kodekloud", subdomain_id: "sub-devops-automation", name: "KodeKloud Hands-on Labs", url: "https://kodekloud.com/hands-on-labs/", description: "Browser-based DevOps labs covering Docker, Kubernetes, and Terraform.", difficulty: "mixed", is_free: false },
    { id: "site-hashicorp-learn", subdomain_id: "sub-devops-automation", name: "HashiCorp Learn", url: "https://developer.hashicorp.com/learn", description: "Guided tutorials for Terraform, Vault, Consul, and Waypoint automation.", difficulty: "intermediate", is_free: true },
    { id: "site-jenkins-tutorials", subdomain_id: "sub-devops-automation", name: "Jenkins Tutorial Center", url: "https://www.jenkins.io/solutions/tutorials/", description: "Pipeline walkthroughs and solution guides for CI/CD orchestration.", difficulty: "intermediate", is_free: true },
    { id: "site-google-sre-workbook", subdomain_id: "sub-site-reliability", name: "Google SRE Workbook", url: "https://sre.google/workbook/chapters/", description: "Practical exercises for implementing SRE principles and service objectives.", difficulty: "advanced", is_free: true },
    { id: "site-gremlin-labs", subdomain_id: "sub-site-reliability", name: "Gremlin Reliability Labs", url: "https://www.gremlin.com/community/tutorials/", description: "Chaos engineering scenarios to rehearse incident response and resilience.", difficulty: "advanced", is_free: true },
    { id: "site-pagerduty-labs", subdomain_id: "sub-site-reliability", name: "PagerDuty Community Labs", url: "https://www.pagerduty.com/resources/learn/", description: "On-call simulations and runbook templates for operations teams.", difficulty: "mixed", is_free: true },
    { id: "site-khan-health", subdomain_id: "sub-medical-knowledge", name: "Khan Academy Health & Medicine", url: "https://www.khanacademy.org/science/health-and-medicine", description: "Board-style practice questions paired with concise concept refreshers.", difficulty: "beginner", is_free: true },
    { id: "site-osmosis", subdomain_id: "sub-medical-knowledge", name: "Osmosis Library", url: "https://www.osmosis.org/", description: "High-yield medical videos and spaced-repetition question banks.", difficulty: "intermediate", is_free: false },
    { id: "site-amboss", subdomain_id: "sub-medical-knowledge", name: "AMBOSS Qbank", url: "https://www.amboss.com/us", description: "NBME-style clinical questions with evidence-based explanations.", difficulty: "advanced", is_free: false },
    { id: "site-geekymedics", subdomain_id: "sub-clinical-skills", name: "Geeky Medics OSCE Prep", url: "https://geekymedics.com/", description: "OSCE station checklists, videos, and flashcards for clinical exams.", difficulty: "intermediate", is_free: true },
    { id: "site-practicalclinicalskills", subdomain_id: "sub-clinical-skills", name: "Practical Clinical Skills", url: "https://www.practicalclinicalskills.com/", description: "Cardiac and pulmonary auscultation simulators with diagnostic drills.", difficulty: "mixed", is_free: true },
    { id: "site-shadowhealth", subdomain_id: "sub-clinical-skills", name: "Shadow Health Digital Clinic", url: "https://www.shadowhealth.com/", description: "Virtual patient interviews to build bedside manner and assessment skills.", difficulty: "advanced", is_free: false },
    { id: "site-himss-learning", subdomain_id: "sub-healthtech", name: "HIMSS Learning Center", url: "https://www.himss.org/resources", description: "On-demand sessions focused on digital health transformation and HIT strategy.", difficulty: "mixed", is_free: true },
    { id: "site-healthit-playbook", subdomain_id: "sub-healthtech", name: "Health IT Playbook", url: "https://www.healthit.gov/playbook/", description: "Implementation guides for EHR adoption, interoperability, and telehealth.", difficulty: "intermediate", is_free: true },
    { id: "site-digital-health-labs", subdomain_id: "sub-healthtech", name: "Digital Health Innovation Lab", url: "https://www.digitalhealth.london/innovation-lab/", description: "Accelerator-style sprints exploring AI, remote monitoring, and patient apps.", difficulty: "advanced", is_free: false },
    { id: "site-casebriefs", subdomain_id: "sub-legal-foundations", name: "Casebriefs", url: "https://www.casebriefs.com/", description: "Concise case summaries, flashcards, and outlines across 1L core subjects.", difficulty: "beginner", is_free: true },
    { id: "site-cali-lessons", subdomain_id: "sub-legal-foundations", name: "CALI Lessons", url: "https://www.cali.org/lesson", description: "Interactive drills authored by law professors on doctrinal topics.", difficulty: "intermediate", is_free: true },
    { id: "site-harvardx-justice", subdomain_id: "sub-legal-foundations", name: "HarvardX Justice", url: "https://pll.harvard.edu/course/justice", description: "Ethics and law lecture series with Socratic case analysis exercises.", difficulty: "mixed", is_free: true },
    { id: "site-ncbex", subdomain_id: "sub-bar-prep", name: "NCBE Study Aids", url: "https://studyaids.ncbex.org/", description: "Official MBE, MEE, and MPT practice exams released by the NCBE.", difficulty: "advanced", is_free: false },
    { id: "site-barbri-free", subdomain_id: "sub-bar-prep", name: "BARBRI Free Prep", url: "https://www.barbri.com/free-bar-review/", description: "Diagnostic quizzes and mini-lectures aligned to bar exam subjects.", difficulty: "advanced", is_free: true },
    { id: "site-barmax", subdomain_id: "sub-bar-prep", name: "BarMax Practice", url: "https://testmaxprep.com/bar-exam", description: "Mobile-first bar prep platform with analytics and timed simulations.", difficulty: "advanced", is_free: false },
    { id: "site-coursera-policy", subdomain_id: "sub-policy-advocacy", name: "Coursera Public Policy", url: "https://www.coursera.org/specializations/public-policy", description: "Capstone-ready projects covering policy analysis, economics, and evaluation.", difficulty: "intermediate", is_free: false },
    { id: "site-harvard-negotiation", subdomain_id: "sub-policy-advocacy", name: "Harvard Negotiation Institute", url: "https://www.pon.harvard.edu/courses-and-training/", description: "Negotiation simulations and role-plays for advocacy and conflict resolution.", difficulty: "advanced", is_free: false },
    { id: "site-govlab-academy", subdomain_id: "sub-policy-advocacy", name: "The GovLab Academy", url: "https://www.thegovlab.org/academy.html", description: "Project-based coaching for civic innovation and public problem solving.", difficulty: "mixed", is_free: true },
    { id: "site-deeplearning-shortcourses", subdomain_id: "sub-generative-ai", name: "DeepLearning.AI Short Courses", url: "https://learn.deeplearning.ai/", description: "Hands-on generative AI build labs with guided notebooks and assessments.", difficulty: "mixed", is_free: true },
    { id: "site-huggingface-learn", subdomain_id: "sub-generative-ai", name: "Hugging Face Learn", url: "https://huggingface.co/learn", description: "Transformer tutorials, code walkthroughs, and certification-ready projects.", difficulty: "intermediate", is_free: true },
    { id: "site-google-genai-studio", subdomain_id: "sub-generative-ai", name: "Google Generative AI Studio", url: "https://cloud.google.com/generative-ai", description: "Prompt engineering codelabs using Vertex AI foundation models.", difficulty: "advanced", is_free: true },
    { id: "site-azure-responsible-ai", subdomain_id: "sub-responsible-ai", name: "Microsoft Responsible AI", url: "https://learn.microsoft.com/en-us/training/paths/responsible-ai-principles-practices/", description: "Learning path covering responsible AI principles, harms modeling, and mitigations.", difficulty: "intermediate", is_free: true },
    { id: "site-google-responsible-ai", subdomain_id: "sub-responsible-ai", name: "Google Responsible AI Practices", url: "https://ai.google/responsibilities/responsible-ai-practices/", description: "Toolkits and playbooks for building accountable machine learning systems.", difficulty: "mixed", is_free: true },
    { id: "site-partnership-ai", subdomain_id: "sub-responsible-ai", name: "Partnership on AI Labs", url: "https://partnershiponai.org/work/", description: "Case studies and assessment frameworks for auditing AI systems and governance.", difficulty: "advanced", is_free: true },
  ],
  assessmentResults: [
    {
      id: "result-frontend-mentor",
      website_id: "site-frontend-mentor",
      website_name: "Frontend Mentor",
      subdomain_name: "Frontend Projects",
      domain_name: "Web & Experience Design",
      score_obtained: 90,
      total_score: 100,
      percentage: 90,
      test_date: isoDateOffset(-12),
      notes: "Completed three responsive challenges and received community feedback.",
      certificate_url: "https://www.frontendmentor.io/solutions",
      created_by: SEED_USER_EMAIL,
      created_date: isoTimestampOffset(-12),
      updated_date: isoTimestampOffset(-1),
    },
    {
      id: "result-aws-skillbuilder",
      website_id: "site-aws-skillbuilder",
      website_name: "AWS Skill Builder",
      subdomain_name: "Cloud Foundations",
      domain_name: "Cloud & DevOps",
      score_obtained: 780,
      total_score: 850,
      percentage: 92,
      test_date: isoDateOffset(-8),
      notes: "Cleared the AWS Certified Cloud Practitioner prep exam simulator.",
      certificate_url: "https://skillbuilder.aws/",
      created_by: SEED_USER_EMAIL,
      created_date: isoTimestampOffset(-8),
      updated_date: isoTimestampOffset(-2),
    },
    {
      id: "result-generative-ai",
      website_id: "site-deeplearning-shortcourses",
      website_name: "DeepLearning.AI Short Courses",
      subdomain_name: "Generative & Applied AI",
      domain_name: "Data Science & AI",
      score_obtained: 48,
      total_score: 50,
      percentage: 96,
      test_date: isoDateOffset(-5),
      notes: "Completed the building with ChatGPT API capstone and published a demo.",
      certificate_url: "https://learn.deeplearning.ai/",
      created_by: SEED_USER_EMAIL,
      created_date: isoTimestampOffset(-5),
      updated_date: isoTimestampOffset(-1),
    },
    {
      id: "result-casebriefs",
      website_id: "site-casebriefs",
      website_name: "Casebriefs",
      subdomain_name: "Legal Foundations",
      domain_name: "Legal & Policy",
      score_obtained: 88,
      total_score: 100,
      percentage: 88,
      test_date: isoDateOffset(-3),
      notes: "Outlined 15 contracts cases and passed the cumulative knowledge quiz.",
      certificate_url: "https://www.casebriefs.com/",
      created_by: SEED_USER_EMAIL,
      created_date: isoTimestampOffset(-3),
      updated_date: isoTimestampOffset(-1),
    },
  ],
  uploads: [],
  conversations: [
    {
      id: "convo-1",
      agent_name: "career_advisor",
      ownerId: SEED_USER_ID,
      ownerEmail: SEED_USER_EMAIL,
      metadata: {
        name: "Career Chat Starter",
      },
      created_date: isoTimestampOffset(-3),
      updated_date: isoTimestampOffset(-1),
      messages: [
        {
          id: "msg-1",
          role: "assistant",
          content: "Hi Teja! How can I support your career journey today?",
          created_at: isoTimestampOffset(-3),
          tool_calls: [],
        },
      ],
    },
    {
      id: "convo-cca1312a-76a4-45f6-942b-b90625213d52",
      agent_name: "career_advisor",
      ownerId: "user-92182c2c-ba44-4968-96a1-95d9bed5fbe3",
      ownerEmail: "sarha@gmail.com",
      metadata: {
        name: "Career Chat 11/10/2025",
      },
      created_date: isoTimestampOffset(-2),
      updated_date: isoTimestampOffset(-2),
      messages: [
        {
          id: "msg-cbc3286c-5773-489b-aab5-0cbe9068dce0",
          role: "assistant",
          content: "Thanks for reaching out! Tell me a goal you're focusing on and I'll help you break it down.",
          created_at: isoTimestampOffset(-2),
          tool_calls: [],
        },
      ],
    },
    {
      id: "convo-e3a9204a-da08-41eb-9bf3-aa5ed61729e4",
      agent_name: "career_advisor",
      ownerId: "user-92182c2c-ba44-4968-96a1-95d9bed5fbe3",
      ownerEmail: "sarha@gmail.com",
      metadata: {
        name: "Career Chat 11/10/2025",
      },
      created_date: isoTimestampOffset(-2),
      updated_date: isoTimestampOffset(-2),
      messages: [
        {
          id: "msg-c9290611-e256-467f-81ca-4860ad5dea10",
          role: "assistant",
          content: "Thanks for reaching out! Tell me a goal you're focusing on and I'll help you break it down.",
          created_at: isoTimestampOffset(-2),
          tool_calls: [],
        },
      ],
    },
  ],
};

function clone(value) {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}

function generateId(prefix) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function createSessionToken(userId) {
  const raw = `${userId}:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`;
  if (typeof window !== "undefined" && typeof window.btoa === "function") {
    return window.btoa(raw);
  }

  const bufferCtor = typeof globalThis !== "undefined" ? globalThis.Buffer : undefined;
  if (bufferCtor) {
    return bufferCtor.from(raw).toString("base64");
  }

  return raw;
}

const PROFILE_SCOPED_COLLECTIONS = new Set([
  "goals",
  "documents",
  "jobApplications",
  "interviews",
  "skills",
  "conversations",
  "uploads",
  "assessmentResults",
  "careerQuizzes",
]);

function createEmptyProfileState(userId) {
  return {
    userId,
    goals: [],
    documents: [],
    jobApplications: [],
    interviews: [],
    skills: [],
    conversations: [],
    uploads: [],
    assessmentResults: [],
    careerQuizzes: [],
  };
}

function ensureProfilesContainer(data) {
  if (!data || typeof data !== "object") {
    return {};
  }
  if (!data.profilesByUserId || typeof data.profilesByUserId !== "object") {
    data.profilesByUserId = {};
  }
  return data.profilesByUserId;
}

function ensureProfileForUser(data, userId) {
  if (!userId) return null;
  const profiles = ensureProfilesContainer(data);
  if (!profiles[userId]) {
    profiles[userId] = createEmptyProfileState(userId);
  } else {
    PROFILE_SCOPED_COLLECTIONS.forEach((key) => {
      if (!Array.isArray(profiles[userId][key])) {
        profiles[userId][key] = [];
      }
    });
  }
  return profiles[userId];
}

function resolveOwnerIdFromRecord(record, data) {
  if (!record) return null;
  if (record.owner_id) return record.owner_id;
  if (record.ownerId) return record.ownerId;
  if (record.user_id) return record.user_id;
  if (record.userId) return record.userId;

  if (record.ownerEmail) {
    const match = data.users?.find(
      (item) => item.email?.toLowerCase() === String(record.ownerEmail).toLowerCase()
    );
    if (match) return match.id;
  }

  if (record.created_by) {
    const match = data.users?.find(
      (item) => item.email?.toLowerCase() === String(record.created_by).toLowerCase()
    );
    if (match) return match.id;
  }

  return data.currentUserId || data.session?.userId || data.users?.[0]?.id || null;
}

function migrateProfileCollections(data) {
  ensureProfilesContainer(data);

  const keys = Array.from(PROFILE_SCOPED_COLLECTIONS);
  const resolveOwnerEmail = (ownerId) =>
    data.users?.find((user) => user.id === ownerId)?.email || null;

  keys.forEach((key) => {
    const items = Array.isArray(data[key]) ? data[key] : [];
    items.forEach((item) => {
      const ownerId = resolveOwnerIdFromRecord(item, data);
      if (!ownerId) return;

      const profile = ensureProfileForUser(data, ownerId);
      if (!profile) return;

      if (!Array.isArray(profile[key])) {
        profile[key] = [];
      }

      if (profile[key].some((existing) => existing.id === item.id)) {
        return;
      }

      let recordToStore = item;
      if (key === "conversations") {
        const now = new Date().toISOString();
        const ownerEmail =
          item.ownerEmail ||
          item.owner_email ||
          resolveOwnerEmail(ownerId) ||
          (ownerId === SEED_USER_ID ? SEED_USER_EMAIL : null);

        recordToStore = {
          ...item,
          ownerId,
          owner_id: ownerId,
          ownerEmail,
          metadata: item.metadata || { name: "Career Chat" },
          created_date: item.created_date || now,
          updated_date: item.updated_date || item.created_date || now,
          messages: Array.isArray(item.messages)
            ? item.messages.map((message) => ({
                id: message.id || generateId("msg"),
                role: message.role || "assistant",
                content: message.content ?? "",
                created_at: message.created_at || now,
                tool_calls: Array.isArray(message.tool_calls) ? message.tool_calls : [],
              }))
            : [],
        };
      }

      profile[key].push(recordToStore);
    });
    data[key] = [];
  });

  if (Array.isArray(data.users)) {
    data.users.forEach((user) => ensureProfileForUser(data, user.id));
  }
}

function sanitizeUser(user) {
  if (!user) return null;
  const cleaned = clone(user);
  delete cleaned.password;
  return cleaned;
}

function getActiveUserRecord() {
  if (!state) return null;
  const candidates = [state.currentUserId, state.session?.userId, state.currentUser?.id].filter(Boolean);

  for (const candidate of candidates) {
    const match = state.users.find((user) => user.id === candidate);
    if (match) {
      return match;
    }
  }

  if (state.currentUser?.email) {
    const normalizedEmail = state.currentUser.email.toLowerCase();
    const match = state.users.find((user) => user.email?.toLowerCase() === normalizedEmail);
    if (match) {
      return match;
    }
  }

  return null;
}

function setActiveUser(record) {
  if (!state) {
    if (!record) {
      return;
    }
    throw new Error("State not initialized");
  }
  if (!record) {
    state.currentUser = null;
    state.currentUserId = null;
    return;
  }

  state.currentUser = sanitizeUser(record);
  state.currentUserId = record.id;
}

function ensureActiveUser() {
  const user = getActiveUserRecord();
  if (!user) {
    throw new Error("Not authenticated");
  }
  return user;
}

function getProfilesStore() {
  if (!state) {
    throw new Error("State not initialized");
  }
  return ensureProfilesContainer(state);
}

function ensureProfileState(userId) {
  if (!state) {
    throw new Error("State not initialized");
  }
  return ensureProfileForUser(state, userId);
}

function getScopedCollection(storageKey, { userId, silent } = {}) {
  if (!PROFILE_SCOPED_COLLECTIONS.has(storageKey)) {
    if (!Array.isArray(state[storageKey])) {
      state[storageKey] = [];
    }
    return state[storageKey];
  }

  const activeUser = userId || state.currentUserId || state.session?.userId || getActiveUserRecord()?.id;
  if (!activeUser) {
    if (silent) return [];
    throw new Error(`No active user context for ${storageKey}`);
  }

  const profile = ensureProfileState(activeUser);
  if (!profile) {
    if (silent) return [];
    throw new Error(`Missing profile storage for user: ${activeUser}`);
  }

  if (!Array.isArray(profile[storageKey])) {
    profile[storageKey] = [];
  }

  return profile[storageKey];
}

function findConversationRecord(conversationId) {
  if (!state) return null;
  const profiles = getProfilesStore();
  for (const [userId, profile] of Object.entries(profiles)) {
    const list = Array.isArray(profile.conversations) ? profile.conversations : [];
    const conversation = list.find((entry) => entry.id === conversationId);
    if (conversation) {
      return { conversation, userId, profile };
    }
  }
  return null;
}

function bootstrapState(stateLike) {
  const data = stateLike || {};

  if (!Array.isArray(data.users)) {
    data.users = [];
  } else {
    data.users = data.users.map((entry) => {
      const mapped = {
        ...entry,
      };

      if (!mapped.id) {
        mapped.id = generateId("user");
      }

      if (!mapped.password) {
        mapped.password = DEFAULT_USER_PASSWORD;
      }

      return mapped;
    });
  }

  const seedIndex = data.users.findIndex((entry) => entry.email?.toLowerCase() === SEED_USER_EMAIL.toLowerCase());
  if (seedIndex === -1) {
    data.users.push(createSeedUserProfile());
  } else {
    const seedUser = data.users[seedIndex];
    if (!seedUser.id) {
      seedUser.id = SEED_USER_ID;
    }
    if (!seedUser.password) {
      seedUser.password = DEFAULT_USER_PASSWORD;
    }
  }

  if (data.users.length === 0 && data.currentUser) {
    data.users.push({
      ...clone(data.currentUser),
      id: data.currentUser.id || generateId("user"),
      password: data.currentUser.password || DEFAULT_USER_PASSWORD,
    });
  }

  if (data.users.length === 0) {
    data.users.push({
      ...createSeedUserProfile(),
    });
  }

  migrateProfileCollections(data);

  data.aiStatus = {
    ...DEFAULT_AI_STATUS,
    ...clone(data.aiStatus || {}),
  };
  if (!data.aiStatus.offlineMessage) {
    data.aiStatus.offlineMessage = DEFAULT_OFFLINE_MESSAGE;
  }
  data.aiStatus.lastError = sanitizeErrorMessage(data.aiStatus.lastError) || data.aiStatus.lastError;

  const loggedOutExplicitly =
    data.session === null &&
    data.currentUser === null &&
    (data.currentUserId === null || typeof data.currentUserId === "undefined");

  if (loggedOutExplicitly) {
    data.session = null;
    data.currentUser = null;
    data.currentUserId = null;
    return data;
  }

  const fallbackUserId = data.users[0]?.id;
  const existingUserId = data.session?.userId || data.currentUser?.id || data.currentUserId || fallbackUserId;
  const activeUser =
    (existingUserId && data.users.find((entry) => entry.id === existingUserId)) ||
    data.users[0];

  if (!activeUser) {
    return data;
  }

  if (!data.session || !data.session.userId) {
    data.session = {
      token: createSessionToken(activeUser.id),
      userId: activeUser.id,
      created_at: new Date().toISOString(),
    };
  } else if (!data.session.token) {
    data.session = {
      ...data.session,
      token: createSessionToken(data.session.userId),
    };
  }

  data.currentUser = sanitizeUser(activeUser);
  data.currentUserId = activeUser.id;

  return data;
}

async function loadState() {
  if (typeof fetch === "undefined") {
    const cached = readCachedState();
    if (cached) {
      return bootstrapState({ ...clone(defaultData), ...cached });
    }
    return bootstrapState(clone(defaultData));
  }

  try {
    const response = await fetch(REMOTE_STATE_ENDPOINT, {
      method: "GET",
      credentials: "same-origin",
    });

    if (!response.ok) {
      throw new Error(`Failed to load remote state: ${response.status}`);
    }

    const payload = await response.json();
    const merged = bootstrapState({ ...clone(defaultData), ...payload });
    cacheStateLocally(merged);
    return merged;
  } catch (error) {
    console.warn("Failed to load remote data, using defaults", error);
    const cached = readCachedState();
    if (cached) {
      return bootstrapState({ ...clone(defaultData), ...cached });
    }
    return bootstrapState(clone(defaultData));
  }
}

let state = null;
let statePromise = null;

async function persist() {
  if (typeof fetch === "undefined") return;
  try {
    await fetch(REMOTE_STATE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
      credentials: "same-origin",
    });
  } catch (error) {
    console.warn("Failed to persist data", error);
  }
}

  const LOCAL_STATE_CACHE_KEY = "careerVision.offlineState";

    function cacheStateLocally(data) {
      if (typeof window === "undefined" || !window.localStorage) return;
      try {
        window.localStorage.setItem(LOCAL_STATE_CACHE_KEY, JSON.stringify(data));
      } catch (error) {
        console.warn("Failed to cache state locally", error);
      }
    }

    function readCachedState() {
      if (typeof window === "undefined" || !window.localStorage) return null;
      try {
        const raw = window.localStorage.getItem(LOCAL_STATE_CACHE_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch (error) {
        console.warn("Failed to read cached state", error);
        return null;
      }
    }
async function ensureStateLoaded() {
  if (state) {
    return state;
  }
  if (!statePromise) {
    statePromise = loadState().then((loaded) => {
      state = loaded;
      return state;
    });
  }
  return statePromise;
}

function createSorter(sortKey) {
  if (!sortKey) {
    return (items) => items.slice();
  }

  const descending = sortKey.startsWith("-");
  const field = descending ? sortKey.slice(1) : sortKey;

  return (items) =>
    items
      .slice()
      .sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];

        if (aValue === undefined && bValue === undefined) return 0;
        if (aValue === undefined) return descending ? 1 : -1;
        if (bValue === undefined) return descending ? -1 : 1;

        const isDateField = /date|created|updated/i.test(field);
        const av = isDateField ? new Date(aValue).getTime() : aValue;
        const bv = isDateField ? new Date(bValue).getTime() : bValue;

        if (av < bv) return descending ? 1 : -1;
        if (av > bv) return descending ? -1 : 1;
        return 0;
      });
}

function createFilters(filters) {
  if (!filters) return () => true;

  return (item) =>
    Object.entries(filters).every(([key, value]) => {
      if (value === undefined || value === null || value === "" || value === "all") {
        return true;
      }
      return item[key] === value;
    });
}

function singularizeKey(storageKey) {
  if (typeof storageKey !== "string" || storageKey.length === 0) {
    return "record";
  }

  if (storageKey.endsWith("ies")) {
    return `${storageKey.slice(0, -3)}y`;
  }

  if (storageKey.endsWith("zzes")) {
    return storageKey.slice(0, -4);
  }

  if (storageKey.endsWith("ses")) {
    return storageKey.slice(0, -2);
  }

  return storageKey.replace(/s$/, "");
}

function createEntityApi(storageKey) {
  return {
    async list(sortKey) {
      await ensureStateLoaded();
      const activeUser = getActiveUserRecord();
      const items = getScopedCollection(storageKey, {
        userId: activeUser?.id,
        silent: true,
      });
      return createSorter(sortKey)(items).map(clone);
    },
    async filter(filters, sortKey) {
      await ensureStateLoaded();
      const activeUser = getActiveUserRecord();
      const items = getScopedCollection(storageKey, {
        userId: activeUser?.id,
        silent: true,
      });
      return createSorter(sortKey)(items.filter(createFilters(filters))).map(clone);
    },
    async create(payload) {
      await ensureStateLoaded();
      const now = new Date().toISOString();
      const activeUser = ensureActiveUser();
      const ownerEmail = activeUser?.email || state.currentUser?.email || null;
      const ownerId = activeUser?.id || state.currentUserId || null;
      const record = {
        ...clone(payload),
        id: generateId(singularizeKey(storageKey)),
        created_date: now,
        updated_date: now,
        created_by: ownerEmail,
        owner_id: payload?.owner_id ?? ownerId,
      };

      const targetCollection = getScopedCollection(storageKey, {
        userId: record.owner_id || ownerId,
        silent: false,
      });

      targetCollection.unshift(record);
      await persist();
      return clone(record);
    },
    async update(id, updates) {
      await ensureStateLoaded();
      const activeUser = ensureActiveUser();
      const items = getScopedCollection(storageKey, {
        userId: activeUser.id,
        silent: false,
      });
      const index = items.findIndex((item) => item.id === id);
      if (index === -1) throw new Error(`Record not found for ${storageKey}: ${id}`);

      const updated = {
        ...items[index],
        ...clone(updates),
        id,
        updated_date: new Date().toISOString(),
      };
      items[index] = updated;
      await persist();
      return clone(updated);
    },
    async delete(id) {
      await ensureStateLoaded();
      const activeUser = ensureActiveUser();
      const items = getScopedCollection(storageKey, {
        userId: activeUser.id,
        silent: false,
      });
      const index = items.findIndex((item) => item.id === id);
      if (index !== -1) {
        items.splice(index, 1);
        await persist();
      }
      return { success: true };
    },
  };
}

const subscribers = new Map();

function notifyConversationSubscribers(conversationId) {
  const match = findConversationRecord(conversationId);
  if (!match) return;

  const payload = clone(match.conversation);
  const listeners = subscribers.get(conversationId) || new Set();
  listeners.forEach((listener) => listener(payload));
}

function ensureAiStatusState() {
  if (!state.aiStatus) {
    state.aiStatus = { ...DEFAULT_AI_STATUS };
  }
  if (!state.aiStatus.offlineMessage) {
    state.aiStatus.offlineMessage = DEFAULT_OFFLINE_MESSAGE;
  }
  state.aiStatus.lastError = sanitizeErrorMessage(state.aiStatus.lastError) || state.aiStatus.lastError;
  return state.aiStatus;
}

function buildConversationHistory(conversation) {
  const baseMessages = Array.isArray(conversation.messages) ? conversation.messages : [];
  const trimmedHistory = baseMessages
    .slice(-MAX_MESSAGES_FOR_AI)
    .map((message) => ({
      role: message.role || "assistant",
      content: typeof message.content === "string" ? message.content : String(message.content ?? ""),
    }))
    .filter((entry) => entry.content && entry.content.trim().length > 0);

  const systemPrompt =
    conversation.metadata?.type === "chart"
      ? "You are Career Vision's AI insights assistant. When chart threads are created, suggest metrics to plot, describe how the learner can capture the data, and outline the steps to visualise it. Keep answers structured, with clear action items."
      : "You are Career Vision's AI career advisor. Deliver friendly, structured guidance that references goals, learning plans, and measurable next steps. Prioritise clarity, optimism, and actionable advice.";

  trimmedHistory.unshift({ role: "system", content: systemPrompt });
  return trimmedHistory;
}

async function requestAssistantReply(conversation, temperature = 0.6) {
  const history = buildConversationHistory(conversation);
  const aiStatus = ensureAiStatusState();

  try {
    const response = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history, temperature }),
      credentials: "same-origin",
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`AI request failed with status ${response.status}: ${errorBody}`);
    }

    const payload = await response.json();
    aiStatus.lastChecked = new Date().toISOString();
    aiStatus.lastModel = payload.model || aiStatus.lastModel || null;
    aiStatus.usage = payload.usage || null;

    if (payload.offline) {
      aiStatus.online = false;
      aiStatus.lastError = payload.error || null;
      return {
        offline: true,
        content: payload.message || aiStatus.offlineMessage || DEFAULT_OFFLINE_MESSAGE,
        model: payload.model || null,
        error: payload.error || null,
      };
    }

    aiStatus.online = true;
    aiStatus.lastError = null;
    return {
      offline: false,
      content: payload.text,
      model: payload.model || null,
      usage: payload.usage || null,
    };
  } catch (error) {
    const cleanedError = sanitizeErrorMessage(error?.message || String(error));
    aiStatus.online = false;
    aiStatus.lastChecked = new Date().toISOString();
    aiStatus.lastError = cleanedError;
    aiStatus.lastModel = null;

    const guidance = cleanedError
      ? cleanedError.includes("GEMINI_API_KEY")
        ? "Add your Gemini API key to .env.local and restart the server."
        : cleanedError.includes("not reachable")
          ? "Run npm run dev from the project root to launch the API server."
          : null
      : null;

    let offlineContent = aiStatus.offlineMessage || DEFAULT_OFFLINE_MESSAGE;
    if (guidance) {
      offlineContent = `${offlineContent}\n\n${guidance}`;
    }

    return {
      offline: true,
      content: offlineContent,
      model: null,
      error: cleanedError,
    };
  }
}

export const careerVision = {
  auth: {
    async login({ email, password }) {
      await ensureStateLoaded();
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const normalizedEmail = String(email).trim().toLowerCase();
      const user = state.users.find((entry) => entry.email?.toLowerCase() === normalizedEmail);

      if (!user) {
        throw new Error("Invalid credentials");
      }

      const secret = user.password || DEFAULT_USER_PASSWORD;
      if (secret !== password) {
        throw new Error("Invalid credentials");
      }

      const token = createSessionToken(user.id);
      state.session = {
        token,
        userId: user.id,
        created_at: new Date().toISOString(),
      };
      setActiveUser(user);

      await persist();

      return {
        message: "Login successful",
        token,
        user: clone(state.currentUser),
      };
    },
    async register({ full_name, email, password }) {
      await ensureStateLoaded();
      if (!email || !password || !full_name || !String(full_name).trim()) {
        throw new Error("Name, email, and password are required");
      }

      const trimmedEmail = String(email).trim();
      const normalizedEmail = trimmedEmail.toLowerCase();

      const exists = state.users.some((user) => user.email?.toLowerCase() === normalizedEmail);
      if (exists) {
        throw new Error("An account with this email already exists");
      }

      const now = new Date().toISOString();
      const userRecord = {
        id: generateId("user"),
        full_name: String(full_name).trim(),
        email: trimmedEmail,
        password,
        role: "Career Explorer",
        current_role: "",
        company: "",
        years_experience: 0,
        industry: "",
        skills: [],
        career_interests: [],
        bio: "",
        created_date: now,
        updated_date: now,
      };

      state.users.push(userRecord);

      const token = createSessionToken(userRecord.id);
      state.session = {
        token,
        userId: userRecord.id,
        created_at: now,
      };
      setActiveUser(userRecord);

      await persist();

      return {
        message: "Registration successful",
        token,
        user: clone(state.currentUser),
      };
    },
    async me() {
      await ensureStateLoaded();
      const record = getActiveUserRecord();
      if (!record) {
        return null;
      }

      setActiveUser(record);
      return clone(state.currentUser);
    },
    async session() {
      await ensureStateLoaded();
      return state.session ? clone(state.session) : null;
    },
    async updateMe(updates) {
      await ensureStateLoaded();
      const baseUser = ensureActiveUser();
      const index = state.users.findIndex((user) => user.id === baseUser.id);
      if (index === -1) {
        throw new Error("User not found");
      }

      const merged = {
        ...clone(baseUser),
        ...clone(updates),
      };

      if (!updates?.password) {
        merged.password = baseUser.password;
      }

      state.users[index] = merged;
      setActiveUser(merged);

      await persist();
      return clone(state.currentUser);
    },
    async logout() {
      await ensureStateLoaded();
      state.session = null;
      setActiveUser(null);
      await persist();
      return { success: true };
    },
  },
  entities: {
    CareerGoal: createEntityApi("goals"),
    CareerDocument: createEntityApi("documents"),
    JobApplication: createEntityApi("jobApplications"),
    Interview: createEntityApi("interviews"),
    Skill: createEntityApi("skills"),
    AssessmentDomain: createEntityApi("assessmentDomains"),
    AssessmentSubdomain: createEntityApi("assessmentSubdomains"),
    AssessmentWebsite: createEntityApi("assessmentWebsites"),
    AssessmentResult: createEntityApi("assessmentResults"),
    CareerQuiz: createEntityApi("careerQuizzes"),
  },
  agents: {
    async listConversations({ agent_name } = {}) {
      await ensureStateLoaded();
      try {
        const user = ensureActiveUser();
        const conversations = getScopedCollection("conversations", {
          userId: user.id,
          silent: true,
        });

        return conversations
          .filter(
            (conversation) =>
              conversation.ownerId === user.id && (!agent_name || conversation.agent_name === agent_name)
          )
          .sort((a, b) => new Date(b.updated_date || b.created_date) - new Date(a.updated_date || a.created_date))
          .map(clone);
      } catch (error) {
        console.warn("Error loading conversations", error);
        return [];
      }
    },
    async createConversation({ agent_name, metadata }) {
      await ensureStateLoaded();
      const user = ensureActiveUser();
      const conversations = getScopedCollection("conversations", {
        userId: user.id,
        silent: false,
      });

      const now = new Date().toISOString();
      const type = metadata?.type || "chat";
      const initialAssistantMessage =
        type === "chart"
          ? "Let's sketch out your chart. Share the outcome you want to highlight and the data points you already track."
          : "Thanks for reaching out! Tell me a goal you're focusing on and I'll help you break it down.";

      const conversation = {
        id: generateId("convo"),
        agent_name,
        ownerId: user.id,
        owner_id: user.id,
        ownerEmail: user.email,
        metadata: metadata || { name: "New Career Chat" },
        created_date: now,
        updated_date: now,
        messages: [
          {
            id: generateId("msg"),
            role: "assistant",
            content: initialAssistantMessage,
            created_at: now,
            tool_calls: [],
          },
        ],
      };

      conversations.unshift(conversation);
      await persist();
      notifyConversationSubscribers(conversation.id);

      return clone(conversation);
    },
    async getConversation(id) {
      await ensureStateLoaded();
      const user = ensureActiveUser();
      const conversations = getScopedCollection("conversations", {
        userId: user.id,
        silent: false,
      });

      const conversation = conversations.find((item) => item.id === id && item.ownerId === user.id);
      if (!conversation) throw new Error("Conversation not found");
      return clone(conversation);
    },
    async addMessage(conversationLike, message) {
      await ensureStateLoaded();
      const user = ensureActiveUser();
      const conversations = getScopedCollection("conversations", {
        userId: user.id,
        silent: false,
      });

      const conversation = conversations.find((c) => c.id === conversationLike?.id && c.ownerId === user.id);
      if (!conversation) throw new Error("Conversation not found");

      const entry = {
        id: generateId("msg"),
        role: message.role,
        content: message.content,
        created_at: new Date().toISOString(),
        tool_calls: message.tool_calls || [],
      };

      conversation.messages.push(entry);
      conversation.updated_date = entry.created_at;
      await persist();
      notifyConversationSubscribers(conversation.id);

      if (message.role === "user") {
        const aiResponse = await requestAssistantReply(conversation, message.temperature);
        const reply = {
          id: generateId("msg"),
          role: "assistant",
          content: aiResponse.content,
          created_at: new Date().toISOString(),
          tool_calls: [],
          model: aiResponse.model || undefined,
        };
        conversation.messages.push(reply);
        conversation.updated_date = reply.created_at;
        await persist();
        notifyConversationSubscribers(conversation.id);
      }

      return clone(entry);
    },
    async appendOfflineInteraction(conversationId, { prompt, response, playbookId } = {}) {
      await ensureStateLoaded();
      const user = ensureActiveUser();
      const conversations = getScopedCollection("conversations", {
        userId: user.id,
        silent: false,
      });

      const conversation = conversations.find((c) => c.id === conversationId && c.ownerId === user.id);
      if (!conversation) {
        throw new Error("Conversation not found");
      }

      const userTimestamp = new Date().toISOString();
      const assistantTimestamp = new Date(Date.now() + 10).toISOString();

      const userMessage = {
        id: generateId("msg"),
        role: "user",
        content: prompt,
        created_at: userTimestamp,
        tool_calls: [],
      };

      const assistantMessage = {
        id: generateId("msg"),
        role: "assistant",
        content: response,
        created_at: assistantTimestamp,
        tool_calls: [],
        metadata: playbookId ? { offline_playbook_id: playbookId } : undefined,
      };

      conversation.messages.push(userMessage, assistantMessage);
      conversation.updated_date = assistantMessage.created_at;
      await persist();
      notifyConversationSubscribers(conversation.id);

      const aiStatus = ensureAiStatusState();
      aiStatus.online = false;
      aiStatus.lastChecked = new Date().toISOString();
      aiStatus.lastModel = null;
      aiStatus.lastError = aiStatus.lastError || "Operating in offline mode";

      return {
        userMessage: clone(userMessage),
        assistantMessage: clone(assistantMessage),
      };
    },
    async deleteConversation(id) {
      await ensureStateLoaded();
      const user = ensureActiveUser();
      const conversations = getScopedCollection("conversations", {
        userId: user.id,
        silent: false,
      });

      const index = conversations.findIndex((item) => item.id === id && item.ownerId === user.id);
      if (index === -1) {
        throw new Error("Conversation not found");
      }

      conversations.splice(index, 1);
      subscribers.delete(id);
      await persist();
      return { success: true };
    },
    async subscribeToConversation(conversationId, callback) {
      await ensureStateLoaded();
      const record = findConversationRecord(conversationId);
      const user = getActiveUserRecord();
      if (!record || (user && record.userId !== user.id)) {
        return () => {};
      }

      if (!subscribers.has(conversationId)) {
        subscribers.set(conversationId, new Set());
      }
      const listeners = subscribers.get(conversationId);
      listeners.add(callback);

      return () => {
        listeners.delete(callback);
        if (listeners.size === 0) {
          subscribers.delete(conversationId);
        }
      };
    },
    async status() {
      await ensureStateLoaded();
      return clone(ensureAiStatusState());
    },
    async setOfflineMessage(message) {
      await ensureStateLoaded();
      const status = ensureAiStatusState();
      status.offlineMessage = message || DEFAULT_OFFLINE_MESSAGE;
      await persist();
      return clone(status);
    },
  },
  integrations: {
    Core: {
      async UploadFile({ file }) {
        await ensureStateLoaded();
        const id = generateId("file");
        const uploaded_at = new Date().toISOString();

        if (typeof window === "undefined" || !file) {
          return { file_url: "https://example-files.online/mock-file.pdf", id, uploaded_at };
        }

        const toDataUrl = () =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(file);
          });

        const file_url = await toDataUrl();
        const user = ensureActiveUser();
        const uploads = getScopedCollection("uploads", {
          userId: user.id,
          silent: false,
        });

        uploads.push({ id, file_url, name: file.name, size: file.size, uploaded_at });
        await persist();

        return { file_url, id, uploaded_at };
      },
    },
  },
};

export default careerVision;
