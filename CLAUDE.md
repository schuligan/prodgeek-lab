# Prodgeek Lab — READ ME FIRST (every session)

You are continuing an in-flight project. Do **not** start fresh — resume from the
sources of truth below. This file is intentionally short; the detail lives in Notion.

**One-liner:** Prodgeek Lab — an AI venture studio site, built & maintained by agents.
"AI gets you 70%; I build the brutal last 30% and ship it, for a small stake." Audience:
AI-curious builders. Warm, candid voice. Visual: Dark Atelier + scroll-tint. CTA: a
baseball you grip & pitch (The Bullpen game) → booking.

## Sources of truth — read in this order at session start
1. **Notion "Lab" hub** (THE living truth): https://app.notion.com/p/384affa908f8802f8f21ed0af8abba54
   - Read the **Changelog** (newest first) for current state, then the **Agent Operating Guide**.
   - Also: Requirements/PRD · Acceptance Criteria · Architecture · Build Plan · Tasks · Test Plan · Decisions · 🎯 Bullpen Game Spec.
2. **This repo** — code is truth. Full design spec: `docs/superpowers/specs/2026-06-19-prodgeek-lab-site-design.md`.
3. **Linear** workspace **Prodgeek Lab** (team `b1491d9e-b715-46ed-85f2-f8f4fbcaba93`) — execution/sprints.
   Projects: Website · Bullpen Game · Infra & Autonomy. (Linear = execution truth once writes are enabled.)
4. **Auto-memory** `prodgeek-lab.md` loads automatically — trust but verify against the repo.

## Single source of truth (avoid drift!)
- **Linear = execution** (issues, sprints, status). **Notion = docs** (PRD, decisions, mockups). **Git = code.**
- Do NOT double-track status. If Linear writes aren't yet enabled, the Notion **Tasks** page is the queue.

## Resume checklist
- [ ] Read Notion Changelog + Agent Operating Guide.
- [ ] Check what's `Ready`/`In Progress` (Linear active cycle, or Notion Tasks).
- [ ] `cd ~/prodgeek-site && npm run build` to confirm green before changing things.

## Update protocol — DO THIS as you work and before ending a session
- Append a **Changelog** entry in Notion for what changed (date · what · PR if any).
- Move task/issue **status** in the one source of truth (Linear, else Notion Tasks).
- If a durable fact changed (decision, URL, key), update auto-memory `prodgeek-lab.md`.
- Commit + push code with conventional-commit messages.

## Hard guardrails (never violate)
- **No confidential names** anywhere: APG / Accept-Pay Global / Frame / Frame.xyz / Persona /
  Cashco / ComplyAdvantage / AMCS / Payliance / any real client. CI greps for these.
- **No secrets in the repo** — `.env.example` only. Email (`CONTACT_EMAIL`) is **server env only**, never in client code/HTML.
- Copy rules: **"weeks, not years"** (no fixed month-count); **"invest the build"** (never "free" for the partnership).
- Motion: compositor-friendly props only; always ship a `prefers-reduced-motion` branch.

## Key facts
- Repo: github.com/schuligan/prodgeek-lab (public, `main`). Stack: Astro 5 + React islands + Tailwind v4. Deploy: **Vercel**.
- Tooling available: Vercel, Supabase (v2 game leaderboard only), Git/gh (schuligan). **Stripe: not used.**
- Modular architecture: blocks under `src/components/<feature>/`; the game is isolated in `src/modules/bullpen/`; tokens in `src/styles/global.css`; editable copy in `src/content/*.json`.
- Status: Phase 0 (foundation) shipped & green. Next: Phase 1 section blocks → Phase 2 motion + game.
