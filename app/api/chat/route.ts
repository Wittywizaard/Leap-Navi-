import { NextRequest, NextResponse } from "next/server";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
// To enable live AI: set GEMINI_API_KEY in .env.local and uncomment the
// LIVE MODE section at the bottom of this file.

const MOCK_ANALYSIS = `Hey! I've gone through your resume carefully, and I have to say — there's a solid foundation here worth building on. Let me give you my honest read.

**What's working well:**
Your experience shows a clear pattern of ownership and cross-functional collaboration. The way you've described your projects suggests you're someone who doesn't just execute tasks — you understand the "why" behind them. That's a rare signal.

Your technical exposure is a genuine asset. Most people at your stage either go deep on one skill or stay broad — you've managed to do both reasonably well, which opens doors in multiple directions.

**Where I see untapped potential:**
The impact numbers in your resume are a bit soft. Hiring managers at top companies want to see *scale* — how many users, how much revenue, what percentage improvement. That's something you can sharpen in your next role.

You're also at an inflection point in your career — the kind where the next move you make will define the next 3–5 years. That's exciting, but it means this decision deserves real thought.

**My overall read:**
You're a strong candidate for roles that blend analytical thinking with execution. You'd thrive in environments that value structured thinking and clear communication — which is most high-growth companies today.

---

So, what's on your mind for the next step? And what do you want right now in your life?`;

const MOCK_PATHS = `Great — that gives me a much clearer picture. Based on everything in your resume and what you just told me, here are three paths that I genuinely think are worth exploring for someone at your stage:

<PATHS>
[
  {
    "id": "path1",
    "title": "Product Manager",
    "hook": "Your cross-functional experience and ability to translate technical work into business outcomes is exactly the DNA top PMs are built from.",
    "salaryRange": "₹18–35L",
    "timeline": "6–9 months",
    "effort": "Medium",
    "skillGaps": ["Product Strategy", "User Research", "PRD Writing", "A/B Testing"],
    "whyFit": "Your background shows you already think in systems and outcomes — the core of great product thinking. With focused upskilling in user research and roadmap prioritization, you can make this transition cleanly."
  },
  {
    "id": "path2",
    "title": "Data Analyst",
    "hook": "If you love finding the story hidden inside numbers and influencing decisions with evidence, this path puts you at the center of every strategic conversation.",
    "salaryRange": "₹12–28L",
    "timeline": "3–6 months",
    "effort": "Low",
    "skillGaps": ["Advanced SQL", "Python (Pandas)", "Tableau / Power BI", "Statistics"],
    "whyFit": "This is your closest natural transition — it plays to your analytical strengths with the lowest skill gap. Data Analysts at B2B SaaS companies often grow into Analytics Engineers or Data Scientists within 18 months."
  },
  {
    "id": "path3",
    "title": "Web Developer",
    "hook": "If you want to build things people actually use every day and see your work come to life on screen, web development gives you creative and technical ownership at once.",
    "salaryRange": "₹10–30L",
    "timeline": "9–12 months",
    "effort": "High",
    "skillGaps": ["React / Next.js", "Node.js", "REST APIs", "CSS / Tailwind"],
    "whyFit": "This path requires the most new learning but gives you the highest creative autonomy. Your logical thinking from your current background transfers well to debugging and architecture decisions."
  }
]
</PATHS>

Click on any card to get your personalised week-by-week roadmap for that path. Which one feels closest to what you're imagining for yourself?`;

