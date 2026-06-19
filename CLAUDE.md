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
3. **Linear** workspace **Prodgeek Lab**, team **PRO** (`b1491d9e-b715-46ed-85f2-f8f4fbcaba93`) — **the LIVE execution truth.**
   Projects: Website · Bullpen Game · Infra & Autonomy; issues PRO-5→PRO-30. Writes work — a stale `deny` rule for the
   Linear tools was removed from `~/.claude/settings.json`; if writes ever 403 again, check that deny list first.
4. **Auto-memory** `prodgeek-lab.md` loads automatically — trust but verify against the repo.

## Single source of truth (avoid drift!)
- **Linear = execution** (issues, sprints, status). **Notion = docs** (PRD, decisions, mockups). **Git = code.**
- Do NOT double-track status. **Linear is the live queue** (team PRO, PRO-5→30); the Notion **Tasks** page is frozen/history.
- **CADENCE — never stall on a cycle.** Linear's minimum cycle is 1 week, but a cycle is a *reporting window, not a throttle*. Build continuously; move each issue Todo → In Progress → Done the moment it's ready; NEVER wait for a cycle boundary to ship. Prateek wants near-continuous delivery (he'd run 2-hour "sprints" if Linear allowed).

## Resume checklist
- [ ] Read Notion Changelog + Agent Operating Guide.
- [ ] Check what's `Ready`/`In Progress` in **Linear** (team PRO — the live queue).
- [ ] `cd ~/prodgeek-site && npm run build` to confirm green; `npm run dev` for localhost:4321.
- [ ] After UI changes, **browser-test with Playwright** (navigate → screenshot → read console → inspect DOM). Build-green alone is NOT enough — some bugs only show on screen (a phantom square box hid behind a green build).

## Update protocol — DO THIS as you work and before ending a session
- Build green + (for UI) browser-test before committing.
- Commit + push (conventional commits). **Push auto-deploys to Vercel** AND runs **CI** — confirm CI green via `gh run list`.
- Append a **Changelog** entry in Notion (date · what · commit).
- Move issue **status** in **Linear** (team PRO — the live queue).
- If a durable fact changed (decision, URL, key, gotcha), update auto-memory `prodgeek-lab.md` AND this file.

## Hard guardrails (never violate)
- **No confidential names** anywhere: APG / Accept-Pay Global / Frame / Frame.xyz / Persona /
  Cashco / ComplyAdvantage / AMCS / Payliance / any real client. CI greps for these.
- **No secrets in the repo** — `.env.example` only. Email (`CONTACT_EMAIL`) is **server env only**, never in client code/HTML.
- Copy rules: **"weeks, not years"** (no fixed month-count); **"invest the build"** (never "free" for the partnership).
- Motion: compositor-friendly props only; always ship a `prefers-reduced-motion` branch.

## Key facts
- Repo: github.com/schuligan/prodgeek-lab (public, `main`). Stack: Astro 5 + React islands + Tailwind v4. Deploy: **Vercel**.
- Tooling available: Vercel, Supabase (v2 game leaderboard only), Git/gh (schuligan). **Stripe: not used.**
- Modular architecture: section blocks under `src/components/<feature>/`; the game isolated in `src/modules/bullpen/`; motion helpers in `src/components/motion/` (Reveal, SmoothScroll/Lenis) + `cursor-glow/` + `scroll-tint/`; tokens in `src/styles/global.css`; editable copy in `src/content/*.json`.
- **LIVE: https://prodgeek-lab.vercel.app** — Vercel Git integration, auto-deploys every push to `main`.
- **CI:** `.github/workflows/ci.yml` runs on every push — build + confidential-name grep + secret/email scan. Red = don't trust the deploy.
- **GOTCHA:** avoid CSS class names that collide with Tailwind v4 utilities (`ring`, `container`, `prose`, `grid`, etc.). `class="ring"` silently added a 1px square box-shadow around the ball — invisible to build/typecheck, only caught in-browser.
- **Status (2026-06-19): v1 LIVE.** Done: all sections · scroll-tint · hero aurora + global cursor glow · Bullpen game (charge/aim/3D-arc/fanfare/miss-aww/booking) · motion polish (reveals + Lenis) · Vercel deploy · CI gate. **Remaining:** SEO + security headers (PRO-18), Lighthouse/a11y pass (PRO-19), v2 game leaderboard (PRO-27/28), and Prateek's **booking link** (Cal.com/Google → `site.json` `bookingUrl`).
