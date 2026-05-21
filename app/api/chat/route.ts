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
</ROADMAP>`
};

function getMockResponse(messages: { role: string; content: string }[]): string {
  // First message → career counselor analysis
  if (messages.length === 1) {
    return MOCK_ANALYSIS;
  }

  // Second message → check if a path was selected (roadmap request)
  const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || "";

  if (lastUserMsg.includes("product manager") || lastUserMsg.includes("path a")) {
    return MOCK_ROADMAPS["product manager"];
  }
  if (lastUserMsg.includes("data analyst") || lastUserMsg.includes("data science") || lastUserMsg.includes("path b")) {
    return MOCK_ROADMAPS["data analyst"];
  }
  if (lastUserMsg.includes("web developer") || lastUserMsg.includes("developer") || lastUserMsg.includes("path c")) {
    return MOCK_ROADMAPS["web developer"];
  }

  // Second message (follow-up answer) → return paths
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