const MOCK_ROADMAPS: Record<string, string> = {
  "product manager": `Here's your complete roadmap to becoming a Product Manager:

<ROADMAP>
{
  "role": "Product Manager",
  "weeks": [
    {
      "week": "Week 1–2: Foundations",
      "tasks": ["Read 'Inspired' by Marty Cagan (chapters 1–10)", "Study 3 PM job descriptions and note recurring requirements", "Set up a product thinking journal — write 1 teardown per week"],
      "resources": [
        {"name": "Product School Free PM Certification", "url": "https://productschool.com/free-product-management-certification", "type": "certification"},
        {"name": "Lenny's Newsletter — PM fundamentals", "url": "https://www.lennysnewsletter.com", "type": "book"},
        {"name": "Reforge — Fundamentals of Product Management", "url": "https://www.reforge.com", "type": "course"}
      ]
    },
    {
      "week": "Week 3–6: Core Skills",
      "tasks": ["Write 2 full PRDs for imaginary products", "Conduct 5 user interviews with friends/colleagues", "Learn SQL basics for data-driven decisions", "Create your first product roadmap in Notion"],
      "resources": [
        {"name": "Google UX Design Certificate (Coursera)", "url": "https://www.coursera.org/professional-certificates/google-ux-design", "type": "course"},
        {"name": "Mode Analytics SQL Tutorial", "url": "https://mode.com/sql-tutorial", "type": "course"},
        {"name": "Figma for PMs — free crash course", "url": "https://www.youtube.com/watch?v=FTFaQWZBqQ8", "type": "course"}
      ]
    },
    {
      "week": "Month 2–3: Portfolio Building",
      "tasks": ["Pick a real app and write a full case study on improving one feature", "Join a PM community (Mind the Product, Slack groups)", "Apply for Associate PM or APM programs", "Practice STAR-format PM interview answers"],
      "resources": [
        {"name": "PM Exercises — practice questions", "url": "https://www.pmexercises.com", "type": "course"},
        {"name": "Exponent PM Interview Prep", "url": "https://www.tryexponent.com/courses/pm", "type": "course"},
        {"name": "Cracking the PM Interview (book)", "url": "https://www.amazon.in/Cracking-PM-Interview-Product-Technology/dp/0984782818", "type": "book"}
      ]
    },
    {
      "week": "Month 3–6: Job Search",
      "tasks": ["Apply to 10 companies per week via LinkedIn and Naukri", "Network with 2 PMs per week on LinkedIn", "Do mock PM interviews with peers", "Negotiate your offer — aim for ₹20L+ base"],
      "resources": [
        {"name": "LinkedIn Jobs — PM filter", "url": "https://www.linkedin.com/jobs/product-manager-jobs", "type": "job board"},
        {"name": "Naukri — Product Manager", "url": "https://www.naukri.com/product-manager-jobs", "type": "job board"},
        {"name": "Wellfound (AngelList) — startup PMs", "url": "https://wellfound.com/role/r/product-manager", "type": "job board"}
      ]
    }
  ],
  "milestones": ["Complete PM certification", "Ship 2 portfolio case studies", "Land first PM interview", "Receive offer ≥ ₹18L"],
  "jobBoards": ["LinkedIn", "Naukri", "Wellfound", "Instahyre", "Cutshort"],
  "salaryNote": "₹18–35L range — Source: AmbitionBox & Glassdoor India, 2024. Entry-level PMs at startups start at ₹18L; Series B+ companies pay ₹28–35L."
}
</ROADMAP>`,

  "data analyst": `Here's your complete roadmap to becoming a Data Analyst:

<ROADMAP>
{
  "role": "Data Analyst",
  "weeks": [
    {
      "week": "Week 1–2: SQL & Excel Mastery",
      "tasks": ["Complete Mode Analytics SQL Tutorial (free)", "Practice 20 LeetCode Easy SQL problems", "Build a simple Excel dashboard using public dataset from Kaggle"],
      "resources": [
        {"name": "Mode Analytics SQL Tutorial", "url": "https://mode.com/sql-tutorial", "type": "course"},
        {"name": "LeetCode SQL Problems", "url": "https://leetcode.com/problemset/database", "type": "course"},
        {"name": "Kaggle Datasets (free)", "url": "https://www.kaggle.com/datasets", "type": "course"}
      ]
    },
    {
      "week": "Week 3–6: Python & Visualisation",
      "tasks": ["Learn Python basics: lists, loops, functions, Pandas", "Build 2 end-to-end analysis projects in Jupyter Notebook", "Create your first Tableau Public dashboard"],
      "resources": [
        {"name": "Google Data Analytics Certificate (Coursera)", "url": "https://www.coursera.org/professional-certificates/google-data-analytics", "type": "certification"},
        {"name": "Python for Everybody — freeCodeCamp", "url": "https://www.freecodecamp.org/learn/data-analysis-with-python", "type": "course"},
        {"name": "Tableau Public (free)", "url": "https://public.tableau.com", "type": "course"}
      ]
    },
    {
      "week": "Month 2–3: Real Projects",
      "tasks": ["Complete 2 Kaggle competitions (beginner tier)", "Build a portfolio on GitHub with 3 analysis notebooks", "Write 2 blog posts on Medium about your findings"],
      "resources": [
        {"name": "Kaggle Competitions", "url": "https://www.kaggle.com/competitions", "type": "course"},
        {"name": "GitHub — portfolio hosting (free)", "url": "https://github.com", "type": "course"},
        {"name": "Towards Data Science on Medium", "url": "https://towardsdatascience.com", "type": "book"}
      ]
    },
    {
      "week": "Month 3–6: Job Search",
      "tasks": ["Apply to 15 analyst roles per week", "Prepare for SQL & case study interviews", "Target B2B SaaS and fintech companies for highest salaries"],
      "resources": [
        {"name": "LinkedIn Jobs — Data Analyst", "url": "https://www.linkedin.com/jobs/data-analyst-jobs-india", "type": "job board"},
        {"name": "Naukri — Data Analyst", "url": "https://www.naukri.com/data-analyst-jobs", "type": "job board"},
        {"name": "Instahyre — verified companies", "url": "https://www.instahyre.com", "type": "job board"}
      ]
    }
  ],
  "milestones": ["Google Data Analytics Certification", "3 GitHub portfolio projects", "First technical interview cleared", "Offer received ≥ ₹12L"],
  "jobBoards": ["LinkedIn", "Naukri", "Instahyre", "Cutshort", "Kaggle Jobs"],
  "salaryNote": "₹12–28L range — Source: AmbitionBox & Glassdoor India, 2024. Freshers start at ₹6–12L; 2–4 yrs experience commands ₹18–28L at product companies."
}
</ROADMAP>`,

  "web developer": `Here's your complete roadmap to becoming a Web Developer:

<ROADMAP>
{
  "role": "Web Developer",
  "weeks": [
    {
      "week": "Week 1–2: HTML, CSS & JS Foundations",
      "tasks": ["Complete freeCodeCamp Responsive Web Design certification", "Build 3 static pages: portfolio, landing page, blog", "Learn Git and push everything to GitHub from day one"],
      "resources": [
        {"name": "freeCodeCamp — Responsive Web Design (free)", "url": "https://www.freecodecamp.org/learn/2022/responsive-web-design", "type": "certification"},
        {"name": "The Odin Project — Foundations (free)", "url": "https://www.theodinproject.com/paths/foundations", "type": "course"},
        {"name": "JavaScript.info — Modern JS Tutorial", "url": "https://javascript.info", "type": "book"}
      ]
    },
    {
      "week": "Week 3–6: React & Modern Tooling",
      "tasks": ["Build a To-Do app, Weather app, and a GitHub Profile Viewer in React", "Learn how to use APIs (fetch, axios)", "Deploy all projects to Vercel for free"],
      "resources": [
        {"name": "React Official Docs (free)", "url": "https://react.dev/learn", "type": "course"},
        {"name": "Scrimba — Learn React for free", "url": "https://scrimba.com/learn/learnreact", "type": "course"},
        {"name": "Vercel — free hosting for React/Next.js", "url": "https://vercel.com", "type": "course"}
      ]
    },
    {
      "week": "Month 2–3: Full-Stack & Portfolio",
      "tasks": ["Learn Node.js + Express for backend basics", "Build one full-stack project (e.g. a job board or note-taking app)", "Polish your portfolio site — it's your resume now"],
      "resources": [
        {"name": "The Odin Project — Full Stack JS (free)", "url": "https://www.theodinproject.com/paths/full-stack-javascript", "type": "course"},
        {"name": "Next.js Official Tutorial (free)", "url": "https://nextjs.org/learn", "type": "course"},
        {"name": "MongoDB Atlas — free cloud database", "url": "https://www.mongodb.com/cloud/atlas", "type": "course"}
      ]
    },
    {
      "week": "Month 3–6: Job Search",
      "tasks": ["Apply to 10 dev roles per week — target startups first", "Contribute to 1 open source project on GitHub", "Prepare for DSA rounds: 2 LeetCode Easy problems per day"],
      "resources": [
        {"name": "LinkedIn Jobs — Web Developer India", "url": "https://www.linkedin.com/jobs/web-developer-jobs-india", "type": "job board"},
        {"name": "Wellfound — startup web dev roles", "url": "https://wellfound.com/role/r/software-engineer", "type": "job board"},
        {"name": "Cutshort — verified tech companies", "url": "https://cutshort.io", "type": "job board"}
      ]
    }
  ],
  "milestones": ["freeCodeCamp certification complete", "3 live deployed projects", "First technical round cleared", "Offer received ≥ ₹10L"],
  "jobBoards": ["LinkedIn", "Naukri", "Wellfound", "Cutshort", "HackerEarth Jobs"],
  "salaryNote": "₹10–30L range — Source: AmbitionBox & Glassdoor India, 2024. Fresher devs start at ₹6–12L; React/Next.js specialists with a strong portfolio command ₹20–30L."
}
</ROADMAP>`,

  "ux researcher": `Here's your complete roadmap to becoming a UX Researcher:

<ROADMAP>
{
  "role": "UX Researcher",
  "weeks": [
    {
      "week": "Week 1–2: Research Foundations",
      "tasks": ["Learn the 5 core UX research methods: interviews, surveys, usability tests, card sorting, A/B tests", "Read 'Just Enough Research' by Erika Hall", "Set up a free Figma account and explore existing design files"],
      "resources": [
        {"name": "Google UX Design Certificate (Coursera)", "url": "https://www.coursera.org/professional-certificates/google-ux-design", "type": "certification"},
        {"name": "Nielsen Norman Group — free UX articles", "url": "https://www.nngroup.com/articles", "type": "book"},
        {"name": "Just Enough Research — Erika Hall", "url": "https://www.amazon.in/Just-Enough-Research-Erika-Hall/dp/1937557103", "type": "book"}
      ]
    },
    {
      "week": "Week 3–6: Hands-On Practice",
      "tasks": ["Conduct 5 guerrilla user interviews on any app (Swiggy, GPay, etc.)", "Write a research report with findings and recommendations", "Run a usability test on a friend using Maze or Lookback (free tier)"],
      "resources": [
        {"name": "Maze — free usability testing tool", "url": "https://maze.co", "type": "course"},
        {"name": "Lookback — user interview recording", "url": "https://lookback.com", "type": "course"},
        {"name": "UX Tweak — free research platform", "url": "https://www.uxtweak.com", "type": "course"}
      ]
    },
    {
      "week": "Month 2–3: Portfolio & Specialisation",
      "tasks": ["Create 2 full research case studies (problem → method → insight → recommendation)", "Learn affinity mapping and synthesis using FigJam", "Join UX India community and attend 1 online meetup"],
      "resources": [
        {"name": "FigJam — free collaborative whiteboard", "url": "https://www.figma.com/figjam", "type": "course"},
        {"name": "UXcel — UX skills assessment & learning", "url": "https://uxcel.com", "type": "certification"},
        {"name": "Interaction Design Foundation", "url": "https://www.interaction-design.org", "type": "course"}
      ]
    },
    {
      "week": "Month 3–6: Job Search",
      "tasks": ["Target product-led companies: Zepto, Razorpay, CRED, Meesho, Flipkart", "Apply to UX Research internships to build credibility fast", "Prepare a research portfolio on Notion or a personal site"],
      "resources": [
        {"name": "LinkedIn Jobs — UX Researcher India", "url": "https://www.linkedin.com/jobs/ux-researcher-jobs-india", "type": "job board"},
        {"name": "Naukri — UX Researcher", "url": "https://www.naukri.com/ux-researcher-jobs", "type": "job board"},
        {"name": "Wellfound — Design Research roles", "url": "https://wellfound.com/role/r/ux-researcher", "type": "job board"}
      ]
    }
  ],
  "milestones": ["Google UX Certificate complete", "2 research case studies published", "First usability test conducted", "Offer received ≥ ₹14L"],
  "jobBoards": ["LinkedIn", "Naukri", "Wellfound", "Cutshort", "Instahyre"],
  "salaryNote": "₹14–30L range — Source: AmbitionBox & Glassdoor India, 2024. Entry-level UX Researchers at product companies start at ₹12–18L; senior researchers at scale-ups earn ₹25–35L."
}
</ROADMAP>`,

  "growth marketer": `Here's your complete roadmap to becoming a Growth Marketer:

<ROADMAP>
{
  "role": "Growth Marketer",
  "weeks": [
    {
      "week": "Week 1–2: Growth Thinking",
      "tasks": ["Read 'Hacking Growth' by Sean Ellis (free summary available)", "Study 3 growth teardowns on Lenny's Newsletter", "Set up a free Google Analytics 4 account on any website or blog"],
      "resources": [
        {"name": "Reforge Growth Series (free content)", "url": "https://www.reforge.com/blog", "type": "book"},
        {"name": "Lenny's Newsletter — Growth deep dives", "url": "https://www.lennysnewsletter.com", "type": "book"},
        {"name": "Google Analytics Academy (free)", "url": "https://analytics.google.com/analytics/academy", "type": "certification"}
      ]
    },
    {
      "week": "Week 3–6: Core Channels",
      "tasks": ["Run a real email campaign using Mailchimp free tier (200 contacts)", "Set up a basic SEO audit using Ubersuggest on any website", "Build a simple A/B test on a landing page using Google Optimize"],
      "resources": [
        {"name": "HubSpot Academy — Inbound Marketing (free)", "url": "https://academy.hubspot.com/courses/inbound-marketing", "type": "certification"},
        {"name": "Semrush Academy — SEO fundamentals (free)", "url": "https://www.semrush.com/academy", "type": "certification"},
        {"name": "Mailchimp — free email marketing", "url": "https://mailchimp.com", "type": "course"}
      ]
    },
    {
      "week": "Month 2–3: Experiments & Metrics",
      "tasks": ["Build a growth experiment log: hypothesis → metric → result for 5 tests", "Learn SQL basics for pulling your own data", "Create a weekly growth report dashboard in Google Sheets"],
      "resources": [
        {"name": "Mode Analytics SQL Tutorial (free)", "url": "https://mode.com/sql-tutorial", "type": "course"},
        {"name": "GrowthHackers — community & case studies", "url": "https://growthhackers.com", "type": "book"},
        {"name": "CXL Institute — free growth courses", "url": "https://cxl.com/institute", "type": "course"}
      ]
    },
    {
      "week": "Month 3–6: Job Search",
      "tasks": ["Target Series A–C startups with a small growth team", "Build a personal brand on LinkedIn by posting 1 growth insight per week", "Prepare a case study on how you'd grow a product like Zepto or CRED by 10%"],
      "resources": [
        {"name": "LinkedIn Jobs — Growth Marketing India", "url": "https://www.linkedin.com/jobs/growth-marketing-jobs-india", "type": "job board"},
        {"name": "Wellfound — Growth roles at startups", "url": "https://wellfound.com/role/r/growth-marketer", "type": "job board"},
        {"name": "Cutshort — verified marketing roles", "url": "https://cutshort.io/jobs/growth", "type": "job board"}
      ]
    }
  ],
  "milestones": ["Google Analytics & HubSpot certified", "5 growth experiments documented", "Personal brand started on LinkedIn", "Offer received ≥ ₹12L"],
  "jobBoards": ["LinkedIn", "Wellfound", "Cutshort", "Instahyre", "iimjobs"],
  "salaryNote": "₹12–28L range — Source: AmbitionBox & Glassdoor India, 2024. Growth marketers at funded startups average ₹15–22L; senior growth leads at scale-ups earn ₹28–40L."
}
</ROADMAP>`,

  "management consultant": `Here's your complete roadmap to becoming a Management Consultant:

<ROADMAP>
{
  "role": "Management Consultant",
  "weeks": [
    {
      "week": "Week 1–2: Case Framework Mastery",
      "tasks": ["Learn MECE thinking and the Pyramid Principle", "Practice 5 case frameworks: profitability, market entry, M&A, operations, pricing", "Read 'Case in Point' by Marc Cosentino (chapters 1–8)"],
      "resources": [
        {"name": "Case in Point — Marc Cosentino", "url": "https://www.amazon.in/Case-Point-Complete-Interview-Preparation/dp/0986370177", "type": "book"},
        {"name": "ConsultingPrep — free case library", "url": "https://consultingprep.com", "type": "course"},
        {"name": "PrepLounge — case practice platform", "url": "https://www.preplounge.com", "type": "course"}
      ]
    },
    {
      "week": "Week 3–6: Excel & Deck Building",
      "tasks": ["Build a 3-statement financial model in Excel (income, balance sheet, cash flow)", "Create a 10-slide McKinsey-style deck on any business problem", "Practice mental math: percentages, ratios, market sizing in 30 seconds"],
      "resources": [
        {"name": "CFI — Excel for Finance (free)", "url": "https://corporatefinanceinstitute.com/resources/excel", "type": "course"},
        {"name": "Slide Science — consulting deck templates", "url": "https://slidescience.co", "type": "course"},
        {"name": "Victor Cheng Case Interview Secrets (YouTube)", "url": "https://www.youtube.com/@VictorCheng", "type": "course"}
      ]
    },
    {
      "week": "Month 2–3: Practice & Network",
      "tasks": ["Complete 20 live case practices on PrepLounge with peers", "Reach out to 10 consultants on LinkedIn for informational interviews", "Write 1 business analysis of a company (public data only) per week"],
      "resources": [
        {"name": "PrepLounge — peer case practice", "url": "https://www.preplounge.com", "type": "course"},
        {"name": "Management Consulted — industry guides", "url": "https://managementconsulted.com", "type": "book"},
        {"name": "MConsultingPrep — video case solutions", "url": "https://mconsultingprep.com", "type": "course"}
      ]
    },
    {
      "week": "Month 3–6: Applications & Interviews",
      "tasks": ["Apply to boutique consulting firms first: EY-Parthenon, Kearney, Strategy&", "Target MBB (McKinsey, BCG, Bain) only if you have a strong pedigree or MBA", "Practice the STAR framework for fit interview questions"],
      "resources": [
        {"name": "LinkedIn Jobs — Management Consulting India", "url": "https://www.linkedin.com/jobs/management-consulting-jobs-india", "type": "job board"},
        {"name": "Naukri — Consulting roles", "url": "https://www.naukri.com/management-consultant-jobs", "type": "job board"},
        {"name": "iimjobs — premium consulting roles", "url": "https://www.iimjobs.com", "type": "job board"}
      ]
    }
  ],
  "milestones": ["20 live case practices completed", "Full financial model built", "10 consultant networking calls done", "Boutique firm offer received"],
  "jobBoards": ["LinkedIn", "Naukri", "iimjobs", "Glassdoor", "company career pages"],
  "salaryNote": "₹16–40L range — Source: AmbitionBox & Glassdoor India, 2024. Boutique consulting analysts start at ₹14–20L; MBB associates with MBA earn ₹35–60L."
}
</ROADMAP>`,

  "technical content strategist": `Here's your complete roadmap to becoming a Technical Content Strategist:

<ROADMAP>
{
  "role": "Technical Content Strategist",
  "weeks": [
    {
      "week": "Week 1–2: Writing Foundations",
      "tasks": ["Read Google's Developer Documentation Style Guide (free online)", "Write 3 how-to articles on topics you already know — publish on Medium or Dev.to", "Study 3 examples of world-class developer docs: Stripe, Twilio, Notion API"],
      "resources": [
        {"name": "Google Developer Style Guide (free)", "url": "https://developers.google.com/style", "type": "book"},
        {"name": "Dev.to — technical writing community", "url": "https://dev.to", "type": "course"},
        {"name": "Stripe API Docs — gold standard reference", "url": "https://stripe.com/docs", "type": "book"}
      ]
    },
    {
      "week": "Week 3–6: SEO & Content Strategy",
      "tasks": ["Learn keyword research using Ubersuggest or Google Keyword Planner", "Write a full content audit of any company's blog (structure, gaps, improvements)", "Set up a free personal blog on Hashnode or Ghost and publish 4 articles"],
      "resources": [
        {"name": "Ahrefs Blog — free SEO education", "url": "https://ahrefs.com/blog", "type": "book"},
        {"name": "Hashnode — free technical blog hosting", "url": "https://hashnode.com", "type": "course"},
        {"name": "HubSpot Content Marketing Certification (free)", "url": "https://academy.hubspot.com/courses/content-marketing", "type": "certification"}
      ]
    },
    {
      "week": "Month 2–3: Tooling & Portfolio",
      "tasks": ["Learn basic Markdown and documentation tools: GitBook, Docusaurus, Notion", "Build a portfolio with 5 writing samples across: tutorial, explainer, API doc, case study, blog", "Contribute to 1 open-source project's documentation on GitHub"],
      "resources": [
        {"name": "GitBook — free documentation tool", "url": "https://www.gitbook.com", "type": "course"},
        {"name": "Docusaurus — open source docs framework", "url": "https://docusaurus.io", "type": "course"},
        {"name": "Write the Docs — global tech writing community", "url": "https://www.writethedocs.org", "type": "book"}
      ]
    },
    {
      "week": "Month 3–6: Job Search",
      "tasks": ["Target SaaS companies, dev tools startups, and B2B tech firms", "Apply to remote roles — technical writing is one of the most remote-friendly careers", "Cold pitch 10 companies with a specific content improvement idea for their docs"],
      "resources": [
        {"name": "LinkedIn Jobs — Technical Writer India", "url": "https://www.linkedin.com/jobs/technical-writer-jobs-india", "type": "job board"},
        {"name": "We Work Remotely — remote writing jobs", "url": "https://weworkremotely.com/categories/remote-writing-jobs", "type": "job board"},
        {"name": "Remote OK — tech content roles", "url": "https://remoteok.com/remote-content-jobs", "type": "job board"}
      ]
    }
  ],
  "milestones": ["5-piece portfolio published", "Open source docs contribution merged", "HubSpot Content cert complete", "Offer received ≥ ₹10L"],
  "jobBoards": ["LinkedIn", "We Work Remotely", "Remote OK", "Naukri", "AngelList"],
  "salaryNote": "₹10–24L range — Source: AmbitionBox & Glassdoor India, 2024. Technical writers at SaaS companies earn ₹10–16L; senior content strategists at B2B firms earn ₹20–30L."
}
</ROADMAP>`,

  "business analyst": `Here's your complete roadmap to becoming a Business Analyst:

<ROADMAP>
{
  "role": "Business Analyst (Enterprise)",
  "weeks": [
    {
      "week": "Week 1–2: BA Fundamentals",
      "tasks": ["Study the core BA skill set: requirements gathering, use cases, process mapping", "Read 'A Guide to the Business Analysis Body of Knowledge (BABOK)' — free chapter summary online", "Learn what a Business Requirements Document (BRD) and Functional Spec look like"],
      "resources": [
        {"name": "IIBA BABOK Guide (free overview)", "url": "https://www.iiba.org/standards-and-resources/babok", "type": "book"},
        {"name": "Udemy — Business Analysis Fundamentals", "url": "https://www.udemy.com/course/business-analysis-ba", "type": "course"},
        {"name": "Simplilearn — Free BA course", "url": "https://www.simplilearn.com/free-business-analyst-course-skillup", "type": "certification"}
      ]
    },
    {
      "week": "Week 3–6: Tools & Process",
      "tasks": ["Learn to create process flow diagrams using draw.io or Lucidchart (free)", "Build a sample BRD for an imaginary feature (e.g. 'Add UPI Split Payment to Swiggy')", "Get comfortable with JIRA and Confluence — free Atlassian account available"],
      "resources": [
        {"name": "draw.io — free process diagrams", "url": "https://app.diagrams.net", "type": "course"},
        {"name": "Atlassian JIRA & Confluence (free tier)", "url": "https://www.atlassian.com/software/jira/free", "type": "course"},
        {"name": "Lucidchart — visual process mapping", "url": "https://www.lucidchart.com", "type": "course"}
      ]
    },
    {
      "week": "Month 2–3: SQL & Stakeholder Skills",
      "tasks": ["Learn SQL: SELECT, JOIN, GROUP BY, subqueries (2–3 weeks of daily practice)", "Practice stakeholder interview role-play with a friend", "Write 2 full case studies of BA work on Notion"],
      "resources": [
        {"name": "SQLZoo — free interactive SQL (free)", "url": "https://sqlzoo.net", "type": "course"},
        {"name": "Business Analysis Excellence — YouTube", "url": "https://www.youtube.com/@BAExcellence", "type": "course"},
        {"name": "Udemy — Agile BA course", "url": "https://www.udemy.com/course/agile-business-analysis", "type": "course"}
      ]
    },
    {
      "week": "Month 3–6: Job Search",
      "tasks": ["Target large IT services firms first: TCS, Infosys, Wipro, Accenture — they hire BAs at scale", "Also target fintech, insurance, and e-commerce companies", "Get ECBA certification (IIBA entry-level) to stand out"],
      "resources": [
        {"name": "LinkedIn Jobs — Business Analyst India", "url": "https://www.linkedin.com/jobs/business-analyst-jobs-india", "type": "job board"},
        {"name": "Naukri — Business Analyst", "url": "https://www.naukri.com/business-analyst-jobs", "type": "job board"},
        {"name": "iimjobs — premium BA openings", "url": "https://www.iimjobs.com/j/business-analyst", "type": "job board"}
      ]
    }
  ],
  "milestones": ["IIBA ECBA or Simplilearn cert complete", "2 BA case studies written", "SQL fundamentals mastered", "Offer received ≥ ₹12L"],
  "jobBoards": ["LinkedIn", "Naukri", "iimjobs", "Glassdoor", "Instahyre"],
  "salaryNote": "₹12–26L range — Source: AmbitionBox & Glassdoor India, 2024. Entry-level BAs at IT services earn ₹8–14L; product company BAs earn ₹18–26L with 2–3 years experience."
}
</ROADMAP>`,

  "startup operations lead": `Here's your complete roadmap to becoming a Startup Operations Lead:

<ROADMAP>
{
  "role": "Startup Operations Lead",
  "weeks": [
    {
      "week": "Week 1–2: Ops Foundations",
      "tasks": ["Map out what 'operations' means at a 10-person vs. 50-person vs. 200-person startup", "Study how Notion, Linear, Zapier and Slack are used as an ops stack", "Read 'The Great CEO Within' by Matt Mochary (free PDF online)"],
      "resources": [
        {"name": "The Great CEO Within — Matt Mochary (free)", "url": "https://docs.google.com/document/d/1ZJZbv4J6FZ8Dnb0JuMhJxTnwl-dwqx5xl0s65DE3wO8", "type": "book"},
        {"name": "Notion — free workspace setup", "url": "https://www.notion.so", "type": "course"},
        {"name": "Zapier — free automation tool", "url": "https://zapier.com", "type": "course"}
      ]
    },
    {
      "week": "Week 3–6: Core Ops Skills",
      "tasks": ["Build a hiring pipeline tracker in Notion from scratch", "Create a vendor comparison spreadsheet template", "Learn basics of startup finance: burn rate, runway, unit economics"],
      "resources": [
        {"name": "YC Startup School — free operations content", "url": "https://www.startupschool.org", "type": "course"},
        {"name": "Airtable — free database for ops tracking", "url": "https://airtable.com", "type": "course"},
        {"name": "CFI — Financial Modeling basics (free)", "url": "https://corporatefinanceinstitute.com/resources/financial-modeling", "type": "course"}
      ]
    },
    {
      "week": "Month 2–3: Get Hands-On",
      "tasks": ["Volunteer or freelance to help a small startup or NGO with their ops for 4–6 weeks", "Build an SOP (Standard Operating Procedure) document for any repetitive process", "Join IndiaStartups and Headstart Network communities to find opportunities"],
      "resources": [
        {"name": "IndiaStartups Slack Community", "url": "https://indiastartups.slack.com", "type": "course"},
        {"name": "Headstart Network — startup events India", "url": "https://www.headstart.in", "type": "course"},
        {"name": "Linear — project management for startups (free)", "url": "https://linear.app", "type": "course"}
      ]
    },
    {
      "week": "Month 3–6: Job Search",
      "tasks": ["Target seed to Series A startups — they need generalist ops the most", "Look for titles like: Ops Manager, Chief of Staff, Head of Operations", "Network directly with founders on LinkedIn and Twitter/X"],
      "resources": [
        {"name": "Wellfound — startup ops roles", "url": "https://wellfound.com/role/r/operations-manager", "type": "job board"},
        {"name": "LinkedIn Jobs — Startup Operations India", "url": "https://www.linkedin.com/jobs/operations-manager-jobs-india", "type": "job board"},
        {"name": "Cutshort — startup hiring platform", "url": "https://cutshort.io/jobs/operations", "type": "job board"}
      ]
    }
  ],
  "milestones": ["Ops stack set up and documented", "Real freelance ops project completed", "Startup community network built", "Offer received with equity component"],
  "jobBoards": ["Wellfound", "LinkedIn", "Cutshort", "Instahyre", "direct founder outreach"],
  "salaryNote": "₹10–22L + equity — Source: AmbitionBox & Glassdoor India, 2024. Early ops hires at seed startups earn ₹8–14L + meaningful equity; Series A ops leads earn ₹18–28L."
}
</ROADMAP>`
};

