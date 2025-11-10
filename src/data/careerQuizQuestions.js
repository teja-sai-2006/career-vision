export const careerQuizQuestions = [
  {
    id: "q1",
    prompt: "Which type of project excites you the most?",
    topic: "interests",
    options: [
      {
        id: "q1-option-technology",
        label: "Building an app that simplifies a manual process",
        dimensions: { technology: 3, operations: 1 },
      },
      {
        id: "q1-option-data",
        label: "Analyzing data to spot hidden trends",
        dimensions: { data: 3, science: 1 },
      },
      {
        id: "q1-option-design",
        label: "Designing an intuitive interface people love to use",
        dimensions: { design: 3, creative: 1 },
      },
      {
        id: "q1-option-social",
        label: "Organizing a community initiative with measurable impact",
        dimensions: { social: 3, business: 1 },
      },
    ],
  },
  {
    id: "q2",
    prompt: "When faced with a complex challenge, what is your first instinct?",
    topic: "problem_solving",
    options: [
      {
        id: "q2-option-technology",
        label: "Prototype a technical solution and iterate quickly",
        dimensions: { technology: 3 },
      },
      {
        id: "q2-option-data",
        label: "Collect evidence and run analyses before deciding",
        dimensions: { data: 3 },
      },
      {
        id: "q2-option-business",
        label: "Evaluate the business impact and stakeholder priorities",
        dimensions: { business: 3 },
      },
      {
        id: "q2-option-creative",
        label: "Brainstorm unconventional ideas to reframe the issue",
        dimensions: { creative: 3 },
      },
    ],
  },
  {
    id: "q3",
    prompt: "Which work environment sounds most energizing?",
    topic: "environment",
    options: [
      {
        id: "q3-option-operations",
        label: "A fast-moving operations floor where efficiency matters",
        dimensions: { operations: 3, business: 1 },
      },
      {
        id: "q3-option-creative",
        label: "A studio where teams experiment with visual storytelling",
        dimensions: { creative: 3, design: 1 },
      },
      {
        id: "q3-option-healthcare",
        label: "A clinical setting where you collaborate to improve patient care",
        dimensions: { healthcare: 3, social: 1 },
      },
      {
        id: "q3-option-technology",
        label: "A product lab inventing new digital experiences",
        dimensions: { technology: 3, design: 1 },
      },
    ],
  },
  {
    id: "q4",
    prompt: "How do you prefer your contributions to be measured?",
    topic: "motivation",
    options: [
      {
        id: "q4-option-business",
        label: "Revenue growth, customer acquisition, or ROI",
        dimensions: { business: 3, operations: 1 },
      },
      {
        id: "q4-option-data",
        label: "Improved metrics backed by data and experimentation",
        dimensions: { data: 3, technology: 1 },
      },
      {
        id: "q4-option-social",
        label: "Lives impacted, satisfaction scores, or community outcomes",
        dimensions: { social: 3, healthcare: 1 },
      },
      {
        id: "q4-option-design",
        label: "Usability feedback, adoption, and delight",
        dimensions: { design: 3, creative: 1 },
      },
    ],
  },
  {
    id: "q5",
    prompt: "Pick the statement that resonates with you most.",
    topic: "values",
    options: [
      {
        id: "q5-option-social",
        label: "I want my work to directly help people solve personal challenges.",
        dimensions: { social: 3, healthcare: 1 },
      },
      {
        id: "q5-option-science",
        label: "I am driven by curiosity and discovering how things work.",
        dimensions: { science: 3, data: 1 },
      },
      {
        id: "q5-option-technology",
        label: "I love turning abstract ideas into working systems.",
        dimensions: { technology: 3, operations: 1 },
      },
      {
        id: "q5-option-design",
        label: "I thrive when I can craft experiences that feel seamless and beautiful.",
        dimensions: { design: 3, creative: 1 },
      },
    ],
  },
  {
    id: "q6",
    prompt: "What role do you naturally take on during group projects?",
    topic: "teamwork",
    options: [
      {
        id: "q6-option-operations",
        label: "Coordinator who keeps everything on schedule",
        dimensions: { operations: 3, business: 1 },
      },
      {
        id: "q6-option-technology",
        label: "Technical lead who builds core functionality",
        dimensions: { technology: 3 },
      },
      {
        id: "q6-option-design",
        label: "Experience designer who ensures the solution feels right",
        dimensions: { design: 3, creative: 1 },
      },
      {
        id: "q6-option-social",
        label: "Facilitator who aligns people and keeps energy high",
        dimensions: { social: 3, business: 1 },
      },
    ],
  },
  {
    id: "q7",
    prompt: "Which statement best matches your comfort with numbers?",
    topic: "skills",
    options: [
      {
        id: "q7-option-data",
        label: "I enjoy building models, dashboards, or statistical analyses.",
        dimensions: { data: 3, science: 1 },
      },
      {
        id: "q7-option-business",
        label: "I like interpreting numbers to guide decisions but not necessarily building models.",
        dimensions: { business: 3 },
      },
      {
        id: "q7-option-creative",
        label: "I prefer qualitative inputs and stories over spreadsheets.",
        dimensions: { creative: 3, design: 1 },
      },
      {
        id: "q7-option-technology",
        label: "I use numbers to validate technical performance and reliability.",
        dimensions: { technology: 3, operations: 1 },
      },
    ],
  },
  {
    id: "q8",
    prompt: "How do you feel about continuous learning and certification?",
    topic: "development",
    options: [
      {
        id: "q8-option-healthcare",
        label: "I welcome rigorous standards and clinical certifications.",
        dimensions: { healthcare: 3, science: 1 },
      },
      {
        id: "q8-option-technology",
        label: "I constantly explore new frameworks, APIs, and tooling.",
        dimensions: { technology: 3, data: 1 },
      },
      {
        id: "q8-option-business",
        label: "I pursue leadership, strategy, or MBA-style development.",
        dimensions: { business: 3, operations: 1 },
      },
      {
        id: "q8-option-creative",
        label: "I build portfolios and refine craft through workshops and critiques.",
        dimensions: { creative: 3, design: 1 },
      },
    ],
  },
  {
    id: "q9",
    prompt: "What energizes you more?",
    topic: "energy",
    options: [
      {
        id: "q9-option-social",
        label: "Helping individuals through one-on-one support.",
        dimensions: { social: 3, healthcare: 1 },
      },
      {
        id: "q9-option-technology",
        label: "Solving technical puzzles late into the night.",
        dimensions: { technology: 3 },
      },
      {
        id: "q9-option-business",
        label: "Winning a tough negotiation or closing a deal.",
        dimensions: { business: 3 },
      },
      {
        id: "q9-option-creative",
        label: "Seeing people light up at something you created.",
        dimensions: { creative: 3, design: 1 },
      },
    ],
  },
  {
    id: "q10",
    prompt: "You are asked to launch a new initiative with limited data. What is your approach?",
    topic: "decision_making",
    options: [
      {
        id: "q10-option-data",
        label: "Run quick experiments to gather evidence before scaling.",
        dimensions: { data: 3, technology: 1 },
      },
      {
        id: "q10-option-business",
        label: "Define a lean business case and pitch stakeholders.",
        dimensions: { business: 3, operations: 1 },
      },
      {
        id: "q10-option-creative",
        label: "Create prototypes to get qualitative reactions fast.",
        dimensions: { creative: 3, design: 1 },
      },
      {
        id: "q10-option-social",
        label: "Engage the community to co-create the solution with you.",
        dimensions: { social: 3, healthcare: 1 },
      },
    ],
  },
  {
    id: "q11",
    prompt: "Pick the scenario you would enjoy most.",
    topic: "scenario",
    options: [
      {
        id: "q11-option-technology",
        label: "Refactoring a codebase to improve performance and reliability.",
        dimensions: { technology: 3 },
      },
      {
        id: "q11-option-data",
        label: "Cleaning and merging datasets to answer a pressing question.",
        dimensions: { data: 3 },
      },
      {
        id: "q11-option-design",
        label: "Crafting the visuals for a high-stakes product launch.",
        dimensions: { design: 3, creative: 1 },
      },
      {
        id: "q11-option-operations",
        label: "Setting up systems that keep global teams aligned and productive.",
        dimensions: { operations: 3, business: 1 },
      },
    ],
  },
  {
    id: "q12",
    prompt: "How do you like to collaborate?",
    topic: "collaboration",
    options: [
      {
        id: "q12-option-social",
        label: "Facilitating workshops and keeping people motivated.",
        dimensions: { social: 3, business: 1 },
      },
      {
        id: "q12-option-technology",
        label: "Pairing on technical problems until it clicks.",
        dimensions: { technology: 3 },
      },
      {
        id: "q12-option-design",
        label: "Gathering feedback to refine prototypes together.",
        dimensions: { design: 3, creative: 1 },
      },
      {
        id: "q12-option-data",
        label: "Aligning on metrics and success criteria from day one.",
        dimensions: { data: 3, business: 1 },
      },
    ],
  },
  {
    id: "q13",
    prompt: "What kind of impact feels most satisfying?",
    topic: "impact",
    options: [
      {
        id: "q13-option-healthcare",
        label: "Knowing patients or clients are safer and healthier.",
        dimensions: { healthcare: 3, social: 1 },
      },
      {
        id: "q13-option-science",
        label: "Advancing knowledge that others can build upon.",
        dimensions: { science: 3, data: 1 },
      },
      {
        id: "q13-option-business",
        label: "Seeing a business line grow because of your strategy.",
        dimensions: { business: 3 },
      },
      {
        id: "q13-option-design",
        label: "Hearing that people love and rely on the experiences you crafted.",
        dimensions: { design: 3, creative: 1 },
      },
    ],
  },
  {
    id: "q14",
    prompt: "Which task would you pick for a hackathon weekend?",
    topic: "hackathon",
    options: [
      {
        id: "q14-option-technology",
        label: "Ship a working prototype with clean code.",
        dimensions: { technology: 3 },
      },
      {
        id: "q14-option-data",
        label: "Crunch open datasets to prove an insight.",
        dimensions: { data: 3 },
      },
      {
        id: "q14-option-design",
        label: "Produce a polished pitch deck with compelling visuals.",
        dimensions: { design: 3, creative: 1 },
      },
      {
        id: "q14-option-operations",
        label: "Coordinate the team, timeline, and final demo strategy.",
        dimensions: { operations: 3, business: 1 },
      },
    ],
  },
  {
    id: "q15",
    prompt: "How do you feel about ambiguity?",
    topic: "ambiguity",
    options: [
      {
        id: "q15-option-creative",
        label: "I enjoy shaping the direction when there is no clear path yet.",
        dimensions: { creative: 3, design: 1 },
      },
      {
        id: "q15-option-operations",
        label: "I build structure and clarity so others can move forward.",
        dimensions: { operations: 3, business: 1 },
      },
      {
        id: "q15-option-technology",
        label: "I map out technical spikes to reduce unknowns systematically.",
        dimensions: { technology: 3, data: 1 },
      },
      {
        id: "q15-option-social",
        label: "I align stakeholders and reframe goals to keep focus.",
        dimensions: { social: 3, business: 1 },
      },
    ],
  },
  {
    id: "q16",
    prompt: "Pick the description that fits you best.",
    topic: "self_perception",
    options: [
      {
        id: "q16-option-technology",
        label: "I am a builder who loves shipping working solutions.",
        dimensions: { technology: 3 },
      },
      {
        id: "q16-option-data",
        label: "I am an investigator who relies on evidence and logic.",
        dimensions: { data: 3 },
      },
      {
        id: "q16-option-design",
        label: "I am a storyteller who connects emotionally with audiences.",
        dimensions: { design: 3, creative: 1 },
      },
      {
        id: "q16-option-social",
        label: "I am a coach who empowers others to succeed.",
        dimensions: { social: 3, healthcare: 1 },
      },
    ],
  },
  {
    id: "q17",
    prompt: "What do you read/watch the most in your free time?",
    topic: "media",
    options: [
      {
        id: "q17-option-technology",
        label: "Engineering blogs, build logs, or teardown videos.",
        dimensions: { technology: 3, operations: 1 },
      },
      {
        id: "q17-option-data",
        label: "Analytics case studies and science explainers.",
        dimensions: { data: 3, science: 1 },
      },
      {
        id: "q17-option-creative",
        label: "Design critiques, creative breakdowns, or art documentaries.",
        dimensions: { creative: 3, design: 1 },
      },
      {
        id: "q17-option-business",
        label: "Startup stories, negotiation tactics, or leadership lessons.",
        dimensions: { business: 3 },
      },
    ],
  },
  {
    id: "q18",
    prompt: "How do you prefer to prototype an idea?",
    topic: "prototyping",
    options: [
      {
        id: "q18-option-technology",
        label: "Code a minimum viable product quickly.",
        dimensions: { technology: 3 },
      },
      {
        id: "q18-option-design",
        label: "Create visual mockups and gather user reactions.",
        dimensions: { design: 3, creative: 1 },
      },
      {
        id: "q18-option-data",
        label: "Build a spreadsheet or model to see the numbers.",
        dimensions: { data: 3, business: 1 },
      },
      {
        id: "q18-option-social",
        label: "Run a workshop to co-create the idea with stakeholders.",
        dimensions: { social: 3 },
      },
    ],
  },
  {
    id: "q19",
    prompt: "Choose the metric you most want to improve.",
    topic: "metrics",
    options: [
      {
        id: "q19-option-technology",
        label: "System uptime, latency, or technical performance.",
        dimensions: { technology: 3, operations: 1 },
      },
      {
        id: "q19-option-business",
        label: "Customer lifetime value or profit margin.",
        dimensions: { business: 3 },
      },
      {
        id: "q19-option-design",
        label: "User satisfaction and task success rates.",
        dimensions: { design: 3, creative: 1 },
      },
      {
        id: "q19-option-social",
        label: "Retention in a community or program completion rates.",
        dimensions: { social: 3, healthcare: 1 },
      },
    ],
  },
  {
    id: "q20",
    prompt: "Which workshop would you sign up for?",
    topic: "learning",
    options: [
      {
        id: "q20-option-technology",
        label: "Full-stack development bootcamp.",
        dimensions: { technology: 3 },
      },
      {
        id: "q20-option-data",
        label: "Advanced analytics and machine learning lab.",
        dimensions: { data: 3, science: 1 },
      },
      {
        id: "q20-option-design",
        label: "Design systems and UI storytelling masterclass.",
        dimensions: { design: 3, creative: 1 },
      },
      {
        id: "q20-option-social",
        label: "Facilitation and coaching intensive.",
        dimensions: { social: 3, business: 1 },
      },
    ],
  },
  {
    id: "q21",
    prompt: "How do you make decisions when stakes are high?",
    topic: "decision_style",
    options: [
      {
        id: "q21-option-data",
        label: "Trust the data even if intuition disagrees.",
        dimensions: { data: 3 },
      },
      {
        id: "q21-option-business",
        label: "Align with the business vision and risk appetite.",
        dimensions: { business: 3 },
      },
      {
        id: "q21-option-social",
        label: "Consider how people will experience the change.",
        dimensions: { social: 3, design: 1 },
      },
      {
        id: "q21-option-technology",
        label: "Validate assumptions with technical experiments.",
        dimensions: { technology: 3, data: 1 },
      },
    ],
  },
  {
    id: "q22",
    prompt: "Pick the headline that would make you proud.",
    topic: "headline",
    options: [
      {
        id: "q22-option-technology",
        label: "Engineer launches platform used by millions daily.",
        dimensions: { technology: 3 },
      },
      {
        id: "q22-option-data",
        label: "Analyst uncovers insights that transformed strategy.",
        dimensions: { data: 3 },
      },
      {
        id: "q22-option-healthcare",
        label: "Healthcare innovator improves access for underserved communities.",
        dimensions: { healthcare: 3, social: 1 },
      },
      {
        id: "q22-option-design",
        label: "Designer wins award for human-centered breakthrough.",
        dimensions: { design: 3, creative: 1 },
      },
    ],
  },
  {
    id: "q23",
    prompt: "When learning something new, you tend to...",
    topic: "learning_style",
    options: [
      {
        id: "q23-option-technology",
        label: "Build side projects to test concepts immediately.",
        dimensions: { technology: 3 },
      },
      {
        id: "q23-option-data",
        label: "Study theory deeply before applying it.",
        dimensions: { data: 3, science: 1 },
      },
      {
        id: "q23-option-design",
        label: "Collect references and mood boards for inspiration.",
        dimensions: { design: 3, creative: 1 },
      },
      {
        id: "q23-option-social",
        label: "Learn best with peers where you can discuss and teach.",
        dimensions: { social: 3 },
      },
    ],
  },
  {
    id: "q24",
    prompt: "How much do you value structure versus flexibility?",
    topic: "structure",
    options: [
      {
        id: "q24-option-operations",
        label: "I thrive with clear processes and checklists.",
        dimensions: { operations: 3, business: 1 },
      },
      {
        id: "q24-option-technology",
        label: "I like loose structure with freedom to experiment.",
        dimensions: { technology: 3, creative: 1 },
      },
      {
        id: "q24-option-data",
        label: "I need documented assumptions and review cycles.",
        dimensions: { data: 3 },
      },
      {
        id: "q24-option-social",
        label: "I adapt structure based on people's needs in the moment.",
        dimensions: { social: 3 },
      },
    ],
  },
  {
    id: "q25",
    prompt: "Which challenge would you be excited to tackle?",
    topic: "challenge",
    options: [
      {
        id: "q25-option-technology",
        label: "Scaling an application to handle 10x users.",
        dimensions: { technology: 3, operations: 1 },
      },
      {
        id: "q25-option-social",
        label: "Launching a program that supports thousands of learners.",
        dimensions: { social: 3, operations: 1 },
      },
      {
        id: "q25-option-data",
        label: "Building models that forecast demand with high accuracy.",
        dimensions: { data: 3, science: 1 },
      },
      {
        id: "q25-option-design",
        label: "Reimagining the customer journey for a legacy product.",
        dimensions: { design: 3, creative: 1 },
      },
    ],
  },
  {
    id: "q26",
    prompt: "When deadlines collide, how do you prioritize?",
    topic: "prioritization",
    options: [
      {
        id: "q26-option-business",
        label: "Focus on the initiatives with the greatest business impact.",
        dimensions: { business: 3 },
      },
      {
        id: "q26-option-data",
        label: "Look at the numbers to decide where delay hurts most.",
        dimensions: { data: 3 },
      },
      {
        id: "q26-option-technology",
        label: "Tackle blockers that keep others from shipping.",
        dimensions: { technology: 3, operations: 1 },
      },
      {
        id: "q26-option-social",
        label: "Support the people under the most pressure first.",
        dimensions: { social: 3 },
      },
    ],
  },
  {
    id: "q27",
    prompt: "What inspires you to keep improving?",
    topic: "inspiration",
    options: [
      {
        id: "q27-option-technology",
        label: "Technical trailblazers who build the impossible.",
        dimensions: { technology: 3 },
      },
      {
        id: "q27-option-healthcare",
        label: "Healthcare professionals who transform patient outcomes.",
        dimensions: { healthcare: 3, social: 1 },
      },
      {
        id: "q27-option-design",
        label: "Creators who turn complex ideas into elegant experiences.",
        dimensions: { design: 3, creative: 1 },
      },
      {
        id: "q27-option-business",
        label: "Strategists who build enduring organizations.",
        dimensions: { business: 3 },
      },
    ],
  },
  {
    id: "q28",
    prompt: "How do you respond to feedback?",
    topic: "feedback",
    options: [
      {
        id: "q28-option-data",
        label: "Validate it against evidence and adjust accordingly.",
        dimensions: { data: 3 },
      },
      {
        id: "q28-option-social",
        label: "Seek to understand the emotions behind the message.",
        dimensions: { social: 3 },
      },
      {
        id: "q28-option-technology",
        label: "Implement fixes immediately and push an updated build.",
        dimensions: { technology: 3 },
      },
      {
        id: "q28-option-design",
        label: "Iterate on the experience and share new prototypes quickly.",
        dimensions: { design: 3, creative: 1 },
      },
    ],
  },
  {
    id: "q29",
    prompt: "What describes your communication style?",
    topic: "communication",
    options: [
      {
        id: "q29-option-business",
        label: "Direct and goal-oriented.",
        dimensions: { business: 3 },
      },
      {
        id: "q29-option-technology",
        label: "Detailed with technical clarity.",
        dimensions: { technology: 3 },
      },
      {
        id: "q29-option-design",
        label: "Visual and story-driven.",
        dimensions: { design: 3, creative: 1 },
      },
      {
        id: "q29-option-social",
        label: "Empathetic and people-first.",
        dimensions: { social: 3 },
      },
    ],
  },
  {
    id: "q30",
    prompt: "Choose the activity that feels like play.",
    topic: "joy",
    options: [
      {
        id: "q30-option-technology",
        label: "Experimenting with new hardware or APIs.",
        dimensions: { technology: 3 },
      },
      {
        id: "q30-option-data",
        label: "Turning messy data into a clean visualization.",
        dimensions: { data: 3, design: 1 },
      },
      {
        id: "q30-option-healthcare",
        label: "Volunteering to support health or wellness programs.",
        dimensions: { healthcare: 3, social: 1 },
      },
      {
        id: "q30-option-creative",
        label: "Producing content or art for fun.",
        dimensions: { creative: 3, design: 1 },
      },
    ],
  },
  {
    id: "q31",
    prompt: "What type of risk feels acceptable?",
    topic: "risk",
    options: [
      {
        id: "q31-option-business",
        label: "Strategic bets with high upside for the organization.",
        dimensions: { business: 3 },
      },
      {
        id: "q31-option-technology",
        label: "Technical experimentation that may fail fast but teaches a lot.",
        dimensions: { technology: 3 },
      },
      {
        id: "q31-option-data",
        label: "Relying on statistical confidence even if not perfect.",
        dimensions: { data: 3 },
      },
      {
        id: "q31-option-social",
        label: "Trying new engagement approaches to meet people where they are.",
        dimensions: { social: 3 },
      },
    ],
  },
  {
    id: "q32",
    prompt: "Where do you want to grow next?",
    topic: "growth",
    options: [
      {
        id: "q32-option-technology",
        label: "Deep technical mastery in emerging areas.",
        dimensions: { technology: 3, science: 1 },
      },
      {
        id: "q32-option-business",
        label: "Strategic leadership and influence.",
        dimensions: { business: 3 },
      },
      {
        id: "q32-option-healthcare",
        label: "Clinical expertise and patient advocacy.",
        dimensions: { healthcare: 3, social: 1 },
      },
      {
        id: "q32-option-design",
        label: "Crafting experiences across multiple platforms.",
        dimensions: { design: 3, creative: 1 },
      },
    ],
  },
  {
    id: "q33",
    prompt: "How do you manage stress?",
    topic: "resilience",
    options: [
      {
        id: "q33-option-social",
        label: "Talk it through and lean on my community.",
        dimensions: { social: 3 },
      },
      {
        id: "q33-option-technology",
        label: "Channel it into building or fixing something.",
        dimensions: { technology: 3 },
      },
      {
        id: "q33-option-creative",
        label: "Express it through creative outlets.",
        dimensions: { creative: 3, design: 1 },
      },
      {
        id: "q33-option-data",
        label: "Organize tasks, lists, and metrics to regain control.",
        dimensions: { data: 3, operations: 1 },
      },
    ],
  },
  {
    id: "q34",
    prompt: "What motivates you to join a new team?",
    topic: "team_selection",
    options: [
      {
        id: "q34-option-technology",
        label: "Challenging technical problems with smart builders.",
        dimensions: { technology: 3 },
      },
      {
        id: "q34-option-business",
        label: "Clear vision, strong leadership, and market opportunity.",
        dimensions: { business: 3 },
      },
      {
        id: "q34-option-social",
        label: "Collaborative culture focused on human impact.",
        dimensions: { social: 3 },
      },
      {
        id: "q34-option-design",
        label: "Creative freedom and multi-disciplinary collaboration.",
        dimensions: { design: 3, creative: 1 },
      },
    ],
  },
  {
    id: "q35",
    prompt: "How do you celebrate wins?",
    topic: "celebration",
    options: [
      {
        id: "q35-option-social",
        label: "Share the success broadly and recognize the team.",
        dimensions: { social: 3, business: 1 },
      },
      {
        id: "q35-option-technology",
        label: "Document lessons learned and push the next release.",
        dimensions: { technology: 3 },
      },
      {
        id: "q35-option-data",
        label: "Analyze the uplift and capture a case study.",
        dimensions: { data: 3 },
      },
      {
        id: "q35-option-design",
        label: "Curate a showcase of the experience and iterate again.",
        dimensions: { design: 3, creative: 1 },
      },
    ],
  },
  {
    id: "q36",
    prompt: "Which quote resonates with your work philosophy?",
    topic: "philosophy",
    options: [
      {
        id: "q36-option-technology",
        label: "\"Ship early, learn fast, and iterate relentlessly.\"",
        dimensions: { technology: 3, operations: 1 },
      },
      {
        id: "q36-option-data",
        label: "\"What gets measured gets improved.\"",
        dimensions: { data: 3, business: 1 },
      },
      {
        id: "q36-option-social",
        label: "\"People will remember how you made them feel.\"",
        dimensions: { social: 3, healthcare: 1 },
      },
      {
        id: "q36-option-design",
        label: "\"Design is not just how it looks, it's how it works.\"",
        dimensions: { design: 3, creative: 1 },
      },
    ],
  },
];
