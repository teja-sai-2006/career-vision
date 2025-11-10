import {
  Monitor,
  Brain,
  CloudCog,
  Stethoscope,
  Scale,
  UserCheck,
  Compass,
  ListChecks,
  Trophy,
  Briefcase,
  Palette,
  HardHat,
  GraduationCap,
  Leaf,
  PiggyBank,
} from "lucide-react";

export const learningCatalog = [
  {
    id: "domain-technology",
    name: "Technology & Development",
    summary: "Build full-stack engineering fundamentals and modern product craftsmanship.",
    icon: Monitor,
    gradient: "from-violet-500 via-indigo-500 to-blue-500",
    metrics: {
      tracks: 8,
      hours: "150+ hrs",
      resources: 36,
    },
    tracks: [
      {
        id: "track-fullstack-product-builder",
        name: "Full Stack Product Builder",
        headline: "From fundamentals to shipping production-grade web apps.",
        description:
          "Rebuild your core in HTML, CSS, JavaScript, and modern backend services before layering on React routines and deployment workflows.",
        tags: ["HTML/CSS", "JavaScript", "APIs", "Node"],
        videos: [
          {
            title: "Responsive Web Design - freeCodeCamp",
            url: "https://www.youtube.com/watch?v=nu_pCVPKzTk",
            duration: "5h 00m",
          },
          {
            title: "JavaScript Crash Course - Traversy Media",
            url: "https://www.youtube.com/watch?v=hdI2bqOjy3c",
            duration: "1h 40m",
          },
          {
            title: "Node & Express Basics - Net Ninja",
            url: "https://www.youtube.com/watch?v=Oe421EPjeBE",
            duration: "2h 25m",
          },
        ],
        courses: [
          {
            title: "freeCodeCamp Full Stack Curriculum",
            provider: "freeCodeCamp",
            url: "https://www.freecodecamp.org/learn/",
            summary: "Certificate-aligned projects for responsive web, JS algorithms, APIs, and backend development.",
          },
          {
            title: "The Odin Project",
            provider: "The Odin Project",
            url: "https://www.theodinproject.com/paths/full-stack-javascript",
            summary: "Project-led pathway covering foundations, front-end, back-end, and deployment.",
          },
        ],
        books: [
          {
            title: "Eloquent JavaScript (3rd Edition)",
            author: "Marijn Haverbeke",
            url: "https://eloquentjavascript.net/",
          },
          {
            title: "You Don't Know JS Yet",
            author: "Kyle Simpson",
            url: "https://github.com/getify/You-Dont-Know-JS",
          },
        ],
        path: [
          {
            title: "Week 1-2: Interface Fundamentals",
            detail: "Complete HTML/CSS modules and ship two responsive layouts.",
          },
          {
            title: "Week 3-5: JavaScript Mastery",
            detail: "Push through JS algorithms, build DOM utilities, and refactor to modules.",
          },
          {
            title: "Week 6-7: Servers & APIs",
            detail: "Learn Node + Express, wire REST APIs, and persist data with a hosted database.",
          },
          {
            title: "Week 8+: Capstone & Deployment",
            detail: "Ship a production-ready project with CI/CD and share it in your portfolio.",
          },
        ],
      },
      {
        id: "track-frontend-experience",
        name: "Frontend Experience Design",
        headline: "Blend delightful UI craft with accessible design systems.",
        description:
          "Create polished interfaces with React, Tailwind, animation, and accessibility guidelines that stand up in production.",
        tags: ["React", "Design Systems", "Accessibility"],
        videos: [
          {
            title: "Design Systems Crash Course",
            url: "https://www.youtube.com/watch?v=ZK4uGLpkAKk",
            duration: "1h 05m",
          },
          {
            title: "Advanced TailwindCSS Workshop",
            url: "https://www.youtube.com/watch?v=y4gIq0gCzxo",
            duration: "2h 12m",
          },
        ],
        courses: [
          {
            title: "UI Dev: Design System Bootcamp",
            provider: "UI.Dev",
            url: "https://ui.dev/design-system",
            summary: "End-to-end design system implementation with tokens, tooling, and governance.",
          },
          {
            title: "Egghead: Accessible React",
            provider: "Egghead",
            url: "https://egghead.io/courses/building-accessible-react-apps",
            summary: "Hands-on lessons to implement accessible patterns in React.",
          },
        ],
        books: [
          {
            title: "Refactoring UI",
            author: "Adam Wathan & Steve Schoger",
            url: "https://www.refactoringui.com/",
          },
          {
            title: "Inclusive Design Principles",
            author: "W3C",
            url: "https://www.w3.org/WAI/fundamentals/accessibility-principles/",
          },
        ],
        path: [
          {
            title: "Week 1: UX Fundamentals",
            detail: "Map user journeys and sketch low-fidelity prototypes.",
          },
          {
            title: "Week 2-4: Component Architecture",
            detail: "Build reusable React components with a design system mindset.",
          },
          {
            title: "Week 5: Accessibility Audit",
            detail: "Run axe audits, add keyboard navigation, and meet WCAG criteria.",
          },
          {
            title: "Week 6+: Micro-interactions",
            detail: "Prototype animations and transitions that support storytelling.",
          },
        ],
      },
      {
        id: "track-backend-architecture",
        name: "Backend Architecture & APIs",
        headline: "Design resilient services and ship observability from day one.",
        description:
          "Model data, apply Domain Driven Design, and deploy observable services with real-world patterns.",
        tags: ["APIs", "Microservices", "Observability"],
        videos: [
          {
            title: "REST vs GraphQL for Product Teams",
            url: "https://www.youtube.com/watch?v=peD7n0HkG0E",
            duration: "35m",
          },
          {
            title: "Intro to Event-Driven Architecture",
            url: "https://www.youtube.com/watch?v=STKCRSUsyP0",
            duration: "1h 12m",
          },
        ],
        courses: [
          {
            title: "Backend Masters",
            provider: "Frontend Masters",
            url: "https://frontendmasters.com/courses/backend/",
            summary: "Practical Node, Postgres, and production monitoring patterns.",
          },
          {
            title: "Event-Driven Microservices",
            provider: "Confluent",
            url: "https://developer.confluent.io/learn/kafka-fundamentals/",
            summary: "Kafka-focused labs on building event-driven architectures.",
          },
        ],
        books: [
          {
            title: "Designing Data-Intensive Applications",
            author: "Martin Kleppmann",
            url: "https://dataintensive.net/",
          },
          {
            title: "12 Factor App",
            author: "Heroku",
            url: "https://12factor.net/",
          },
        ],
        path: [
          {
            title: "Phase 1: Data Modeling",
            detail: "Design ER diagrams, choose persistence options, and test schema migrations.",
          },
          {
            title: "Phase 2: API Contracts",
            detail: "Document endpoints, add schema validation, and create integration tests.",
          },
          {
            title: "Phase 3: Observability",
            detail: "Instrument with logging, tracing, metrics, and alerting dashboards.",
          },
        ],
      },
      {
        id: "track-software-development-roadmap",
        name: "Software Development Roadmap",
        headline: "Map the journey from fundamentals to professional software roles.",
        description:
          "Follow curated breakdowns that highlight the skills, projects, and hiring signals that matter most for modern software engineering paths.",
        tags: ["Career Planning", "Roadmap"],
        videos: [
          {
            title: "Introduction to Software Engineering Roles",
            url: "https://www.youtube.com/watch?v=-uleG_Vecis",
            duration: "18m",
          },
          {
            title: "Software Development Career Path Overview",
            url: "https://youtu.be/Fi3_BjVzpqk",
            duration: "~20m",
          },
          {
            title: "How to Become a Software Developer in 2025",
            url: "https://youtu.be/7i2SrCPhVbg?si=DcizNVt9rOmnp-RF",
            duration: "~55m",
          },
          {
            title: "Software Developer Roadmap Playlist",
            url: "https://www.youtube.com/watch?v=Fi3_BjVzpqk&list=RDFi3_BjVzpqk",
            duration: "Auto-generated mix",
          },
        ],
        courses: [
          {
            title: "LinkedIn Learning: Become a Software Developer",
            provider: "LinkedIn Learning",
            url: "https://www.linkedin.com/learning/paths/become-a-software-developer",
            summary: "Stacked mini-courses covering planning, coding fundamentals, version control, and deployment habits.",
          },
          {
            title: "GitHub Skills: Hello GitHub Actions Lab",
            provider: "GitHub Skills",
            url: "https://skills.github.com/",
            summary: "Hands-on lab to automate builds and publish a portfolio project using GitHub Actions workflows.",
          },
        ],
        books: [
          {
            title: "The Pragmatic Programmer (summary notes)",
            author: "Andy Hunt & Dave Thomas",
            url: "https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/",
          },
          {
            title: "Cracking the Coding Interview Cheat Sheet",
            author: "Gayle Laakmann McDowell",
            url: "https://www.hiredintech.com/algorithm-design/",
          },
        ],
        path: [
          {
            title: "Phase 1: Skill Gap Assessment",
            detail: "List required competencies for target roles and benchmark current strengths.",
          },
          {
            title: "Phase 2: Portfolio Build",
            detail: "Scope two showcase projects that highlight end-to-end execution.",
          },
          {
            title: "Phase 3: Interview Rehearsal",
            detail: "Schedule mock interviews and refine storytelling for behavioral and technical rounds.",
          },
          {
            title: "Phase 4: Continuous Learning Plan",
            detail: "Document meetups, newsletters, and quarterly goals that keep your skills market-aligned.",
          },
        ],
      },
      {
        id: "track-ai-ml-live-lab",
        name: "AI & ML Live Lab",
        headline: "Explore artificial intelligence careers with up-to-date workshops and guidance.",
        description:
          "Blend foundational AI walkthroughs with live sessions that unpack tooling, projects, and hiring expectations for machine learning roles.",
        tags: ["AI", "Machine Learning"],
        videos: [
          {
            title: "Introduction to Machine Learning Careers",
            url: "https://www.youtube.com/watch?v=Gv9_4yMHFhI",
            duration: "15m",
          },
          {
            title: "AI Career Roadmap 2025",
            url: "https://youtu.be/UdE-W30oOXo",
            duration: "~45m",
          },
          {
            title: "AI & ML Live Workshop",
            url: "https://www.youtube.com/live/N8svLoC2eNA?si=zMtf7Ji3qHqEyTiS",
            duration: "~2h 30m",
          },
          {
            title: "Full AI Engineer Playlist",
            url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUIxGDQs4LFFD--41Vzf-ME1",
            duration: "~8h playlist",
          },
        ],
        courses: [
          {
            title: "fast.ai Practical Deep Learning",
            provider: "fast.ai",
            url: "https://course.fast.ai/",
            summary: "Project-driven course blending notebooks, model deployment, and responsible AI guidance.",
          },
          {
            title: "Google Cloud Skills Boost: Intro to ML Lab Series",
            provider: "Google Cloud",
            url: "https://www.cloudskillsboost.google/paths/17",
            summary: "Hands-on labs training Vision, NLP, and AutoML models with production tooling.",
          },
        ],
        books: [
          {
            title: "Machine Learning Engineering",
            author: "Andriy Burkov",
            url: "https://www.mlebook.com/wiki/doku.php",
          },
          {
            title: "Practical MLOps Guide",
            author: "Microsoft",
            url: "https://learn.microsoft.com/en-us/azure/architecture/example-scenario/mlops/mlops-process",
          },
        ],
        path: [
          {
            title: "Module 1: Core Concepts",
            detail: "Refresh math, algorithms, and deployment vocab to frame upcoming practice.",
          },
          {
            title: "Module 2: Project Demos",
            detail: "Prototype a classifier or chatbot and document the decision trade-offs.",
          },
          {
            title: "Module 3: Hiring Signals",
            detail: "Collect recruiter feedback, iterate on profiles, and capture measurable impact.",
          },
          {
            title: "Module 4: Post-Launch Monitoring",
            detail: "Set up drift dashboards, error budgets, and ethical review cadences for models in production.",
          },
        ],
      },
      {
        id: "track-cybersecurity-launchpad",
        name: "Cybersecurity Launchpad",
        headline: "Understand blue-team responsibilities and defensive career paths.",
        description:
          "Stay ahead of evolving threat landscapes with curated explainers and long-form live classes covering security fundamentals and tooling.",
        tags: ["Security", "Operations"],
        videos: [
          {
            title: "Intro to Cybersecurity Roles",
            url: "https://www.youtube.com/watch?v=KcDBqn5PPxM",
            duration: "14m",
          },
          {
            title: "Cybersecurity Career Roadmap",
            url: "https://youtu.be/BlsW9jp9NJM?si=DSl-vthAmQ75o_dO",
            duration: "~25m",
          },
          {
            title: "Cybersecurity Full Workshop",
            url: "https://www.youtube.com/live/lpa8uy4DyMo?si=hhH8Wx99GEBnuaI_",
            duration: "~3h",
          },
          {
            title: "Blue Team Beginner Playlist",
            url: "https://www.youtube.com/watch?v=BlsW9jp9NJM&list=RDBlsW9jp9NJM",
            duration: "Auto-generated mix",
          },
        ],
        courses: [
          {
            title: "TryHackMe: Pre-Security Learning Path",
            provider: "TryHackMe",
            url: "https://tryhackme.com/path/outline/presecurity",
            summary: "Guided labs covering networking, Linux, and security fundamentals in a browser lab.",
          },
          {
            title: "IBM Cybersecurity Analyst Professional Certificate",
            provider: "Coursera",
            url: "https://www.coursera.org/professional-certificates/ibm-cybersecurity-analyst",
            summary: "Certificate series spanning threat intelligence, SIEM tooling, and incident response playbooks.",
          },
        ],
        books: [
          {
            title: "NIST Cybersecurity Framework",
            author: "NIST",
            url: "https://www.nist.gov/cyberframework/framework",
          },
          {
            title: "Blue Team Field Manual (reference)",
            author: "Alan White & Ben Clark",
            url: "https://btfm.com/",
          },
        ],
        path: [
          {
            title: "Stage 1: Foundations",
            detail: "Review security principles, threat modeling, and defensive tooling vocabulary.",
          },
          {
            title: "Stage 2: Labs & Practice",
            detail: "Simulate incident response scenarios and document remediation steps.",
          },
          {
            title: "Stage 3: Certification Prep",
            detail: "Align study sprints to entry-level certifications and build proof-of-work projects.",
          },
          {
            title: "Stage 4: Portfolio Artifact",
            detail: "Publish a threat-hunting report or SOC playbook that showcases your defensive workflow.",
          },
        ],
      },
      {
        id: "track-cloud-careers-starter",
        name: "Cloud Careers Starter",
        headline: "Kick-start a cloud journey with architecture primers and tooling deep dives.",
        description:
          "Pair concise explainers with extended workshops that detail practitioner workflows across major cloud providers.",
        tags: ["Cloud", "Architecture"],
        videos: [
          {
            title: "Introduction to Cloud Careers",
            url: "https://www.youtube.com/watch?v=2LaAJq1lB1Q",
            duration: "16m",
          },
          {
            title: "Cloud Computing Beginner Guide",
            url: "https://youtu.be/N0SYCyS2xZA?si=ibZxFUOqkABr-K52",
            duration: "~35m",
          },
          {
            title: "Cloud Computing Explained",
            url: "https://youtu.be/gIWel4gFZaY?si=lMOWPQ8LsD9xw4rD",
            duration: "~1h 10m",
          },
          {
            title: "Cloud Careers Live Session",
            url: "https://youtu.be/EN4fEbcFZ_E?si=pSS7PzCNGz-HPGvB",
            duration: "~2h 15m",
          },
          {
            title: "AWS, Azure, GCP Foundations Playlist",
            url: "https://www.youtube.com/watch?v=N0SYCyS2xZA&list=RDN0SYCyS2xZA",
            duration: "Auto-generated mix",
          },
        ],
        courses: [
          {
            title: "AWS Skill Builder: Cloud Quest",
            provider: "Amazon",
            url: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/13450/aws-cloud-quest-cloud-practitioner",
            summary: "Gamified lab journey solving customer scenarios while provisioning real AWS resources.",
          },
          {
            title: "Microsoft Learn: Azure Fundamentals Labs",
            provider: "Microsoft",
            url: "https://learn.microsoft.com/en-us/training/paths/azure-fundamentals/",
            summary: "Interactive sandboxes to practice identity, networking, and compute setups on Azure.",
          },
        ],
        books: [
          {
            title: "Google Cloud Architecture Framework",
            author: "Google Cloud",
            url: "https://cloud.google.com/architecture/framework",
          },
          {
            title: "Cloud Adoption Framework",
            author: "Microsoft",
            url: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/",
          },
        ],
        path: [
          {
            title: "Sprint 1: Provider Landscape",
            detail: "Identify core services, certifications, and role expectations across providers.",
          },
          {
            title: "Sprint 2: Hands-on Labs",
            detail: "Recreate lab scenarios that automate provisioning and monitoring.",
          },
          {
            title: "Sprint 3: Showcase Build",
            detail: "Publish a small project demonstrating secure, scalable cloud deployment.",
          },
        ],
      },
      {
        id: "track-web-app-creation",
        name: "Web & App Creation Sprint",
        headline: "Level up modern web and mobile interfaces with production habits.",
        description:
          "Combine rapid refreshers with full project walkthroughs to strengthen front-end, backend, and deployment flow for web and app builds.",
        tags: ["Web", "Mobile", "Product"],
        videos: [
          {
            title: "Introduction to Modern Web & App Development",
            url: "https://www.youtube.com/watch?v=VfGW0Qiy2I0",
            duration: "22m",
          },
          {
            title: "Modern Web Development Overview",
            url: "https://youtu.be/d6zYj8oSOGc",
            duration: "~40m",
          },
          {
            title: "Build Responsive Interfaces",
            url: "https://youtu.be/F4zr1aMevB4?si=5avvVNbtD8nBohMn",
            duration: "~1h 50m",
          },
          {
            title: "App Development Workshop",
            url: "https://youtu.be/u64gyCdqawU?si=mdHA_EoKrr2g9xSe",
            duration: "~1h 30m",
          },
          {
            title: "Full-Stack Web Projects Playlist",
            url: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp",
            duration: "~10h playlist",
          },
        ],
        courses: [
          {
            title: "Scrimba Frontend Developer Bootcamp",
            provider: "Scrimba",
            url: "https://scrimba.com/learn/frontend",
            summary: "Interactive course building React and vanilla JS projects with pair-programmed screencasts.",
          },
          {
            title: "Full Stack Open Project Labs",
            provider: "University of Helsinki",
            url: "https://fullstackopen.com/en/",
            summary: "Lab-driven exercises covering React, Node, GraphQL, and CI/CD workflows.",
          },
        ],
        books: [
          {
            title: "Frontend Handbook 2024",
            author: "Frontend Masters",
            url: "https://frontendmasters.com/books/front-end-handbook/",
          },
          {
            title: "Designing Web APIs",
            author: "Brenda Jin, Saurabh Sahni, Amir Shevat",
            url: "https://learning.oreilly.com/library/view/designing-web-apis/9781492026892/",
          },
        ],
        path: [
          {
            title: "Step 1: UI/UX Audit",
            detail: "Review layout, accessibility, and component patterns to refresh fundamentals.",
          },
          {
            title: "Step 2: Full-stack Build",
            detail: "Ship a feature end-to-end with authentication, data, and testing coverage.",
          },
          {
            title: "Step 3: Deploy & Iterate",
            detail: "Launch to a managed platform, gather feedback, and document learnings.",
          },
        ],
      },
    ],
  },
  {
    id: "domain-creative",
    name: "Creative Arts & Media",
    summary: "Build a creative career across design, storytelling, and production disciplines.",
    icon: Palette,
    gradient: "from-pink-400 via-purple-400 to-indigo-400",
    metrics: {
      tracks: 6,
      hours: "95+ hrs",
      resources: 24,
    },
    tracks: [
      {
        id: "track-design-spectrum",
        name: "Design Spectrum",
        headline: "Explore graphic, fashion, and interior design fundamentals.",
        description:
          "Follow studio walkthroughs and critiques that reveal how designers think, prototype, and polish portfolios.",
        tags: ["Design", "Creativity"],
        videos: [
          {
            title: "Introduction to Creative Design Careers",
            url: "https://www.youtube.com/watch?v=DnYvZ3JIy9E",
            duration: "17m",
          },
          {
            title: "Graphic Design Career Guide",
            url: "https://youtu.be/3BT8z0FenBE?si=dUzYWxKeceu8Yz2G",
            duration: "~45m",
          },
          {
            title: "Design Inspiration Workshop",
            url: "https://youtu.be/GQS7wPujL2k?si=AavRVQDNLcY21gFM",
            duration: "~1h",
          },
          {
            title: "Fashion Design Deep Dive",
            url: "https://youtu.be/e_dv7GBHka8?si=mesN9A2n6om98Lp-",
            duration: "~50m",
          },
          {
            title: "Interior Design Walkthrough",
            url: "https://youtu.be/GkUHvrwZ7Ls?si=CrWMGs_5VFRlcZyq",
            duration: "~45m",
          },
          {
            title: "Design Mastery Playlist",
            url: "https://www.youtube.com/watch?v=3BT8z0FenBE&list=RD3BT8z0FenBE",
            duration: "Auto-generated mix",
          },
        ],
        courses: [
          {
            title: "Coursera Graphic Design Specialization",
            provider: "CalArts",
            url: "https://www.coursera.org/specializations/graphic-design",
            summary: "Studio-style assignments covering typography, imagery, branding, and portfolio presentation.",
          },
          {
            title: "Canva Design School Creative Lab",
            provider: "Canva",
            url: "https://www.canva.com/designschool/courses/",
            summary: "Self-paced lab exercises for layout, social media graphics, and motion basics.",
          },
        ],
        books: [
          {
            title: "The Non-Designer's Design Book (summary)",
            author: "Robin Williams",
            url: "https://www.adobe.com/creativecloud/design/discover/non-designers-design-book.html",
          },
          {
            title: "Design Thinking Toolkit",
            author: "IDEO",
            url: "https://www.designkit.org/resources/1",
          },
        ],
        path: [
          {
            title: "Step 1: Foundations",
            detail: "Capture notes on principles, color theory, and design process.",
          },
          {
            title: "Step 2: Portfolio Projects",
            detail: "Recreate mood boards and sample deliverables inspired by the playlists.",
          },
          {
            title: "Step 3: Client Presentation",
            detail: "Package work into case studies with rationale, metrics, and iteration notes.",
          },
        ],
      },
      {
        id: "track-music-performing",
        name: "Music & Performing Arts",
        headline: "Strengthen performance craft, stage presence, and music careers.",
        description:
          "Combine music theory refreshers with behind-the-scenes looks at performers and creative routines.",
        tags: ["Music", "Performance"],
        videos: [
          {
            title: "Introduction to Performing Arts Careers",
            url: "https://www.youtube.com/watch?v=3l1C-d9vMaA",
            duration: "19m",
          },
          {
            title: "Music Career Roadmap",
            url: "https://youtu.be/gHzNV-A7EMU?si=fSCMU_36WFvzlF2O",
            duration: "~35m",
          },
          {
            title: "Performing Arts Masterclass",
            url: "https://youtu.be/6YwWKn6k0Mg?si=4hFzqEy0vY6hOApw",
            duration: "~1h",
          },
          {
            title: "Vocal Performance Workshop",
            url: "https://youtu.be/0Sxs_-MXKFo?si=C_8I_nROiEBhlVvd",
            duration: "~50m",
          },
          {
            title: "Performer Essentials Playlist",
            url: "https://www.youtube.com/watch?v=gHzNV-A7EMU&list=RDgHzNV-A7EMU",
            duration: "Auto-generated mix",
          },
        ],
        courses: [
          {
            title: "BerkleeX: Music Business Foundations",
            provider: "edX",
            url: "https://www.edx.org/course/music-business-foundations",
            summary: "Industry-facing course covering contracts, marketing, and monetization for musicians.",
          },
          {
            title: "StageMilk Acting & Voice Lab",
            provider: "StageMilk",
            url: "https://www.stagemilk.com/members/",
            summary: "Weekly lab exercises for monologues, vocal warmups, and audition feedback.",
          },
        ],
        books: [
          {
            title: "The Artist's Way (workbook)",
            author: "Julia Cameron",
            url: "https://juliacameronlive.com/basic-tools/",
          },
          {
            title: "Backstage Audition Guide",
            author: "Backstage",
            url: "https://www.backstage.com/magazine/resource-guide/",
          },
        ],
        path: [
          {
            title: "Stage 1: Performance Craft",
            detail: "Tackle vocal, instrumental, or acting drills highlighted in the playlists and record progress logs.",
          },
          {
            title: "Stage 2: Rehearsal Studio",
            detail: "Schedule practice sessions, collect peer feedback, and iterate on stage presence and delivery.",
          },
          {
            title: "Stage 3: Showcase & Promotion",
            detail: "Produce a short performance reel, publish to platforms, and document outreach to venues or collaborators.",
          },
        ],
      },
    ],
  },
  {
    id: "domain-data",
    name: "Data Science & AI",
    summary: "Master the spectrum from analytics to responsible AI deployment.",
    icon: Brain,
    gradient: "from-emerald-500 to-teal-500",
    metrics: {
      tracks: 4,
      hours: "160+ hrs",
      resources: 33,
    },
    tracks: [
      {
        id: "track-ml-specialist",
        name: "Machine Learning Specialist",
        headline: "Model, validate, and ship ML systems with confidence.",
        description:
          "Strengthen mathematics, implement classic algorithms, and operationalize models with MLOps hygiene.",
        tags: ["Python", "ML Ops", "Model Evaluation"],
        videos: [
          {
            title: "Machine Learning Full Course - freeCodeCamp",
            url: "https://www.youtube.com/watch?v=GwIo3gDZCVQ",
            duration: "6h 00m",
          },
          {
            title: "Hands-on Scikit-Learn Tutorial",
            url: "https://www.youtube.com/watch?v=0Lt9w-BxKFQ",
            duration: "1h 50m",
          },
          {
            title: "AI Career Roadmap 2025",
            url: "https://youtu.be/UdE-W30oOXo",
            duration: "~45m",
          },
          {
            title: "AI & ML Live Workshop",
            url: "https://www.youtube.com/live/N8svLoC2eNA?si=zMtf7Ji3qHqEyTiS",
            duration: "~2h 30m",
          },
        ],
        courses: [
          {
            title: "Coursera Machine Learning Specialization",
            provider: "DeepLearning.AI",
            url: "https://www.coursera.org/specializations/machine-learning-introduction",
            summary: "Andrew Ng's refreshed track covering supervised, unsupervised, and recommender systems.",
          },
          {
            title: "Made With ML - Production ML",
            provider: "Goku Mohandas",
            url: "https://madewithml.com/courses/mlops/",
            summary: "Open-source course on production-grade pipelines, ethics, and observability.",
          },
        ],
        books: [
          {
            title: "Hands-On Machine Learning with Scikit-Learn & TensorFlow",
            author: "Aurélien Géron",
            url: "https://github.com/ageron/handson-ml3",
          },
          {
            title: "The Hundred-Page Machine Learning Book",
            author: "Andriy Burkov",
            url: "http://themlbook.com/",
          },
        ],
        path: [
          { title: "Phase 1: Math Refresh", detail: "Revise linear algebra, calculus, and probability essentials." },
          { title: "Phase 2: Model Playground", detail: "Implement baseline models, tune hyperparameters, and compare metrics." },
          { title: "Phase 3: Deploy & Monitor", detail: "Automate training pipelines, add monitoring, and create drift alerts." },
        ],
      },
      {
        id: "track-generative-ai",
        name: "Generative & Applied AI Engineer",
        headline: "Prototype quickly with foundation models and responsible guardrails.",
        description:
          "Learn prompt design, retrieval-augmented generation, and evaluation techniques to ship reliable AI copilots.",
        tags: ["Prompting", "LLMs", "RAG"],
        videos: [
          {
            title: "Intro to Prompt Engineering",
            url: "https://www.youtube.com/watch?v=dOxUroR57xs",
            duration: "55m",
          },
          {
            title: "Retrieval-Augmented Generation Tutorial",
            url: "https://www.youtube.com/watch?v=wU0y7fKBjxs",
            duration: "1h 20m",
          },
        ],
        courses: [
          {
            title: "DeepLearning.AI Short Courses",
            provider: "DeepLearning.AI",
            url: "https://learn.deeplearning.ai/",
            summary: "Hands-on labs building chatbots, agents, and multimodal pipelines.",
          },
          {
            title: "LangChain 101",
            provider: "LangChain",
            url: "https://www.langchain.com/academy",
            summary: "Foundational lessons to orchestrate LLM workflows and agents.",
          },
        ],
        books: [
          {
            title: "LLMs in Production Playbook",
            author: "AnyScale",
            url: "https://www.anyscale.com/blog/the-llm-production-playbook",
          },
          {
            title: "Anthropic Responsible AI Guidelines",
            author: "Anthropic",
            url: "https://www.anthropic.com/news/responsible-scaling-policy",
          },
        ],
        path: [
          { title: "Sprint 1: Prompt Engineering", detail: "Experiment with zero-shot, few-shot, and chain-of-thought prompts." },
          { title: "Sprint 2: Context Retrieval", detail: "Implement embeddings, vector stores, and evaluation harnesses." },
          { title: "Sprint 3: Hardening & Launch", detail: "Add guardrails, costs dashboards, and feedback loops." },
        ],
      },
      {
        id: "track-responsible-ai",
        name: "Responsible AI Strategist",
        headline: "Ensure trustworthy AI across policy, governance, and auditing.",
        description:
          "Blend technical assessments with legal frameworks to evaluate risks and create accountable AI programs.",
        tags: ["Governance", "Risk", "Audit"],
        videos: [
          {
            title: "Responsible AI Crash Course - Microsoft",
            url: "https://www.youtube.com/watch?v=0t1f0Pa4_mM",
            duration: "45m",
          },
          {
            title: "AI Ethics in Practice - Google",
            url: "https://www.youtube.com/watch?v=FNNLQxG_O6c",
            duration: "1h 05m",
          },
        ],
        courses: [
          {
            title: "Microsoft Responsible AI Learning Path",
            provider: "Microsoft",
            url: "https://learn.microsoft.com/en-us/training/paths/responsible-ai-principles-practices/",
            summary: "Scenario-led guidance on harms modeling, risk mitigation, and compliance.",
          },
          {
            title: "Partnership on AI Labs",
            provider: "Partnership on AI",
            url: "https://partnershiponai.org/work/",
            summary: "Case studies and frameworks for algorithmic audits and transparency.",
          },
        ],
        books: [
          {
            title: "Ethics of Artificial Intelligence",
            author: "MIT",
            url: "https://ethics-of-ai.mooc.fi/",
          },
          {
            title: "Algorithmic Justice League Resources",
            author: "AJL",
            url: "https://www.ajl.org/resources",
          },
        ],
        path: [
          { title: "Step 1: Policy Landscape", detail: "Review global regulations (EU AI Act, NIST, OECD) and company policies." },
          { title: "Step 2: Risk Assessment", detail: "Facilitate risk workshops and document impact assessments." },
          { title: "Step 3: Audit Toolkit", detail: "Implement monitoring dashboards, red-teaming, and incident response plans." },
        ],
      },
      {
        id: "track-data-analytics-pro",
        name: "Data Analytics Deep Dive",
        headline: "Translate raw data into storytelling dashboards and business decisions.",
        description:
          "Package foundational analytics skills with end-to-end walkthroughs covering tooling, case studies, and live problem-solving.",
        tags: ["Analytics", "Visualization", "Business"],
        videos: [
          {
            title: "Introduction to Data Analytics Careers",
            url: "https://www.youtube.com/watch?v=ZJZfRw8nGqE",
            duration: "18m",
          },
          {
            title: "Data Analytics Crash Course",
            url: "https://youtu.be/YihH2HqS26U",
            duration: "~1h 15m",
          },
          {
            title: "Data Analytics Career Blueprint",
            url: "https://youtu.be/gDZ6czwuQ18?si=9ESISoGvG8_HfDln",
            duration: "~1h 30m",
          },
          {
            title: "Live Data Analytics Session",
            url: "https://www.youtube.com/live/A1JN_UN3mYE?si=Ds_EKrgoW7fcW2EO",
            duration: "~2h",
          },
          {
            title: "Analytics Project Playlist",
            url: "https://www.youtube.com/watch?v=YihH2HqS26U&list=RDYihH2HqS26U",
            duration: "Auto-generated mix",
          },
        ],
        courses: [
          {
            title: "Google Data Analytics Professional Certificate",
            provider: "Coursera",
            url: "https://www.coursera.org/professional-certificates/google-data-analytics",
            summary: "Eight-course certificate covering SQL, R, Tableau, and stakeholder-ready case studies.",
          },
          {
            title: "Maven Analytics SQL Challenge Lab",
            provider: "Maven Analytics",
            url: "https://mavenanalytics.io/challenges",
            summary: "Practice labs for cleaning, querying, and storytelling with real business datasets.",
          },
        ],
        books: [
          {
            title: "Storytelling with Data (field guide)",
            author: "Cole Nussbaumer Knaflic",
            url: "https://www.storytellingwithdata.com/blog",
          },
          {
            title: "Excel Dashboard Templates",
            author: "Chandoo",
            url: "https://chandoo.org/wp/excel-dashboards/",
          },
        ],
        path: [
          {
            title: "Stage 1: Tool Familiarity",
            detail: "Review SQL, spreadsheets, and BI dashboards used in the sessions.",
          },
          {
            title: "Stage 2: Analysis Rebuild",
            detail: "Recreate showcased analyses with your own datasets and document insights.",
          },
          {
            title: "Stage 3: Stakeholder Story",
            detail: "Craft an executive-ready presentation with visuals and action plans.",
          },
          {
            title: "Stage 4: Portfolio Publishing",
            detail: "Package dashboards, write impact summaries, and share insights on professional platforms.",
          },
        ],
      },
    ],
  },
  {
    id: "domain-cloud",
    name: "Cloud & DevOps",
    summary: "Deploy resilient infrastructure with automation, security, and observability built in.",
    icon: CloudCog,
    gradient: "from-sky-500 to-cyan-500",
    metrics: {
      tracks: 3,
      hours: "110+ hrs",
      resources: 22,
    },
    tracks: [
      {
        id: "track-aws-architect",
        name: "AWS Cloud Architect",
        headline: "Design scalable architectures, automation, and cost-aware deployments on AWS.",
        description:
          "Follow an exam-ready curriculum that blends console walkthroughs with infrastructure-as-code and security patterns.",
        tags: ["AWS", "IaC", "Security"],
        videos: [
          {
            title: "AWS Certified Solutions Architect Associate - freeCodeCamp",
            url: "https://www.youtube.com/watch?v=Ia-UEYYR44s",
            duration: "11h 55m",
          },
        ],
        courses: [
          {
            title: "AWS Skill Builder",
            provider: "Amazon",
            url: "https://skillbuilder.aws/",
            summary: "Interactive labs and exam prep quests for core AWS certifications.",
          },
          {
            title: "Cloud Resume Challenge",
            provider: "Forrest Brazeal",
            url: "https://cloudresumechallenge.dev/",
            summary: "Project-based curriculum to deploy a serverless resume with CI/CD and IaC.",
          },
        ],
        books: [
          {
            title: "AWS Well-Architected Framework",
            author: "Amazon",
            url: "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
          },
          {
            title: "Serverless Land Patterns",
            author: "Amazon",
            url: "https://serverlessland.com/patterns",
          },
        ],
        path: [
          { title: "Module 1: Core Services", detail: "Study compute, storage, networking pillars and build mental models." },
          { title: "Module 2: Architecting Workloads", detail: "Design for resiliency, security, and cost optimization." },
          { title: "Module 3: Hands-on Capstone", detail: "Automate deployment with IaC and document operational playbooks." },
        ],
      },
      {
        id: "track-devops-automation",
        name: "DevOps Automation Engineer",
        headline: "Ship code confidently with CI/CD, container orchestration, and observability.",
        description:
          "Compose pipelines, manage container workloads, and automate release hygiene using industry tooling.",
        tags: ["CI/CD", "Kubernetes", "Observability"],
        videos: [
          {
            title: "DevOps Crash Course - KodeKloud",
            url: "https://www.youtube.com/watch?v=j5Zsa_eOXeY",
            duration: "2h 18m",
          },
          {
            title: "Kubernetes for Beginners",
            url: "https://www.youtube.com/watch?v=X48VuDVv0do",
            duration: "4h 00m",
          },
        ],
        courses: [
          {
            title: "KodeKloud Hands-on Labs",
            provider: "KodeKloud",
            url: "https://kodekloud.com/hands-on-labs/",
            summary: "Browser-based labs for Docker, Kubernetes, Terraform, Jenkins, and more.",
          },
          {
            title: "HashiCorp Learn",
            provider: "HashiCorp",
            url: "https://developer.hashicorp.com/learn",
            summary: "Step-by-step tutorials for Terraform, Vault, Consul, and Waypoint.",
          },
        ],
        books: [
          {
            title: "Site Reliability Engineering",
            author: "Google",
            url: "https://sre.google/sre-book/table-of-contents/",
          },
          {
            title: "Continuous Delivery",
            author: "Jez Humble & David Farley",
            url: "https://www.continuousdelivery.com/",
          },
        ],
        path: [
          { title: "Sprint 1: Pipeline Foundations", detail: "Automate builds, tests, and security scanning in CI." },
          { title: "Sprint 2: Container Orchestration", detail: "Run workloads on Kubernetes with GitOps workflows." },
          { title: "Sprint 3: Observability & Incident Response", detail: "Instrument metrics, logs, traces, and practice incident drills." },
        ],
      },
      {
        id: "track-sre-practitioner",
        name: "Site Reliability Practitioner",
        headline: "Deliver reliability at scale with SLOs, chaos drills, and operational excellence.",
        description:
          "Implement SRE frameworks, chaos engineering experiments, and on-call playbooks to reduce toil.",
        tags: ["SLO", "Chaos", "On-call"],
        videos: [
          {
            title: "Google SRE Workbook Overview",
            url: "https://www.youtube.com/watch?v=Qn1elT1GOtI",
            duration: "48m",
          },
          {
            title: "Chaos Engineering 101",
            url: "https://www.youtube.com/watch?v=Y5ng1dLDP7A",
            duration: "1h 03m",
          },
        ],
        courses: [
          {
            title: "Gremlin Reliability Labs",
            provider: "Gremlin",
            url: "https://www.gremlin.com/community/tutorials/",
            summary: "Guided chaos experiments and resilience playbooks.",
          },
          {
            title: "PagerDuty Community Learning",
            provider: "PagerDuty",
            url: "https://www.pagerduty.com/resources/learn/",
            summary: "On-call simulations, incident response labs, and automation recipes.",
          },
        ],
        books: [
          {
            title: "The SRE Workbook",
            author: "Google",
            url: "https://sre.google/workbook/table-of-contents/",
          },
          {
            title: "The Incident Management Handbook",
            author: "PagerDuty",
            url: "https://response.pagerduty.com/",
          },
        ],
        path: [
          { title: "Stage 1: Define Reliability Targets", detail: "Set SLOs, SLIs, and error budgets aligned with product goals." },
          { title: "Stage 2: Automate & Reduce Toil", detail: "Implement runbooks, automation, and postmortem culture." },
          { title: "Stage 3: Chaos & Continuous Improvement", detail: "Schedule game days, measure MTTR, and iterate on learnings." },
        ],
      },
    ],
  },
  {
    id: "domain-healthcare",
    name: "Healthcare & Medical Careers",
    summary: "Advance clinical acumen, digital health literacy, and patient impact.",
    icon: Stethoscope,
    gradient: "from-rose-400 via-red-500 to-orange-500",
    metrics: {
      tracks: 9,
      hours: "140+ hrs",
      resources: 30,
    },
    tracks: [
      {
        id: "track-clinical-foundations",
        name: "Clinical Foundations (MBBS/MD Prep)",
        headline: "Strengthen core sciences and clinical reasoning for board-style exams.",
        description:
          "Refresh anatomy, physiology, and pharmacology with question banks, concept videos, and OSCE drills.",
        tags: ["Anatomy", "Physiology", "Clinicals"],
        videos: [
          {
            title: "Osmosis Cardiology Crash Course",
            url: "https://www.youtube.com/watch?v=8_XVZ9JjzQ0",
            duration: "48m",
          },
          {
            title: "Geeky Medics OSCE Walkthrough",
            url: "https://www.youtube.com/watch?v=Vu8QWf7FOrw",
            duration: "35m",
          },
        ],
        courses: [
          {
            title: "AMBOSS USMLE Step 1 Prep",
            provider: "AMBOSS",
            url: "https://www.amboss.com/us",
            summary: "High-yield question bank and concept library mapped to exam blueprints.",
          },
          {
            title: "Khan Academy Health & Medicine",
            provider: "Khan Academy",
            url: "https://www.khanacademy.org/science/health-and-medicine",
            summary: "Free structured playlists for foundational medical sciences.",
          },
        ],
        books: [
          {
            title: "First Aid for the USMLE Step 1 (free notes)",
            author: "USMLE-Rx",
            url: "https://firstaidteam.com/free-resources/",
          },
          {
            title: "Clinical Microbiology Made Ridiculously Simple (notes)",
            author: "Mark Gladwin",
            url: "https://medlibes.com/entry/clinical-microbiology-made-ridiculously-simple",
          },
        ],
        path: [
          { title: "Phase 1: Systems Review", detail: "Cycle through weekly organ-system blocks with spaced repetition." },
          { title: "Phase 2: Question Drills", detail: "Complete 40 timed questions daily and annotate weak concepts." },
          { title: "Phase 3: OSCE Simulation", detail: "Record mock stations, gather feedback, and refine bedside manner." },
        ],
      },
      {
        id: "track-digital-health",
        name: "Digital Health Innovator",
        headline: "Design technology-enabled care journeys and telehealth models.",
        description:
          "Pair clinical context with product thinking to launch digital therapeutics, remote monitoring, and EHR integrations.",
        tags: ["Telehealth", "Product", "Data"],
        videos: [
          {
            title: "HIMSS Digital Health Transformation",
            url: "https://www.youtube.com/watch?v=vN1d5k1XH7g",
            duration: "52m",
          },
          {
            title: "FHIR & Interoperability Basics",
            url: "https://www.youtube.com/watch?v=uC4tKjGkB7k",
            duration: "28m",
          },
        ],
        courses: [
          {
            title: "Harvard Digital Health Leadership",
            provider: "Harvard",
            url: "https://online.hbs.edu/courses/digital-health/",
            summary: "Strategy course combining healthcare trends, product management, and regulation.",
          },
          {
            title: "Health IT Playbook",
            provider: "ONC",
            url: "https://www.healthit.gov/playbook/",
            summary: "Implementation guide for telehealth, interoperability, and patient engagement.",
          },
        ],
        books: [
          {
            title: "Designing Connected Products",
            author: "Claire Rowland",
            url: "https://ia800904.us.archive.org/2/items/designingconnectedproducts/designingconnectedproducts.pdf",
          },
          {
            title: "Telehealth Toolkit",
            author: "World Health Organization",
            url: "https://apps.who.int/iris/handle/10665/331060",
          },
        ],
        path: [
          { title: "Step 1: Landscape Research", detail: "Map patient journey pain points and regulatory constraints." },
          { title: "Step 2: Prototype & Validate", detail: "Design service blueprints, run usability tests, and collect clinical validation." },
          { title: "Step 3: Launch & Measure", detail: "Define KPIs, integrate with EHRs, and iterate using real-world evidence." },
        ],
      },
      {
        id: "track-public-health",
        name: "Public Health & Policy Analyst",
        headline: "Blend epidemiology, data storytelling, and policy interventions.",
        description:
          "Analyze public health data, design interventions, and communicate findings to stakeholders with clarity.",
        tags: ["Epidemiology", "Policy", "Storytelling"],
        videos: [
          {
            title: "CDC Field Epidemiology Workshop",
            url: "https://www.youtube.com/watch?v=gxFWcRQJ-TM",
            duration: "40m",
          },
          {
            title: "Data Storytelling for Public Health",
            url: "https://www.youtube.com/watch?v=flpdrkcuGg0",
            duration: "32m",
          },
        ],
        courses: [
          {
            title: "Coursera: Epidemiology for Public Health",
            provider: "Imperial College London",
            url: "https://www.coursera.org/learn/epidemiology",
            summary: "Fundamentals of study design, surveillance, and outbreak analytics.",
          },
          {
            title: "DataCamp: Data Visualization for Public Health",
            provider: "DataCamp",
            url: "https://app.datacamp.com/learn/paths/data-scientist",
            summary: "Python-powered visualization techniques for health datasets.",
          },
        ],
        books: [
          {
            title: "Field Epidemiology Manual",
            author: "CDC",
            url: "https://www.cdc.gov/eis/downloads/FEG.pdf",
          },
          {
            title: "Health Policy Analysis Toolkit",
            author: "WHO",
            url: "https://apps.who.int/iris/handle/10665/325551",
          },
        ],
        path: [
          { title: "Stage 1: Methods Sprint", detail: "Review epidemiological study designs and statistical tests." },
          { title: "Stage 2: Data Deep Dive", detail: "Clean datasets, build dashboards, and tell persuasive stories." },
          { title: "Stage 3: Policy Brief", detail: "Draft an implementation plan with measurable health outcomes." },
        ],
      },
      {
        id: "track-medicine-surgery",
        name: "Medicine & Surgery Essentials",
        headline: "Strengthen clinical reasoning and surgical awareness with guided playlists.",
        description:
          "Leverage animated explainers and full-length lectures that walk through core systems, procedures, and decision-making for aspiring physicians.",
        tags: ["Clinicals", "Surgery"],
        videos: [
          {
            title: "Introduction to Medical & Surgical Careers",
            url: "https://www.youtube.com/watch?v=9ETr1vDLteI",
            duration: "21m",
          },
          {
            title: "Medicine & Surgery Career Overview",
            url: "https://youtu.be/FGJ6eHcqQWM?si=KLap8N3ArvlM3PN9",
            duration: "~35m",
          },
          {
            title: "Surgery Crash Course",
            url: "https://youtu.be/uBGl2BujkPQ?si=Ocgz-bu_DIc32DLW",
            duration: "~1h 10m",
          },
          {
            title: "Clinical Skills Mastery Playlist",
            url: "https://www.youtube.com/watch?v=FGJ6eHcqQWM&list=RDFGJ6eHcqQWM",
            duration: "Auto-generated mix",
          },
        ],
        courses: [
          {
            title: "Osmosis Clinical Skills Bootcamp",
            provider: "Osmosis",
            url: "https://www.osmosis.org/learn",
            summary: "Video-driven course covering bedside exams, diagnostics, and perioperative considerations.",
          },
          {
            title: "GIBLIB Surgical Procedures Lab",
            provider: "GIBLIB",
            url: "https://www.giblib.com/",
            summary: "Operating-room recorded labs reviewing step-by-step surgical techniques with narration.",
          },
        ],
        books: [
          {
            title: "Oxford Handbook of Clinical Medicine (open notes)",
            author: "Oxford University Press",
            url: "https://oxfordmedicine.com/view/10.1093/med/9780199689903.001.0001/med-9780199689903",
          },
          {
            title: "Surgical Recall Pocket Guide",
            author: "Lorne Blackbourne",
            url: "https://www.lww.com/resource/surgical-recall/",
          },
        ],
        path: [
          {
            title: "Block 1: Systems Review",
            detail: "Pair playlists with anatomy atlases for high-yield recall.",
          },
          {
            title: "Block 2: Clinical Reasoning",
            detail: "Work through case-based questions and simulate differential diagnosis.",
          },
          {
            title: "Block 3: Surgical Skills",
            detail: "Practice OSCE scenarios, suturing basics, and perioperative planning.",
          },
          {
            title: "Block 4: Case Reflections",
            detail: "Document clinical reflections, morbidity/mortality takeaways, and growth goals.",
          },
        ],
      },
      {
        id: "track-biotechnology",
        name: "Biotechnology Frontiers",
        headline: "Explore biotech breakthroughs, lab workflows, and commercialization paths.",
        description:
          "Mix documentary-style explainers with live summits highlighting biotech trends, research, and careers.",
        tags: ["Biotech", "Innovation"],
        videos: [
          {
            title: "Introduction to Biotechnology Careers",
            url: "https://www.youtube.com/watch?v=7mYQEG4Hi58",
            duration: "16m",
          },
          {
            title: "Biotechnology Career Snapshot",
            url: "https://youtu.be/GcCMFb6r-dM?si=C_67j8RYZ46kGanW",
            duration: "~25m",
          },
          {
            title: "Biotechnology Concepts Explained",
            url: "https://youtu.be/S-SIdczw-hc?si=x1_fYliY29F3zev-",
            duration: "~1h",
          },
          {
            title: "Biotech Live Summit Session",
            url: "https://www.youtube.com/live/Dq0K2gOl0CY?si=pH7hzahnBfe9NyNm",
            duration: "~2h",
          },
          {
            title: "Biotech Careers Playlist",
            url: "https://www.youtube.com/watch?v=GcCMFb6r-dM&list=RDGcCMFb6r-dM",
            duration: "Auto-generated mix",
          },
        ],
        courses: [
          {
            title: "MITx: Molecular Biology - Laboratory Techniques",
            provider: "edX",
            url: "https://www.edx.org/course/molecular-biology-laboratory-techniques",
            summary: "Virtual wet-lab simulations practicing PCR, cloning, and protein assays.",
          },
          {
            title: "Coursera: Industrial Biotechnology",
            provider: "University of Manchester",
            url: "https://www.coursera.org/learn/industrial-biotechnology",
            summary: "Case-driven course on scaling biotech innovations from lab to market.",
          },
        ],
        books: [
          {
            title: "Biodesign Innovation Guide",
            author: "Stanford Biodesign",
            url: "https://biodesign.stanford.edu/resources/ebooks.html",
          },
          {
            title: "FDA Drug Development Handbook",
            author: "FDA",
            url: "https://www.fda.gov/drugs/development-approval-process-drugs",
          },
        ],
        path: [
          {
            title: "Phase 1: Science Foundations",
            detail: "Review molecular biology, genetics, and regulatory vocabulary.",
          },
          {
            title: "Phase 2: Lab Translation",
            detail: "Document R&D workflows, assay design, and quality controls.",
          },
          {
            title: "Phase 3: Commercialization",
            detail: "Map clinical trials, approvals, and go-to-market strategies.",
          },
        ],
      },
      {
        id: "track-pharmacy",
        name: "Pharmacy Practice Guide",
        headline: "Dive into pharmacology, dispensing, and patient counseling best practices.",
        description:
          "Use focused lectures to reinforce pharmacotherapy essentials while exploring community, clinical, and research pharmacy roles.",
        tags: ["Pharmacology", "Patient Care"],
        videos: [
          {
            title: "Introduction to Pharmacy Careers",
            url: "https://www.youtube.com/watch?v=P-4W9L5h-Y4",
            duration: "14m",
          },
          {
            title: "Pharmacy Career Overview",
            url: "https://youtu.be/LPbXY0ZBViY?si=X3_csYZt80ElWbLC",
            duration: "~30m",
          },
          {
            title: "Pharmacist Day in the Life",
            url: "https://youtu.be/SXhMXl0sXcM?si=imYpRrkpUofoECFB",
            duration: "~45m",
          },
          {
            title: "Clinical Pharmacy Playlist",
            url: "https://www.youtube.com/watch?v=LPbXY0ZBViY&list=RDLPbXY0ZBViY",
            duration: "Auto-generated mix",
          },
        ],
        courses: [
          {
            title: "RxPrep Clinical Pharmacology Review",
            provider: "RxPrep",
            url: "https://rxprep.com/",
            summary: "Structured review sessions for therapeutics, calculations, and patient counseling scenarios.",
          },
          {
            title: "ASHP Pharmacy Practice Lab",
            provider: "ASHP",
            url: "https://www.ashp.org/Professional-Development/Student-Resources/Pharmacy-Student-Forum",
            summary: "Simulation-based labs for sterile compounding, medication therapy management, and safety checks.",
          },
        ],
        books: [
          {
            title: "Pharmacotherapy Handbook (open resource)",
            author: "Barbara G. Wells",
            url: "https://accesspharmacy.mhmedical.com/book.aspx?bookID=2449",
          },
          {
            title: "APhA Patient Counseling Checklist",
            author: "American Pharmacists Association",
            url: "https://www.pharmacist.com/Education/Patient-Counseling",
          },
        ],
        path: [
          {
            title: "Segment 1: Drug Mechanisms",
            detail: "Summarize top therapeutics, interactions, and monitoring requirements.",
          },
          {
            title: "Segment 2: Patient Counseling",
            detail: "Role-play counseling scenarios to build communication confidence.",
          },
          {
            title: "Segment 3: Advanced Practice",
            detail: "Outline clinical, regulatory, and research pathways for specialization.",
          },
        ],
      },
      {
        id: "track-nursing",
        name: "Nursing & Patient Care Pathways",
        headline: "Build core nursing competencies and explore leadership trajectories.",
        description:
          "Follow guided tours of nursing responsibilities, clinical routines, and advanced practice opportunities.",
        tags: ["Nursing", "Leadership"],
        videos: [
          {
            title: "Introduction to Nursing Careers",
            url: "https://www.youtube.com/watch?v=QjO0esaS1Qw",
            duration: "16m",
          },
          {
            title: "Nursing Career Overview",
            url: "https://youtu.be/d0K6EVB1KnU?si=NO_DmblOpNDxOFpX",
            duration: "~28m",
          },
          {
            title: "Nursing Roles Explained",
            url: "https://youtu.be/yWbG6W98SUk?si=KhNfDxPGkukNbmWc",
            duration: "~50m",
          },
          {
            title: "Nurse Leadership Live Session",
            url: "https://youtu.be/BrCHiVtJ5Ag?si=Rmusmp4AGGDAjPN_",
            duration: "~1h 30m",
          },
          {
            title: "Nursing Skills Masterclass Playlist",
            url: "https://www.youtube.com/watch?v=d0K6EVB1KnU&list=RDd0K6EVB1KnU",
            duration: "Auto-generated mix",
          },
        ],
        courses: [
          {
            title: "Nurse.org Clinical Skills Lab",
            provider: "Nurse.org",
            url: "https://nurse.org/resources/clinical-skills-lab/",
            summary: "Scenario-driven labs rehearsing patient assessments, medication administration, and documentation.",
          },
          {
            title: "Coursera: Nursing Leadership & Management",
            provider: "University of Illinois",
            url: "https://www.coursera.org/specializations/nursing-leadership",
            summary: "Leadership pathway covering care delivery models, staffing, and quality improvement projects.",
          },
        ],
        books: [
          {
            title: "ANA Nursing Scope & Standards",
            author: "American Nurses Association",
            url: "https://www.nursingworld.org/practice-policy/scope-of-practice/",
          },
          {
            title: "Johns Hopkins Evidence-Based Practice Toolkit",
            author: "Johns Hopkins Medicine",
            url: "https://www.hopkinsmedicine.org/evidence-based-practice/ijhn_2017_ebptoolkit.html",
          },
        ],
        path: [
          {
            title: "Stage 1: Foundations",
            detail: "Review core competencies, patient safety, and documentation standards.",
          },
          {
            title: "Stage 2: Clinical Rotations",
            detail: "Simulate shift planning, report handoffs, and interdisciplinary collaboration.",
          },
          {
            title: "Stage 3: Career Growth",
            detail: "Explore advanced practice, leadership degrees, and mentoring pathways.",
          },
        ],
      },
      {
        id: "track-psychology-mental-health",
        name: "Psychology & Mental Health",
        headline: "Center mental health awareness, counseling frameworks, and psychiatry careers.",
        description:
          "Blend practitioner interviews with mental health explainers to understand therapy modalities and psychiatric practice.",
        tags: ["Psychology", "Mental Health"],
        videos: [
          {
            title: "Introduction to Mental Health Careers",
            url: "https://www.youtube.com/watch?v=UZb2NOHPA2A",
            duration: "20m",
          },
          {
            title: "Psychiatry Career Insight",
            url: "https://youtu.be/zhY-iODwlVQ?si=ftAbhTKJ962fsIHR",
            duration: "~30m",
          },
          {
            title: "Mental Health Counseling Essentials",
            url: "https://youtu.be/5NvR33f5gLw?si=YwFQYSk4HDEk66ly",
            duration: "~45m",
          },
          {
            title: "Therapy Modalities Playlist",
            url: "https://www.youtube.com/watch?v=zhY-iODwlVQ&list=RDzhY-iODwlVQ",
            duration: "Auto-generated mix",
          },
        ],
        courses: [
          {
            title: "Coursera: Introduction to Psychology",
            provider: "Yale University",
            url: "https://www.coursera.org/learn/introduction-psychology",
            summary: "Survey course covering cognitive science, behaviorism, and clinical applications.",
          },
          {
            title: "Open Path Collective: Counseling Skills Lab",
            provider: "Open Path Collective",
            url: "https://openpathcollective.org/training/",
            summary: "Practice labs for motivational interviewing, CBT frameworks, and client documentation.",
          },
        ],
        books: [
          {
            title: "APA Clinical Practice Guidelines",
            author: "American Psychological Association",
            url: "https://www.apa.org/practice/guidelines",
          },
          {
            title: "Mindfulness-Based Cognitive Therapy Workbook",
            author: "Zindel Segal",
            url: "https://www.guilford.com/books/The-Mindfulness-Based-Cognitive-Therapy-Workbook/Segal-Williams-Teasdale/9781462548477/free-materials",
          },
        ],
        path: [
          {
            title: "Module 1: Foundational Knowledge",
            detail: "Refresh core terminology, ethics, and assessment approaches.",
          },
          {
            title: "Module 2: Therapeutic Practice",
            detail: "Practice counseling frameworks and reflective listening exercises.",
          },
          {
            title: "Module 3: Specialization",
            detail: "Research residency, fellowship, and licensure requirements.",
          },
        ],
      },
      {
        id: "track-medical-research",
        name: "Medical Research & Innovation",
        headline: "Investigate research design, lab careers, and translational medicine.",
        description:
          "Watch research scientists outline study design, lab workflows, and breakthrough case studies to inspire your next project.",
        tags: ["Research", "Innovation"],
        videos: [
          {
            title: "Introduction to Medical Research Careers",
            url: "https://www.youtube.com/watch?v=OryP8K_ZcG8",
            duration: "18m",
          },
          {
            title: "Medical Research Scientist Career",
            url: "https://youtu.be/pgzYw77KRsU?si=oV874CctvD91kxY7",
            duration: "~35m",
          },
          {
            title: "Research Design Basics",
            url: "https://youtu.be/igwqp_yIgwM?si=I8uglxTyDbtrkrQ6",
            duration: "~55m",
          },
          {
            title: "Clinical Research Live Session",
            url: "https://youtu.be/1Q6_LRZwZrc?si=_M8BS9hCw-vWMrno",
            duration: "~1h 40m",
          },
          {
            title: "Clinical Research Methods Playlist",
            url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtOAKed_MxxWBNaPno5h3Zs8",
            duration: "~7h playlist",
          },
        ],
        courses: [
          {
            title: "NIH Introduction to the Principles and Practice of Clinical Research",
            provider: "NIH",
            url: "https://ocr.od.nih.gov/courses/ippcr.html",
            summary: "Comprehensive curriculum covering clinical trial design, ethics, and data management.",
          },
          {
            title: "Coursera: Design and Interpretation of Clinical Trials",
            provider: "Johns Hopkins University",
            url: "https://www.coursera.org/learn/clinical-trials",
            summary: "Case-study labs exploring endpoints, randomization, and regulatory submissions.",
          },
        ],
        books: [
          {
            title: "CONSORT Reporting Guidelines",
            author: "CONSORT Group",
            url: "https://www.consort-statement.org/",
          },
          {
            title: "Good Clinical Practice (ICH E6)",
            author: "ICH",
            url: "https://ichgcp.net/",
          },
        ],
        path: [
          {
            title: "Step 1: Study Fundamentals",
            detail: "Outline hypothesis, protocols, and ethical considerations for sample projects.",
          },
          {
            title: "Step 2: Data Capture",
            detail: "Practice documenting experiments, running analyses, and interpreting findings.",
          },
          {
            title: "Step 3: Publication & Impact",
            detail: "Draft abstracts, identify journals, and plan knowledge translation.",
          },
        ],
      },
    ],
  },
  {
    id: "domain-legal",
    name: "Legal & Policy",
    summary: "Sharpen legal reasoning, policy strategy, and advocacy impact.",
    icon: Scale,
    gradient: "from-amber-500 to-yellow-500",
    metrics: {
      tracks: 9,
      hours: "120+ hrs",
      resources: 30,
    },
    tracks: [
      {
        id: "track-bar-prep",
        name: "Bar Exam Strategist",
        headline: "Master the MBE, MEE, and MPT with disciplined repetition.",
        description:
          "Blend doctrine refreshers with timed practice, analytics, and memorization frameworks.",
        tags: ["MBE", "Essay", "Practice"],
        videos: [
          {
            title: "Bar Exam Study Strategy - Quimbee",
            url: "https://www.youtube.com/watch?v=Goqo_oziJrA",
            duration: "28m",
          },
          {
            title: "Essay Writing for the Bar",
            url: "https://www.youtube.com/watch?v=0e2Pz6GyF_Q",
            duration: "36m",
          },
        ],
        courses: [
          {
            title: "BARBRI Free Prep",
            provider: "BARBRI",
            url: "https://www.barbri.com/free-bar-review/",
            summary: "Diagnostic quizzes, daily drills, and exam strategy videos.",
          },
          {
            title: "NCBE Study Aids",
            provider: "NCBE",
            url: "https://studyaids.ncbex.org/",
            summary: "Official question bank with detailed explanations and performance tracking.",
          },
        ],
        books: [
          {
            title: "Lean Sheets - Free Samples",
            author: "Lean Sheets",
            url: "https://www.leansheets.com/free-bar-lean-sheets",
          },
          {
            title: "BarMax Downloadable Outlines",
            author: "BarMax",
            url: "https://testmaxprep.com/bar-exam/free-bar-review-resources",
          },
        ],
        path: [
          { title: "Phase 1: Doctrine Review", detail: "Outline blackletter law for all tested subjects." },
          { title: "Phase 2: Daily Mixed Sets", detail: "Complete 2×30 question blocks and timed essays daily." },
          { title: "Phase 3: Simulated Exams", detail: "Sit for two full practice exams and analyze weak areas." },
        ],
      },
      {
        id: "track-policy-advocacy",
        name: "Policy & Advocacy Leader",
        headline: "Craft evidence-backed policy briefs and negotiation strategies.",
        description:
          "Translate research into compelling narratives, drive stakeholder alignment, and influence legislation.",
        tags: ["Negotiation", "Research", "Impact"],
        videos: [
          {
            title: "How to Write a Policy Brief",
            url: "https://www.youtube.com/watch?v=3uYA4GEXL60",
            duration: "24m",
          },
          {
            title: "Harvard Negotiation Primer",
            url: "https://www.youtube.com/watch?v=eZ9wP9dM3dA",
            duration: "31m",
          },
        ],
        courses: [
          {
            title: "Coursera Public Policy Specialization",
            provider: "University of Virginia",
            url: "https://www.coursera.org/specializations/public-policy",
            summary: "Policy analysis, economics, and evaluation toolkit with a capstone project.",
          },
          {
            title: "Harvard Negotiation Institute",
            provider: "Harvard",
            url: "https://www.pon.harvard.edu/courses-and-training/",
            summary: "Simulation-based training for high-stakes negotiations.",
          },
        ],
        books: [
          {
            title: "The GovLab Academy Playbook",
            author: "The GovLab",
            url: "https://www.thegovlab.org/academy.html",
          },
          {
            title: "UN Policy Toolkit",
            author: "United Nations",
            url: "https://www.un.org/en/pdfs/un_policy_toolkit.pdf",
          },
        ],
        path: [
          { title: "Step 1: Problem Framing", detail: "Map stakeholders, incentives, and policy levers." },
          { title: "Step 2: Evidence Pack", detail: "Collect data, build models, and craft persuasive narratives." },
          { title: "Step 3: Advocacy Sprint", detail: "Prepare testimony, coalition briefs, and negotiation scripts." },
        ],
      },
      {
        id: "track-legal-tech",
        name: "Legal Tech & Innovation",
        headline: "Automate workflows, build client-facing tools, and manage knowledge at scale.",
        description:
          "Blend no-code tooling, document automation, and AI assistants to modernize legal service delivery.",
        tags: ["Automation", "Knowledge", "AI"],
        videos: [
          {
            title: "Legal Design Thinking Basics",
            url: "https://www.youtube.com/watch?v=Z9YqCyOU0Jw",
            duration: "42m",
          },
          {
            title: "Document Automation with Docassemble",
            url: "https://www.youtube.com/watch?v=RI4NwrfZz0E",
            duration: "1h 15m",
          },
        ],
        courses: [
          {
            title: "Legal Tech & Ops",
            provider: "LawTech Hub",
            url: "https://www.lawtechhub.com/resources",
            summary: "Playbooks and webinars on automation, client portals, and innovation programs.",
          },
          {
            title: "DoNotPay Automation Tutorials",
            provider: "DoNotPay",
            url: "https://donotpay.com/learn/",
            summary: "Guides for building automated legal workflows and chatbots.",
          },
        ],
        books: [
          {
            title: "Legal Design Toolkit",
            author: "Stanford Legal Design Lab",
            url: "https://www.legaltechdesign.com/",
          },
          {
            title: "Automation for Lawyers",
            author: "Documate",
            url: "https://documate.org/legal-automation-guide/",
          },
        ],
        path: [
          { title: "Phase 1: Discovery", detail: "Identify repetitive workflows and user pain points." },
          { title: "Phase 2: Prototype", detail: "Automate documents, build client portals, and test with users." },
          { title: "Phase 3: Scale", detail: "Measure ROI, integrate knowledge bases, and train teams." },
        ],
      },
      {
        id: "track-civil-criminal-law",
        name: "Civil & Criminal Law Essentials",
        headline: "Compare litigation pathways, case preparation, and courtroom advocacy.",
        description:
          "Watch practitioners outline procedures, precedent analysis, and advocacy strategies for both civil and criminal matters.",
        tags: ["Litigation", "Advocacy"],
        videos: [
          {
            title: "Civil vs Criminal Law Explained",
            url: "https://www.youtube.com/watch?v=IUZf0Y7eM_s",
            duration: "13m",
          },
          {
            title: "Civil & Criminal Law Overview",
            url: "https://youtu.be/Zg5ex8WZUao?si=1FobThP1nLDlz5KG",
            duration: "~40m",
          },
          {
            title: "Civil vs Criminal Law Live Class",
            url: "https://www.youtube.com/live/3FR0hOJab1g?si=EKA9HPcTK9wne8ry",
            duration: "~2h",
          },
          {
            title: "Litigation Essentials Playlist",
            url: "https://www.youtube.com/watch?v=IUZf0Y7eM_s&list=RDIUZf0Y7eM_s",
            duration: "Auto-generated mix",
          },
        ],
        courses: [
          {
            title: "Coursera: Introduction to International Criminal Law",
            provider: "Case Western Reserve University",
            url: "https://www.coursera.org/learn/international-criminal-law",
            summary: "Explores substantive criminal law, procedure, and landmark international cases.",
          },
          {
            title: "edX: Introduction to American Law",
            provider: "University of Pennsylvania",
            url: "https://www.edx.org/course/introduction-to-american-law",
            summary: "Survey course covering civil litigation, criminal justice, property, and constitutional law.",
          },
        ],
        books: [
          {
            title: "Federal Rules of Civil Procedure",
            author: "United States Courts",
            url: "https://www.uscourts.gov/sites/default/files/federal_rules_of_civil_procedure.pdf",
          },
          {
            title: "Federal Rules of Criminal Procedure",
            author: "United States Courts",
            url: "https://www.uscourts.gov/sites/default/files/federal_rules_of_criminal_procedure_0.pdf",
          },
        ],
        path: [
          {
            title: "Module 1: Procedure & Precedent",
            detail: "Map criminal and civil procedural timelines and key filings.",
          },
          {
            title: "Module 2: Case Strategy",
            detail: "Analyze sample cases, evidence handling, and negotiation points.",
          },
          {
            title: "Module 3: Trial Advocacy",
            detail: "Practice opening statements, witness prep, and cross-examination tactics.",
          },
          {
            title: "Module 4: Mock Trial Sprint",
            detail: "Rehearse a simulated trial, capture feedback, and refine courtroom presence.",
          },
        ],
      },
      {
        id: "track-corporate-law",
        name: "Corporate Law Playbook",
        headline: "Understand corporate structures, transactions, and advisory roles.",
        description:
          "Pair overview videos with deep dives into compliance, governance, and deal execution for in-house and firm-side counsel.",
        tags: ["Corporate", "Transactions"],
        videos: [
          {
            title: "Corporate Lawyer Career Paths",
            url: "https://www.youtube.com/watch?v=J0b0s8AjtK4",
            duration: "16m",
          },
          {
            title: "Corporate Law Career Overview",
            url: "https://youtu.be/gJ1r2W5nOSU?si=wSv-UTN_7Y8Byi_e",
            duration: "~30m",
          },
          {
            title: "Corporate Law Explained",
            url: "https://youtu.be/o-d1hRSOLlY?si=AOSOShhS4VRBoBgi",
            duration: "~1h",
          },
          {
            title: "M&A and Corporate Practice Playlist",
            url: "https://www.youtube.com/watch?v=gJ1r2W5nOSU&list=RDgJ1r2W5nOSU",
            duration: "Auto-generated mix",
          },
        ],
        courses: [
          {
            title: "Coursera: Corporate & Commercial Law I",
            provider: "University of Illinois",
            url: "https://www.coursera.org/learn/corporate-commercial-law-part1",
            summary: "Covers corporate personhood, fiduciary duties, employment contracts, and liability frameworks.",
          },
          {
            title: "edX: Mergers and Acquisitions",
            provider: "New York Institute of Finance",
            url: "https://www.edx.org/course/mergers-and-acquisitions-the-relentless-pursuit-of-synergy",
            summary: "Transaction-focused labs on deal structuring, valuation, and integration planning.",
          },
        ],
        books: [
          {
            title: "Delaware General Corporation Law",
            author: "State of Delaware",
            url: "https://delcode.delaware.gov/title8/c001/",
          },
          {
            title: "OECD Principles of Corporate Governance",
            author: "OECD",
            url: "https://www.oecd.org/corporate/principles-corporate-governance/",
          },
        ],
        path: [
          {
            title: "Stage 1: Entity Foundations",
            detail: "Review corporate forms, governance duties, and regulatory obligations.",
          },
          {
            title: "Stage 2: Transaction Lifecycle",
            detail: "Follow due diligence, drafting, and closing steps for deals.",
          },
          {
            title: "Stage 3: Advisory Skills",
            detail: "Practice board communications and cross-functional stakeholder support.",
          },
          {
            title: "Stage 4: Deal Post-Mortem",
            detail: "Summarize lessons learned, integration risks, and compliance follow-ups after a simulated deal.",
          },
        ],
      },
      {
        id: "track-international-law",
        name: "International Law & Diplomacy",
        headline: "Navigate treaties, multilateral institutions, and cross-border disputes.",
        description:
          "Explore global governance, arbitration, and human rights case studies through practitioner-led sessions.",
        tags: ["International", "Policy"],
        videos: [
          {
            title: "International Law Basics",
            url: "https://www.youtube.com/watch?v=V0dS6l6ti7o",
            duration: "12m",
          },
          {
            title: "International Law Explained",
            url: "https://www.youtube.com/watch?v=6UCftRMy2a0",
            duration: "15m",
          },
          {
            title: "International Law Live Briefing",
            url: "https://www.youtube.com/live/4kO5PD2lbmk?si=4HIrvwOqvu15lf9Z",
            duration: "~1h 30m",
          },
          {
            title: "Global Diplomacy Playlist",
            url: "https://www.youtube.com/watch?v=V0dS6l6ti7o&list=RDV0dS6l6ti7o",
            duration: "Auto-generated mix",
          },
        ],
        courses: [
          {
            title: "Coursera: International Law in Action",
            provider: "Leiden University",
            url: "https://www.coursera.org/specializations/international-law-in-action",
            summary: "Specialization covering international courts, arbitration, and transnational justice labs.",
          },
          {
            title: "edX: International Human Rights Law",
            provider: "Université catholique de Louvain",
            url: "https://www.edx.org/course/international-human-rights-law",
            summary: "Case-based course exploring treaties, enforcement mechanisms, and advocacy strategies.",
          },
        ],
        books: [
          {
            title: "UN Audiovisual Library of International Law",
            author: "United Nations",
            url: "https://legal.un.org/avl/",
          },
          {
            title: "ICJ Handbook",
            author: "International Court of Justice",
            url: "https://www.icj-cij.org/public/files/publications/handbook-of-the-icj/en/handbook-of-the-icj.pdf",
          },
        ],
        path: [
          {
            title: "Segment 1: Frameworks",
            detail: "Review public vs private international law sources and institutions.",
          },
          {
            title: "Segment 2: Case Studies",
            detail: "Summarize landmark cases and arbitration decisions.",
          },
          {
            title: "Segment 3: Diplomacy Skills",
            detail: "Practice negotiation, memo writing, and cross-cultural communication.",
          },
          {
            title: "Segment 4: Moot Court",
            detail: "Draft memorials and deliver oral arguments for a simulated international dispute.",
          },
        ],
      },
      {
        id: "track-public-administration",
        name: "Public Administration Leadership",
        headline: "Lead government programs with operational, ethical, and policy rigor.",
        description:
          "Review civil service responsibilities, program design, and administrative law fundamentals through long-form sessions.",
        tags: ["Administration", "Governance"],
        videos: [
          {
            title: "What Is Public Administration?",
            url: "https://www.youtube.com/watch?v=YsYHqfk0X2o",
            duration: "8m",
          },
          {
            title: "Public Administration Masterclass",
            url: "https://www.youtube.com/live/3Evmv1ZsAoM?si=PcgxDwAoeyfskdn",
            duration: "~2h",
          },
          {
            title: "Public Service Leadership Playlist",
            url: "https://www.youtube.com/watch?v=YsYHqfk0X2o&list=RDYsYHqfk0X2o",
            duration: "Auto-generated mix",
          },
        ],
        courses: [
          {
            title: "Coursera: Public Policy Challenges of the 21st Century",
            provider: "University of Virginia",
            url: "https://www.coursera.org/learn/public-policy-challenges",
            summary: "Case-led course unpacking budgeting, education, health, and security policymaking.",
          },
          {
            title: "edX: Leadership in Global Development",
            provider: "University of Queensland",
            url: "https://www.edx.org/course/leadership-in-global-development",
            summary: "Project labs exploring stakeholder alignment, systems thinking, and adaptive leadership.",
          },
        ],
        books: [
          {
            title: "Open Government Partnership Toolkit",
            author: "OGP",
            url: "https://www.opengovpartnership.org/documents/ogp-toolkit/",
          },
          {
            title: "World Bank: Results-Based Management Handbook",
            author: "World Bank",
            url: "https://documents1.worldbank.org/curated/en/229051468337191386/pdf/809590WP0ENGLI0sult0Based0Managment.pdf",
          },
        ],
        path: [
          {
            title: "Phase 1: Governance Basics",
            detail: "Understand constitutional mandates, administrative law, and public finance.",
          },
          {
            title: "Phase 2: Program Delivery",
            detail: "Plan service delivery models, stakeholder engagement, and communication cadences.",
          },
          {
            title: "Phase 3: Accountability",
            detail: "Develop performance metrics, audits, and transparency playbooks.",
          },
          {
            title: "Phase 4: Implementation Lab",
            detail: "Prototype a service improvement project and document change management steps.",
          },
        ],
      },
      {
        id: "track-policy-analysis",
        name: "Policy Analysis Studio",
        headline: "Sharpen evidence-based analysis and evaluation methodologies.",
        description:
          "Break down policy frameworks, cost-benefit evaluation, and monitoring strategies using deep-dive lectures.",
        tags: ["Policy", "Analytics"],
        videos: [
          {
            title: "Public Policy Basics",
            url: "https://www.youtube.com/watch?v=LO6dU4H8uFw",
            duration: "10m",
          },
          {
            title: "Policy Analysis Live Workshop",
            url: "https://www.youtube.com/live/3Evmv1ZsAoM?si=CfrhFYbmYrYprkja",
            duration: "~2h",
          },
          {
            title: "Policy Analytics Playlist",
            url: "https://www.youtube.com/watch?v=LO6dU4H8uFw&list=RDLO6dU4H8uFw",
            duration: "Auto-generated mix",
          },
        ],
        courses: [
          {
            title: "Coursera: The Public Policy Analyst's Toolkit",
            provider: "University of Minnesota",
            url: "https://www.coursera.org/learn/policy-analysts-toolkit",
            summary: "Applies cost-benefit, decision trees, and political feasibility analysis to real cases.",
          },
          {
            title: "edX: Data for Effective Policy Making",
            provider: "Inter-American Development Bank",
            url: "https://www.edx.org/course/data-for-effective-policy-making",
            summary: "Hands-on labs turning administrative data into policy dashboards and evaluations.",
          },
        ],
        books: [
          {
            title: "OECD Better Regulation Toolkit",
            author: "OECD",
            url: "https://www.oecd.org/gov/regulatory-policy/toolkit/",
          },
          {
            title: "UNDP Handbook on Planning, Monitoring and Evaluating",
            author: "UNDP",
            url: "https://www.undp.org/publications/handbook-planning-monitoring-and-evaluating",
          },
        ],
        path: [
          {
            title: "Step 1: Framework Selection",
            detail: "Choose analysis frameworks fit for economic, social, or regulatory problems.",
          },
          {
            title: "Step 2: Evidence Gathering",
            detail: "Inventory qualitative and quantitative data sources supporting recommendations.",
          },
          {
            title: "Step 3: Evaluation",
            detail: "Propose implementation metrics, monitoring plans, and feedback loops.",
          },
          {
            title: "Step 4: Policy Memo Sprint",
            detail: "Draft a decision memo, peer review it, and capture key takeaways for senior leaders.",
          },
        ],
      },
      {
        id: "track-legal-research",
        name: "Legal Research & Writing",
        headline: "Master efficient research workflows and persuasive legal writing.",
        description:
          "Combine modern research platform walkthroughs with practical tips for memos, briefs, and citation management.",
        tags: ["Research", "Writing"],
        videos: [
          {
            title: "Legal Research Essentials (Intro)",
            url: "https://youtu.be/pKYvKJff12c?si=iyG2KCfQH01EXKgI",
            duration: "~32m",
          },
          {
            title: "Legal Research Workflow Playlist",
            url: "https://www.youtube.com/watch?v=pKYvKJff12c&list=RDpKYvKJff12c",
            duration: "Auto-generated mix",
          },
        ],
        courses: [
          {
            title: "LawShelf: Researching the Law",
            provider: "LawShelf",
            url: "https://lawshelf.com/coursewarecontentview/researching-the-law",
            summary: "Self-paced modules covering secondary sources, citators, and Boolean search labs.",
          },
          {
            title: "LexisNexis Interactive Research Certification",
            provider: "LexisNexis",
            url: "https://www.lexisnexis.com/en-us/training/student/learning/lexis-certification.page",
            summary: "Hands-on lab earning certification for efficient Lexis+ searching and Shepardizing.",
          },
        ],
        books: [
          {
            title: "Bluebook Quick Reference Guide",
            author: "Harvard Law Review",
            url: "https://www.legalbluebook.com/Public/Bluebook-Guide",
          },
          {
            title: "Cornell Law: Legal Research Manual",
            author: "Cornell Law Library",
            url: "https://www.law.cornell.edu/lii/legalresearch",
          },
        ],
        path: [
          {
            title: "Unit 1: Platforms & Sources",
            detail: "Catalog primary and secondary sources with efficient query design.",
          },
          {
            title: "Unit 2: Analysis",
            detail: "Synthesize authority, distinguish holdings, and capture key quotes.",
          },
          {
            title: "Unit 3: Writing",
            detail: "Draft memos, briefs, and client updates with clear, persuasive structure.",
          },
          {
            title: "Unit 4: Citation Lab",
            detail: "Practice Bluebook formatting, run citator checks, and export polished references.",
          },
        ],
      },
    ],
  },
  {
    id: "domain-career",
    name: "Career & Interview Excellence",
    summary: "Practice storytelling, technical mastery, and offer negotiation end-to-end.",
    icon: UserCheck,
    gradient: "from-rose-500 to-purple-500",
    metrics: {
      tracks: 3,
      hours: "75+ hrs",
      resources: 15,
    },
    tracks: [
      {
        id: "track-technical-interviews",
        name: "Technical Interview Simulator",
        headline: "Strengthen algorithms, systems design, and whiteboard narratives.",
        description:
          "Blend timed drills with mock interviews and post-mortem analysis to grow confidence.",
        tags: ["DSA", "Systems", "Mock Interviews"],
        videos: [
          {
            title: "System Design Interview Crash Course",
            url: "https://www.youtube.com/watch?v=ZduEKxgJkVI",
            duration: "1h 10m",
          },
          {
            title: "Behavioral STAR Stories",
            url: "https://www.youtube.com/watch?v=V1PwRb9L6Hc",
            duration: "26m",
          },
        ],
        courses: [
          {
            title: "HackerRank Interview Preparation Kit",
            provider: "HackerRank",
            url: "https://www.hackerrank.com/interview/interview-preparation-kit",
            summary: "Curated question sets mapped to company interview loops.",
          },
          {
            title: "Pramp Live Mock Interviews",
            provider: "Pramp",
            url: "https://www.pramp.com/",
            summary: "Peer-to-peer live interviews with structured feedback.",
          },
        ],
        books: [
          {
            title: "Grokking the Coding Interview (free patterns)",
            author: "Design Gurus",
            url: "https://www.designgurus.io/course/grokking-the-coding-interview",
          },
          {
            title: "System Design Primer",
            author: "Donne Martin",
            url: "https://github.com/donnemartin/system-design-primer",
          },
        ],
        path: [
          { title: "Week 1-3: Algorithm Sprints", detail: "Daily problem sets by topic with spaced repetition." },
          { title: "Week 4-5: System Design", detail: "Simulate interviews and document architectures with trade-offs." },
          { title: "Week 6+: Mock Loops", detail: "Schedule two mocks per week and refine storytelling patterns." },
        ],
      },
      {
        id: "track-behavioral-storytelling",
        name: "Behavioral Storytelling & Leadership",
        headline: "Communicate impact with clarity across leadership behaviors.",
        description:
          "Craft signature stories, align them to competencies, and rehearse executive-ready delivery.",
        tags: ["Leadership", "Storytelling", "Communication"],
        videos: [
          {
            title: "Behavioral Interview Prep - Big Interview",
            url: "https://www.youtube.com/watch?v=fhWJ9q7c_04",
            duration: "33m",
          },
          {
            title: "Executive Presence Essentials",
            url: "https://www.youtube.com/watch?v=5xI7eq37J7Y",
            duration: "29m",
          },
        ],
        courses: [
          {
            title: "Big Interview Behavioral Curriculum",
            provider: "Big Interview",
            url: "https://biginterview.com/",
            summary: "Video lessons, practice questions, and AI feedback for behavioral interviews.",
          },
          {
            title: "Levels.fyi Practice",
            provider: "Levels.fyi",
            url: "https://www.levels.fyi/practice/interviews/behavioral",
            summary: "Competency-based practice prompts with scoring insights.",
          },
        ],
        books: [
          {
            title: "Leaders Eat Last (free summary)",
            author: "Simon Sinek",
            url: "https://read.amazon.com/kp/embed?asin=B00DGZKQM8&preview=newtab&linkCode=kpe&ref_=cm_sw_r_kb_dp_19KFEG958MZ5MRQVWDFR",
          },
          {
            title: "Guide to Executive Communication",
            author: "Harvard ManageMentor",
            url: "https://hbr.org/2013/06/how-to-communicate-with-seniors",
          },
        ],
        path: [
          { title: "Phase 1: Story Bank", detail: "Write STAR stories for impact, conflict, and learning." },
          { title: "Phase 2: Delivery Rehearsal", detail: "Record practice sessions, collect feedback, and refine." },
          { title: "Phase 3: Executive Simulation", detail: "Run mock stakeholder updates and negotiation scenarios." },
        ],
      },
      {
        id: "track-offer-negotiation",
        name: "Offer Negotiation & Career Strategy",
        headline: "Evaluate opportunities, negotiate compensation, and architect career bets.",
        description:
          "Analyze offers, benchmark market data, and create scripts for collaborative negotiations.",
        tags: ["Negotiation", "Compensation", "Career Design"],
        videos: [
          {
            title: "Salary Negotiation Masterclass",
            url: "https://www.youtube.com/watch?v=7Wb0HQZJ2GE",
            duration: "47m",
          },
          {
            title: "Career Vision Workshop",
            url: "https://www.youtube.com/watch?v=z6_hQ6VfDdE",
            duration: "58m",
          },
        ],
        courses: [
          {
            title: "Fearless Salary Negotiation",
            provider: "Josh Doody",
            url: "https://fearlesssalarynegotiation.com/",
            summary: "Email templates, decision frameworks, and negotiation scripts.",
          },
          {
            title: "Career Capital Framework",
            provider: "Farnam Street",
            url: "https://fs.blog/career-capital/",
            summary: "Strategic planning exercises to align career bets with personal leverage.",
          },
        ],
        books: [
          {
            title: "Never Split the Difference (summary)",
            author: "Chris Voss",
            url: "https://www.scribd.com/book/314505954/Never-Split-the-Difference-Negotiating-As-If-Your-Life-Depended-On-It",
          },
          {
            title: "Designing Your Life Workbook",
            author: "Stanford d.school",
            url: "https://dschool.stanford.edu/resources/designing-your-life-activity-guide",
          },
        ],
        path: [
          { title: "Stage 1: Market Benchmarking", detail: "Collect compensation data and define walk-away ranges." },
          { title: "Stage 2: Scenario Planning", detail: "Draft scripts for best-case, target, and fallback scenarios." },
          { title: "Stage 3: Decision Journal", detail: "Evaluate offers against career narrative and write post-mortems." },
        ],
      },
    ],
  },
  {
    id: "domain-business",
    name: "Business & Management",
    summary: "Accelerate leadership, operations, and strategy skills for modern organizations.",
    icon: Briefcase,
    gradient: "from-amber-400 via-orange-500 to-rose-500",
    metrics: {
      tracks: 7,
      hours: "110+ hrs",
      resources: 28,
    },
    tracks: [
      {
        id: "track-digital-marketing-growth",
        name: "Digital Marketing Growth",
        headline: "Master campaigns, funnels, and performance storytelling.",
        description:
          "Pair live workshops with strategy explainers to design data-driven campaigns that convert and retain customers.",
        tags: ["Marketing", "Growth"],
        videos: [
          {
            title: "Digital Marketing Explained in 5 Minutes",
            url: "https://www.youtube.com/watch?v=nJ_kfWgskqI",
            duration: "5m",
          },
          {
            title: "Digital Marketing Live Class",
            url: "https://www.youtube.com/live/nkNHn0VqVBA?si=kaVhVzjt-X4Fgqb9",
            duration: "~2h",
          },
          {
            title: "Digital Marketing Strategy 2025",
            url: "https://youtu.be/bCoL1bKSYSo?si=AZ47fPvShXgDsCzN",
            duration: "~1h 30m",
          },
          {
            title: "Marketing Career Roadmap",
            url: "https://youtu.be/QusJ4fpWQwA?si=gcRArESqb6VJsir2",
            duration: "~35m",
          },
          {
            title: "Growth Marketing Playlist",
            url: "https://www.youtube.com/watch?v=nJ_kfWgskqI&list=RDnJ_kfWgskqI",
            duration: "Auto-generated mix",
          },
        ],
        courses: [
          {
            title: "Google Digital Garage: Fundamentals of Digital Marketing",
            provider: "Google",
            url: "https://learndigital.withgoogle.com/digitalgarage/course/digital-marketing",
            summary: "Certification program with bite-sized lessons and practical exercises across core channels.",
          },
          {
            title: "Meta Blueprint Discovery Journey",
            provider: "Meta",
            url: "https://www.facebook.com/business/learn/certification",
            summary: "Interactive labs practicing campaign setup, optimization, and measurement inside Meta Ads Manager.",
          },
        ],
        books: [
          {
            title: "HubSpot Inbound Marketing Workbook",
            author: "HubSpot",
            url: "https://offers.hubspot.com/inbound-marketing-workbook",
          },
          {
            title: "Think with Google Measurement Playbook",
            author: "Google",
            url: "https://www.thinkwithgoogle.com/marketing-strategies/data-and-measurement/measurement-playbook/",
          },
        ],
        path: [
          {
            title: "Sprint 1: Audience Research",
            detail: "Map personas, messaging, and channel selection for upcoming campaigns.",
          },
          {
            title: "Sprint 2: Campaign Execution",
            detail: "Launch experiments across paid, owned, and earned media while tracking KPIs.",
          },
          {
            title: "Sprint 3: Reporting & Iteration",
            detail: "Build dashboards, present insights, and iterate on creative and budget allocation.",
          },
          {
            title: "Sprint 4: Portfolio Case Study",
            detail: "Package metrics, creative samples, and lessons learned into a campaign retro deck.",
          },
        ],
      },
      {
        id: "track-finance-accounting",
        name: "Finance & Accounting Fundamentals",
        headline: "Decode financial statements, budgeting, and compliance expectations.",
        description:
          "Strengthen fluency in accounting principles and finance analysis through playlists and hands-on walk-throughs.",
        tags: ["Finance", "Accounting"],
        videos: [
          {
            title: "Finance Career Roadmap",
            url: "https://youtu.be/4cRho7Dvnao?si=2aPRGga60kp9xDBR",
            duration: "~40m",
          },
          {
            title: "Accounting Basics Intensive",
            url: "https://youtu.be/AkMTxMN7res?si=8NRZmbgEL-HU6w6Z",
            duration: "~1h",
          },
          {
            title: "Finance & Accounting Playlist (Part 1)",
            url: "https://youtube.com/playlist?list=PLcRqJFBzcNZWNLjpu_iXI7MnzdoAQQ1yL&si=q7egeVjA79OUTtvH",
            duration: "~6h",
          },
          {
            title: "Finance & Accounting Playlist (Part 2)",
            url: "https://youtube.com/playlist?list=PLcRqJFBzcNZWNLjpu_iXI7MnzdoAQQ1yL&si=xl4wmzVS2ioMd4B-",
            duration: "~6h",
          },
        ],
        courses: [
          {
            title: "Coursera: Introduction to Finance and Accounting",
            provider: "University of Pennsylvania",
            url: "https://www.coursera.org/specializations/wharton-accounting",
            summary: "Foundational specialization covering financial accounting, managerial accounting, and corporate finance.",
          },
          {
            title: "edX: Financial Accounting",
            provider: "Harvard Business School Online",
            url: "https://online.hbs.edu/courses/financial-accounting/",
            summary: "Interactive cases that reinforce financial statements, ratio analysis, and executive decision making.",
          },
        ],
        books: [
          {
            title: "PwC Accounting Guides",
            author: "PwC",
            url: "https://viewpoint.pwc.com/dt/us/en/pwc/accounting_guides.html",
          },
          {
            title: "CFA Institute Financial Reporting Toolkit",
            author: "CFA Institute",
            url: "https://www.cfainstitute.org/en/research/foundation/2018/financial-reporting-and-analysis",
          },
        ],
        path: [
          {
            title: "Cycle 1: Fundamentals",
            detail: "Refresh GAAP/IFRS concepts and financial statement linkages.",
          },
          {
            title: "Cycle 2: Analysis",
            detail: "Complete ratio analysis and build a basic financial model from the playlists.",
          },
          {
            title: "Cycle 3: Compliance & Reporting",
            detail: "Document close processes, audit prep, and stakeholder communication.",
          },
          {
            title: "Cycle 4: Capital Markets Lab",
            detail: "Model a valuation scenario, stress-test assumptions, and present investment memos.",
          },
        ],
      },
      {
        id: "track-human-resources",
        name: "Human Resources Leadership",
        headline: "Design people programs, talent strategy, and employee experience.",
        description:
          "Blend career walkthroughs with structured playlists covering hiring, development, and organizational health.",
        tags: ["People Ops", "HR"],
        videos: [
          {
            title: "What Is Human Resources?",
            url: "https://www.youtube.com/watch?v=O7q2YEOlJaw",
            duration: "6m",
          },
          {
            title: "HR Career Roadmap",
            url: "https://youtu.be/8ciAnHfIiFA?si=eT_B0GO_fAlv23-H",
            duration: "~35m",
          },
          {
            title: "Human Resources Masterclass Playlist",
            url: "https://youtube.com/playlist?list=PL9Cd7H8NFRQyHThG3ol8UEt4UD8Gyclo-&si=iZcTRo2vUDzweJM-",
            duration: "~5h",
          },
          {
            title: "People Operations Playlist",
            url: "https://www.youtube.com/watch?v=O7q2YEOlJaw&list=RDO7q2YEOlJaw",
            duration: "Auto-generated mix",
          },
        ],
        courses: [
          {
            title: "Coursera: People Analytics",
            provider: "University of Pennsylvania",
            url: "https://www.coursera.org/learn/wharton-people-analytics",
            summary: "Applies data storytelling, experimentation, and decision frameworks to HR problems.",
          },
          {
            title: "eCornell: Strategic Human Resources Leadership",
            provider: "Cornell University",
            url: "https://ecornell.cornell.edu/certificates/human-resources/strategic-human-resources-leadership/",
            summary: "Capstone-focused certificate covering workforce planning, change management, and HR metrics.",
          },
        ],
        books: [
          {
            title: "SHRM Body of Applied Skills and Knowledge",
            author: "SHRM",
            url: "https://www.shrm.org/certification/educators/Documents/SHRM%20BASK.pdf",
          },
          {
            title: "Culture Amp Employee Experience Guide",
            author: "Culture Amp",
            url: "https://www.cultureamp.com/resources/guides",
          },
        ],
        path: [
          {
            title: "Phase 1: Talent Foundations",
            detail: "Document hiring processes, onboarding flows, and compliance needs.",
          },
          {
            title: "Phase 2: Development Programs",
            detail: "Design performance, learning, and feedback rituals supporting growth.",
          },
          {
            title: "Phase 3: Culture & Analytics",
            detail: "Track engagement metrics and craft executive-ready people reports.",
          },
          {
            title: "Phase 4: Strategic Initiative",
            detail: "Design an HR program roadmap with budget, KPIs, and stakeholder alignment notes.",
          },
        ],
      },
      {
        id: "track-entrepreneurship",
        name: "Entrepreneurship & Startups",
        headline: "Validate ideas, raise capital, and scale resilient ventures.",
        description:
          "Hear founders unpack their journeys and tactics for building, launching, and iterating on products.",
        tags: ["Startups", "Innovation"],
        videos: [
          {
            title: "Startup Playbook Introduction",
            url: "https://www.youtube.com/watch?v=V5ZXGM5Geig",
            duration: "12m",
          },
          {
            title: "Entrepreneurship Mindset Workshop",
            url: "https://youtu.be/UEngvxZ11sw?si=xQZDUFEp4NJr6dnO",
            duration: "~1h 20m",
          },
          {
            title: "Founder Lessons Live",
            url: "https://youtu.be/MN7yfV4UuCI?si=eBjtNhKDmNYlu-iS",
            duration: "~1h 10m",
          },
          {
            title: "Entrepreneurship Career Roadmap",
            url: "https://youtu.be/Xcsp0486olY?si=3Mi7w_xNf-7Hr0fL",
            duration: "~35m",
          },
          {
            title: "Startup Strategy Playlist",
            url: "https://www.youtube.com/watch?v=V5ZXGM5Geig&list=RDV5ZXGM5Geig",
            duration: "Auto-generated mix",
          },
        ],
        courses: [
          {
            title: "Y Combinator Startup School",
            provider: "Y Combinator",
            url: "https://www.startupschool.org/",
            summary: "Self-paced founder curriculum with weekly tactics on idea validation, metrics, and fundraising.",
          },
          {
            title: "Coursera: Entrepreneurship Specialization",
            provider: "University of Maryland",
            url: "https://www.coursera.org/specializations/entrepreneurship",
            summary: "Structured modules covering opportunity analysis, business models, and startup financing.",
          },
        ],
        books: [
          {
            title: "The Startup Owner's Manual",
            author: "Steve Blank & Bob Dorf",
            url: "https://www.steveblank.com/category/startup-owners-manual/",
          },
          {
            title: "Zero to One Notes",
            author: "Peter Thiel with Blake Masters",
            url: "https://blakemasters.tumblr.com/peter-thiels-cs183-startup",
          },
        ],
        path: [
          {
            title: "Stage 1: Problem Discovery",
            detail: "Conduct customer interviews and craft a value proposition canvas.",
          },
          {
            title: "Stage 2: MVP & Launch",
            detail: "Prototype solutions, run experiments, and track early metrics.",
          },
          {
            title: "Stage 3: Scale Systems",
            detail: "Plan fundraising, hiring, and operating cadence for growth.",
          },
          {
            title: "Stage 4: Investor Readiness",
            detail: "Polish pitch assets, create a diligence data room, and rehearse negotiation scenarios.",
          },
        ],
      },
      {
        id: "track-operations-supply-chain",
        name: "Operations & Supply Chain",
        headline: "Optimize delivery, logistics, and operational excellence.",
        description:
          "Learn continuous improvement, procurement, and logistics tactics from industry walkthroughs and playlists.",
        tags: ["Operations", "Supply Chain"],
        videos: [
          {
            title: "Operations Management Explained",
            url: "https://www.youtube.com/watch?v=X6Bdqr1rA5s",
            duration: "10m",
          },
          {
            title: "Operations Management Crash Course",
            url: "https://youtu.be/Tb2zZ8AKftY?si=A04Ju3lzJcI7mcUn",
            duration: "~45m",
          },
          {
            title: "Supply Chain Fundamentals",
            url: "https://youtu.be/P0fzKhMNS64?si=I6Camb5Lh7G4DG-X",
            duration: "~50m",
          },
          {
            title: "Operations & SCM Playlist",
            url: "https://youtube.com/playlist?list=PL5_qO7P2XjBd86Pw0SQVTaA88nHTj1I3e&si=ecNDCCxFIOOBbFii",
            duration: "~6h",
          },
          {
            title: "Supply Chain Strategy Mix",
            url: "https://www.youtube.com/watch?v=X6Bdqr1rA5s&list=RDX6Bdqr1rA5s",
            duration: "Auto-generated mix",
          },
        ],
        courses: [
          {
            title: "MITx MicroMasters: Supply Chain Management",
            provider: "edX",
            url: "https://micromasters.mit.edu/scm/",
            summary: "Graduate-level sequence on demand planning, logistics, analytics, and supply chain design.",
          },
          {
            title: "Coursera: Operations Management",
            provider: "University of Illinois",
            url: "https://www.coursera.org/learn/operations-management-uva",
            summary: "Covers process analysis, capacity planning, and lean improvement tools with applied assignments.",
          },
        ],
        books: [
          {
            title: "The Goal Summary",
            author: "Eliyahu Goldratt",
            url: "https://www.leanproduction.com/the-goal-summary.html",
          },
          {
            title: "ASCM Supply Chain Learning Center",
            author: "APICS/ASCM",
            url: "https://www.ascm.org/learning-development/learning/",
          },
        ],
        path: [
          {
            title: "Module 1: Process Mapping",
            detail: "Document current-state processes and identify bottlenecks.",
          },
          {
            title: "Module 2: Optimization",
            detail: "Apply lean tools and automation ideas sourced from the playlists.",
          },
          {
            title: "Module 3: Risk & Resilience",
            detail: "Design contingency plans, supplier scorecards, and KPI dashboards.",
          },
          {
            title: "Module 4: Continuous Improvement",
            detail: "Launch Kaizen experiments, track benefits, and standardize updated workflows.",
          },
        ],
      },
      {
        id: "track-business-analytics",
        name: "Business Analytics Lab",
        headline: "Turn business questions into data-backed recommendations.",
        description:
          "Combine analytics explainers with live sessions to practice modeling outcomes and presenting insights.",
        tags: ["Analytics", "Strategy"],
        videos: [
          {
            title: "Business Analytics Explained",
            url: "https://www.youtube.com/watch?v=F08S1-S8bKo",
            duration: "9m",
          },
          {
            title: "Business Analytics Career Roadmap",
            url: "https://youtu.be/9fFQA-JOXA0?si=H1sgDmeET7yixlwO",
            duration: "~40m",
          },
          {
            title: "Business Analytics Live Session",
            url: "https://www.youtube.com/live/2jYPh3ulwmc?si=Jlldej2IGOH86pG6",
            duration: "~2h",
          },
          {
            title: "Analytics Toolkit Playlist",
            url: "https://www.youtube.com/watch?v=F08S1-S8bKo&list=RDF08S1-S8bKo",
            duration: "Auto-generated mix",
          },
        ],
        courses: [
          {
            title: "Coursera: Business Analytics Specialization",
            provider: "University of Pennsylvania",
            url: "https://www.coursera.org/specializations/wharton-business-analytics",
            summary: "Wharton-led sequence on descriptive, predictive, and prescriptive analytics for business decisions.",
          },
          {
            title: "Udacity: Business Analytics Nanodegree",
            provider: "Udacity",
            url: "https://www.udacity.com/course/business-analytics-nanodegree--nd098",
            summary: "Hands-on projects covering SQL, data visualization, and experiment design for analysts.",
          },
        ],
        books: [
          {
            title: "HBR Guide to Data Analytics Basics",
            author: "Harvard Business Review",
            url: "https://hbr.org/2022/03/a-refresher-on-regression-analysis",
          },
          {
            title: "Storytelling with Data Resources",
            author: "Cole Nussbaumer Knaflic",
            url: "https://www.storytellingwithdata.com/resources",
          },
        ],
        path: [
          {
            title: "Step 1: Data Audit",
            detail: "Inventory available data sources and outline governance needs.",
          },
          {
            title: "Step 2: Model Insights",
            detail: "Recreate cohort, funnel, or forecasting models showcased in the sessions.",
          },
          {
            title: "Step 3: Executive Story",
            detail: "Build decks or dashboards translating insights into strategic actions.",
          },
          {
            title: "Step 4: Operationalize",
            detail: "Automate refresh pipelines, document assumptions, and set adoption metrics.",
          },
        ],
      },
      {
        id: "track-ecommerce-strategy",
        name: "E-commerce Strategy",
        headline: "Launch and optimize online commerce experiences.",
        description:
          "Use career walkthroughs and tactical breakdowns to design storefronts, funnels, and growth loops for digital commerce.",
        tags: ["E-commerce", "Product"],
        videos: [
          {
            title: "E-commerce 101 Overview",
            url: "https://www.youtube.com/watch?v=QFcSgz9dH3w",
            duration: "14m",
          },
          {
            title: "E-commerce Career Path",
            url: "https://youtu.be/-ZAznOtqaiY",
            duration: "~30m",
          },
          {
            title: "Shopify Growth Workshop",
            url: "https://www.youtube.com/watch?v=W6fyU5QwU_s",
            duration: "~1h 10m",
          },
          {
            title: "E-commerce Optimization Playlist",
            url: "https://www.youtube.com/watch?v=QFcSgz9dH3w&list=RDQFcSgz9dH3w",
            duration: "Auto-generated mix",
          },
        ],
        courses: [
          {
            title: "Shopify Compass: Build a Business",
            provider: "Shopify",
            url: "https://www.shopify.com/learn/series/build-a-business",
            summary: "Video-led curriculum covering store setup, marketing, and fulfillment operations.",
          },
          {
            title: "Coursera: Google Digital Marketing & E-commerce",
            provider: "Google",
            url: "https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce",
            summary: "Professional certificate focusing on acquisition funnels, merchandising, and analytics dashboards.",
          },
        ],
        books: [
          {
            title: "Baymard Institute UX Research",
            author: "Baymard Institute",
            url: "https://baymard.com/research",
          },
          {
            title: "E-commerce Case Studies",
            author: "Think with Google",
            url: "https://www.thinkwithgoogle.com/intl/en-apac/marketing-strategies/search/sephora-boosts-online-conversion-using-local-inventory-ads/",
          },
        ],
        path: [
          {
            title: "Phase 1: Store Foundations",
            detail: "Audit product-market fit, catalog structure, and platform options.",
          },
          {
            title: "Phase 2: Conversion Levers",
            detail: "Experiment with pricing, merchandising, and content to raise conversion rates.",
          },
          {
            title: "Phase 3: Retention & Scale",
            detail: "Implement retention programs and logistics workflows that support growth.",
          },
          {
            title: "Phase 4: Omni-channel Planning",
            detail: "Integrate marketplace, retail, and logistics partners with unified analytics tracking.",
          },
        ],
      },
    ],
  },
];

export const learningStats = [
  { value: "240+", label: "Total Playlists", color: "text-purple-600" },
  { value: "18", label: "Career Domains", color: "text-blue-600" },
  { value: "640+", label: "Curated Videos", color: "text-emerald-600" },
  { value: "150+", label: "Reading Assets", color: "text-rose-600" },
];

export const howItWorks = [
  {
    step: "Choose Domain",
    description: "Explore multi-disciplinary domains and pick the path that matches your next milestone.",
    icon: Compass,
  },
  {
    step: "Follow Guided Path",
    description: "Work through playlists that knit together videos, courses, books, and practice briefs.",
    icon: ListChecks,
  },
  {
    step: "Add to Goals",
  description: "Track progress inside Career Vision goals so every lesson ladders into career outcomes.",
    icon: Trophy,
  },
];