const MOCK_PATHS_SET2 = `No problem at all — these didn't land, and that's useful information. Let me think differently about your profile.

Here are 3 paths you probably haven't considered, but that I think deserve a serious look:

<PATHS>
[
  {
    "id": "path4",
    "title": "UX Researcher",
    "hook": "If you're the person in every room who asks 'but why does the user actually do that?' — this is your calling.",
    "salaryRange": "₹14–30L",
    "timeline": "6–9 months",
    "effort": "Medium",
    "skillGaps": ["Usability Testing", "Interview Techniques", "Figma basics", "Research synthesis"],
    "whyFit": "UX Research blends your analytical thinking with deep human curiosity. Companies desperately need people who can translate user behavior into product decisions — and that's a skill your background primes you for."
  },
  {
    "id": "path5",
    "title": "Growth Marketer",
    "hook": "Growth is where data meets creativity — it's the role where analytical thinkers consistently outperform 'creative' marketers.",
    "salaryRange": "₹12–28L",
    "timeline": "4–6 months",
    "effort": "Medium",
    "skillGaps": ["Google Analytics", "A/B Testing", "Email & SEO fundamentals", "Funnel analysis"],
    "whyFit": "Growth roles reward people who can form hypotheses, run experiments, and read the results — a pattern that matches how analytical minds naturally work. This path has an extremely fast feedback loop."
  },
  {
    "id": "path6",
    "title": "Management Consultant",
    "hook": "If you've ever solved a problem and thought 'why doesn't every company do it this way?' — consulting puts you in that seat full time.",
    "salaryRange": "₹16–40L",
    "timeline": "9–12 months",
    "effort": "High",
    "skillGaps": ["Case frameworks (MECE)", "Executive communication", "Excel modelling", "Deck storytelling"],
    "whyFit": "Consulting rewards structured thinking and confidence under pressure. Your cross-functional exposure is a genuine advantage — most consultants spend years trying to build that kind of context."
  }
]
</PATHS>

Does any of these feel closer? If not, I have one more round of ideas for you.`;

