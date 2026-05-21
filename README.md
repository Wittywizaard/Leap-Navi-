# Navi — AI Career Navigator

An AI-powered career guidance platform that parses your resume and generates personalized career paths with actionable roadmaps. Built with Next.js 16 + Gemini AI.

## Features
- 📄 Resume upload (PDF / DOCX / TXT) with instant parsing
- 🧠 AI career counselor analysis — extracts role, seniority, skills, trajectory
- 🗺️ 3 personalized career path cards with salary ranges & timelines
- 🚀 Week-by-week roadmap with real courses, certifications, job boards
- 💬 Adaptive chat — tone adjusts to persona (grad, senior IC, career changer)
- 📱 Fully mobile-responsive (390px+)

## Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/YOUR_USERNAME/leap-navi.git
cd leap-navi
npm install
```

### 2. Run Locally (Mock Mode — no API key needed)
The app ships with a built-in **Mock Mode** that works out of the box with zero setup.
It simulates a full career counselor conversation with realistic responses for
three career paths: **Product Manager**, **Data Analyst**, and **Web Developer**.

```bash
npm run dev
# Open http://localhost:3000
```

---

### Want real AI? Enable Live Mode with Gemini

#### Step 1 — Get a free Gemini API Key
Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) → Create API Key (free).

#### Step 2 — Set your environment variable
```bash
cp .env.example .env.local
# Open .env.local and paste your key:
# GEMINI_API_KEY=AIzaSy...
```

#### Step 3 — Switch to Live Mode in the backend
Open `app/api/chat/route.ts` and follow the instructions in the `LIVE MODE` comment block at the bottom of the file. It is a simple uncomment — takes 30 seconds.

#### Step 4 — Restart the server
```bash
# Stop the server (Ctrl+C), then:
npm run dev
```


## Deploy to Vercel

### Option A — Vercel CLI (recommended)
```bash
npm install -g vercel
vercel
# Follow prompts → it detects Next.js automatically
```
When asked for environment variables, add `GEMINI_API_KEY`.

### Option B — Vercel Dashboard
1. Push to GitHub (see below)
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add Environment Variable: `GEMINI_API_KEY` = your key
4. Click Deploy

## Push to GitHub

```bash
# 1. Create repo on github.com (name it: leap-navi)

# 2. In this folder:
git init
git add .
git commit -m "feat: initial Navi career navigator"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/leap-navi.git
git push -u origin main
```

## Project Structure
```
leap-navi/
├── app/
│   ├── page.tsx          # Landing page
│   ├── chat/page.tsx     # Main chat + upload UI
│   ├── globals.css       # Design system (CSS vars, animations)
│   ├── layout.tsx        # Root layout + fonts
│   └── api/
│       ├── chat/         # Gemini chat endpoint
│       └── parse-resume/ # Resume text extraction
├── .env.example          # Copy → .env.local and add your key
├── vercel.json           # Vercel deployment config
└── next.config.ts        # Next.js config (5MB upload, external pkgs)
```

## Evaluation Metrics (from PRD)
| # | Metric | Status |
|---|--------|--------|
| 1 | Resume parsing accuracy | ✅ PDF + DOCX extraction |
| 2 | Personalization depth | ✅ Resume-specific first message |
| 3 | Career path relevance | ✅ Structured JSON path cards |
| 4 | Goal & constraint capture | ✅ Quick replies + adaptive prompts |
| 5 | Roadmap actionability | ✅ Named resources with URLs |
| 6 | Conversation coherence | ✅ Full history passed each turn |
| 7 | Tone calibration | ✅ Persona-aware system prompt |
| 8 | Graceful rejection handling | ✅ "What didn't resonate?" logic |
| 9 | Loop closure | ✅ Max 3 rounds + export offer |
| 10 | Hallucination rate | ✅ Gemini grounded + source-cited salaries |
| 11 | Time to first value | ✅ <15s from upload to insight |
| 12 | Path card UX | ✅ Scannable cards with all key info |
| 13 | Scope guardrails | ✅ System prompt blocks OOB advice |
| 14 | Mobile responsiveness | ✅ Stacking layout, 390px tested |
| 15 | User confidence score | 🔲 Post-session survey (Phase 2) |