const MOCK_PATHS_SET3 = `You're someone who knows what you *don't* want — and that's actually a powerful starting point. Let me go unconventional with this last set.

These are paths that often get overlooked but consistently produce high satisfaction for people with your thinking style:

<PATHS>
[
  {
    "id": "path7",
    "title": "Technical Content Strategist",
    "hook": "The best technical writers out there earn more than most developers — and they work with every team in the company.",
    "salaryRange": "₹10–24L",
    "timeline": "3–5 months",
    "effort": "Low",
    "skillGaps": ["Technical writing style", "Developer docs tools", "SEO basics", "Content strategy"],
    "whyFit": "If you can understand complex topics and explain them clearly, this is a high-leverage career. Remote-first, creative, and in massive demand as companies ship more software and AI products."
  },
  {
    "id": "path8",
    "title": "Business Analyst (Enterprise)",
    "hook": "BAs sit at the exact intersection of business problems and technical solutions — it's a role that rewards people who can speak both languages.",
    "salaryRange": "₹12–26L",
    "timeline": "3–5 months",
    "effort": "Low",
    "skillGaps": ["Requirements gathering", "Process mapping", "JIRA / Confluence", "Stakeholder management"],
    "whyFit": "This is one of the most stable and respected entry points into large organisations. Your ability to understand systems and communicate across teams is exactly what makes a great BA."
  },
  {
    "id": "path9",
    "title": "Startup Operations Lead",
    "hook": "Early-stage startups need one person who can do everything — and that generalist superpower is exactly what you have.",
    "salaryRange": "₹10–22L + equity",
    "timeline": "Immediately",
    "effort": "Medium",
    "skillGaps": ["Ops tooling (Notion, Zapier)", "Vendor management", "Hiring basics", "Finance basics"],
    "whyFit": "Operations at a 10–50 person startup is one of the fastest ways to learn everything about business. The breadth of exposure you get in 2 years is equivalent to an MBA — with real stakes."
  }
]
</PATHS>

This is my final set of recommendations. If none of these feel right either, I'd love to have a more open conversation — tell me what *does* excite you, and we'll work backwards from there.`;

const MOCK_CLOSING = `You've now seen 9 different career paths across 3 rounds — and the fact that none have clicked yet tells me something important.

This isn't about finding the *right path from a list*. It's about excavating what you actually want — and that's a deeper question than any AI can answer for you in a single session.

**Here's what I'd suggest as your real next step:**

Take 20 minutes this week and write honest answers to these 3 questions:
1. What work have you done in the past year that made you lose track of time?
2. What outcome do you want your career to produce in the next 5 years — not a job title, but a *life outcome*?
3. If salary wasn't a constraint, what would you spend your days doing?

Bring those answers back, and I'll give you a much sharper, more personalised recommendation.

You've got strong foundations. The clarity will come. 🧭`;

function getMockResponse(messages: { role: string; content: string }[]): string {
  // First message → career counselor analysis
  if (messages.length === 1) {
    return MOCK_ANALYSIS;
  }

  const lastUserMsg = messages[messages.length - 1]?.content || "";
  const lastUserLower = lastUserMsg.toLowerCase();

  // 1. Natural Language Regeneration Triggers (if they type instead of clicking the button)
  const wantsDifferentPaths = 
    lastUserMsg.includes("__REGEN_PATHS_ROUND_") || 
    lastUserLower.includes("none") || 
    lastUserLower.includes("different") || 
    lastUserLower.includes("else") || 
    lastUserLower.includes("other");

  if (wantsDifferentPaths) {
    // Count how many path sets we've already shown
    const pathSetsShown = messages.filter(m => m.role === "assistant" && m.content.includes("<PATHS>")).length;
    
    if (pathSetsShown === 1) return MOCK_PATHS_SET2;
    if (pathSetsShown === 2) return MOCK_PATHS_SET3;
    if (pathSetsShown >= 3) return MOCK_CLOSING;
  }

  // 2. Path roadmap triggers (if they type the path name instead of clicking)
  if (lastUserLower.includes("product manager") || lastUserLower.includes("path a")) return MOCK_ROADMAPS["product manager"];
  if (lastUserLower.includes("data analyst") || lastUserLower.includes("data science") || lastUserLower.includes("path b")) return MOCK_ROADMAPS["data analyst"];
  if (lastUserLower.includes("web developer") || lastUserLower.includes("developer") || lastUserLower.includes("path c")) return MOCK_ROADMAPS["web developer"];
  if (lastUserLower.includes("ux researcher") || lastUserLower.includes("ux research") || lastUserLower.includes("path d")) return MOCK_ROADMAPS["ux researcher"];
  if (lastUserLower.includes("growth marketer") || lastUserLower.includes("growth marketing") || lastUserLower.includes("path e")) return MOCK_ROADMAPS["growth marketer"];
  if (lastUserLower.includes("management consultant") || lastUserLower.includes("consultant") || lastUserLower.includes("path f")) return MOCK_ROADMAPS["management consultant"];
  if (lastUserLower.includes("technical content") || lastUserLower.includes("content strategist") || lastUserLower.includes("path g")) return MOCK_ROADMAPS["technical content strategist"];
  if (lastUserLower.includes("business analyst") || lastUserLower.includes("path h")) return MOCK_ROADMAPS["business analyst"];
  if (lastUserLower.includes("startup operations") || lastUserLower.includes("operations") || lastUserLower.includes("path i")) return MOCK_ROADMAPS["startup operations lead"];

  // Second message (follow-up answer after analysis) → return first path set
  if (messages.length <= 3) {
    return MOCK_PATHS;
  }

  // Any further messages → helpful follow-up
  return `That's a great question! Based on your profile and the path you're exploring, I'd focus on one thing: **consistency over intensity**. 

Spend 1–2 hours every day rather than 8 hours on weekends. The compounding effect of daily practice is what separates people who transition successfully from those who don't.

Is there a specific part of the roadmap you'd like me to go deeper on — the skills, the interview prep, or the salary negotiation?`;
}

// ─── API HANDLER ──────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Simulate realistic AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1800));

    const content = getMockResponse(messages);
    return NextResponse.json({ content });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Chat failed" }, { status: 500 });
  }
}

// ─── LIVE MODE (uncomment to use real Gemini AI) ──────────────────────────────
// To switch from mock to live AI:
// 1. Get a free API key at https://aistudio.google.com/app/apikey
// 2. Add GEMINI_API_KEY=AIza... to your .env.local file
// 3. Uncomment the LIVE MODE block below and delete the mock handler above
//
// export async function POST(req: NextRequest) {
//   try {
//     const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
//     const { messages, resumeText } = await req.json();
//     if (!GEMINI_API_KEY) return NextResponse.json({ error: "GEMINI_API_KEY not configured" }, { status: 500 });
//     const systemMessage = resumeText ? `${SYSTEM_PROMPT}\n\nUSER'S RESUME:\n${resumeText}` : SYSTEM_PROMPT;
//     const geminiMessages = messages.map((m: { role: string; content: string }) => ({
//       role: m.role === "assistant" ? "model" : "user",
//       parts: [{ text: m.content }]
//     }));
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           system_instruction: { parts: [{ text: systemMessage }] },
//           contents: geminiMessages,
//           generationConfig: { temperature: 0.75, maxOutputTokens: 2000, topP: 0.9 }
//         })
//       }
//     );
//     if (!response.ok) { const err = await response.text(); return NextResponse.json({ error: "Gemini API error: " + err }, { status: 500 }); }
//     const data = await response.json();
//     return NextResponse.json({ content: data.candidates?.[0]?.content?.parts?.[0]?.text || "" });
//   } catch (err) {
//     return NextResponse.json({ error: "Chat failed" }, { status: 500 });
//   }
// }
