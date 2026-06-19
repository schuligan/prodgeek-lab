# Prodgeek Lab — Website Design Spec

**Date:** 2026-06-19
**Status:** Approved for planning
**Owner:** Prateek Jha

---

## 1. Overview

A single-page (plus thin sub-routes) marketing site for **Prodgeek Lab** — a solo, AI-first
**venture studio**. The site's job is to make an AI-curious visitor think *"I want to build
my idea with this person"* and book a free call. The site doubles as proof-of-skill: its own
craft and motion are the portfolio piece.

Two things this site must do at once:
1. **Inspire + convert** AI-curious peers and younger builders into a free intro conversation.
2. **Be a wow-demo** — the visual craft itself is the evidence that Prateek can ship.

## 2. Audience

Primary: **AI-curious peers and younger builders** — people with an idea (a side-project, a
"wouldn't it be cool if…", an early startup) and no technical partner to make it real. They
feel *"I could never actually build that."* Not enterprise buyers, not established companies.

What they're short of is **not code** (AI tools increasingly give them that) — it's a
**committed partner with judgment who ships and stays**.

## 3. Positioning & Offer

**One-liner:** *"You've got the idea. I've got the build. Let's make it real — together."*

**Model:** AI venture studio. Prateek invests engineering + infrastructure (not cash) to take
a founder's idea to a live product, in exchange for a small equity stake. Selective — "a few
bets at a time."

**The offer mechanics (load-bearing — derived from research, see §11):**
- **Sell the last 30%, not the 100%.** AI gets a founder ~70% (a clickable demo). Prodgeek Lab
  builds the brutal last 30% — auth, payments, scale, finishing, product judgment — and ships it.
- **Outcome-framed, not calendar-framed.** Commitment is *"until it's live and in real users'
  hands — weeks, not years,"* never a fixed month-count (a deadline you can miss is a liability).
- **"I invest my build instead of cash"** — never the word "free" for the partnership itself
  (free cheapens it and attracts the wrong crowd; "invest" signals founder behavior).
- **Commitment-led.** Wedge: *"65% of startups die from cofounder fallout — I'm the opposite of
  a dev shop that ghosts; small stake, same boat."*
- **Free on-ramp = a short proof sprint, NOT the whole build.** ~2 weeks, free, no strings:
  build *a working slice together* (a taste, not the full 30%). This is the trial. Partnership
  terms are agreed **up front**, with the sprint acting as a **vesting cliff** — either side
  can walk clean before anything locks. (Avoids giving away the crown jewels and negotiating
  equity from weakness.)

**Funnel:** one CTA — *"Pitch me your idea"* (free call). The booking form asks one soft
question — *"what brings you here?"* (Learning / Build my idea / Work together) — so Prateek
knows which fork each caller is: audience, paid-later, or collaborator.

## 4. Brand

- **Name / wordmark:** `Prodgeek·Lab` (chosen for Chaldean numerology total 6).
- **Voice:** warm, candid, peer-to-peer. Confident but never corporate. Plain-spoken.
- **Credibility:** worn quietly. The decade of enterprise + MBA/PMP appears only in **About**,
  reframed as *"I've shipped real things, and I'll ship yours"* — NOT as a hero résumé strip.
- **Tagline options:** "Let's build something — together." / "AI venture studio, Toronto."

## 5. Visual Direction — "Dark Atelier + Scroll-Tint"

- **Base:** near-black canvas (`#0b0d14`), warm-cool depth via radial gradients, fine film grain
  (~5% SVG noise overlay). High-end AI-lab feel; warm copy keeps it human.
- **Accent:** electric **mint → indigo** gradient (`#7fe7d6` → `#6c8cff`) for CTAs, links, emphasis.
- **Type:** Inter (or similar grotesque) for everything; tight negative tracking on display sizes;
  gradient-clip on key headline words. Max two families.
- **Signature motion — Scroll-Tint:** a single fixed overlay layer whose color morphs as each
  section enters view — "every section through a different colored glass." Section palette:
  Hero = indigo/mint · Why-me = teal · How-it-works = violet · About = amber · Pitch = rose.
  - Implementation: one fixed `.glass` element, `mix-blend-mode: screen`, color driven by a CSS
    custom property with a ~900ms `cubic-bezier(.16,1,.3,1)` transition. An **IntersectionObserver**
    swaps the variable per section. GPU-only (color/opacity), no scroll-handler churn.
  - **Intensity is a single tunable token** so it can be dialed after launch.
- **Other motion:** word-by-word headline reveal on load; on-scroll reveals (fade+rise) for cards;
  magnetic CTA that leans toward the cursor; springy hover lifts on the deal/why-me cards.
- **Accessibility:** `prefers-reduced-motion` branch snaps colors instantly (no fades), disables
  magnetic/parallax. Scroll-tint never reduces text contrast below WCAG AA (verify each section).

## 6. Information Architecture (v1)

Single long landing page with anchor nav; `/thanks` confirmation route; legal stub if needed.

1. **Hero** — wordmark + anchor nav + "Pitch me" CTA; headline "Let's build something — together.";
   sub = the offer (70/30, invest-the-build, weeks-not-years, partner-not-dev-shop); primary CTA
   "Pitch me your idea", secondary "Why me, not just AI tools? ↓". Below: **the 3-step deal**
   (01 Pitch → 02 We get it live → 03 We share a small stake / proof-sprint + cliff).
2. **Why me, when Cursor & Lovable exist?** — disarm-then-pitch. Three columns:
   *AI gives you the first 70%* → *where they stop (the brutal 30%)* → *what I bring (finish line
   + a partner)*. Closes on the 65%-cofounder-fallout commitment line.
3. **Sound like you?** — mirror block: "Notion full of ideas, no one technical… you think 'I could
   never make that'… you just want the thing to exist." Closes "Then let's build it together —
   first conversation's on me."
4. **About** — the builder/fixer story; experience reframed as shipping credibility; creative side
   (@Beatoid) mentioned lightly; the "why" (tech should be everyone's).
5. **Pitch me** — Calendly embed/placeholder + the soft "what brings you here?" question; email
   fallback (`masters.prateek@gmail.com`).
6. **Footer** — GitHub (schuligan), LinkedIn (prateekjha6), YouTube (@Beatoid), copyright.

**Explicitly CUT from v1:** the "Built so far" / portfolio section AND the build-time GitHub
repo auto-pull — deferred until there are credible shipped builds to show. (Re-add later via the
content layer; the architecture should leave a clean seam for it.)

## 7. Content Model (edit-to-update)

All copy and structured data live in editable files so non-code updates are trivial:
- `/content/site.json` — brand, nav, socials, CTA labels, Calendly URL, contact email.
- `/content/offer.json` — the 3 deal steps, the 70/30/me columns, mirror-block bullets.
- `/content/about.mdx` — the About narrative.
- (Future) `/content/projects.json`, `/content/casestudies/*.mdx`, `/content/notes/*.mdx` —
  seams left for portfolio + blog when ready.

A `CONTENT-GUIDE.md` documents: "to change the offer, edit offer.json; to edit your story, edit
about.mdx; to set your Calendly link, edit site.json." Target: 2-minute copy-paste edits.

## 8. Tech Stack

- **Astro + React islands + TypeScript + Tailwind CSS.** Static output; React hydrates only the
  interactive islands (scroll-tint controller, magnetic CTA, booking form).
- **Motion:** Framer Motion (reveals, magnetic CTA) + Lenis (smooth scroll). GSAP/ScrollTrigger
  only if a specific effect needs it. Dynamic-import heavy motion libs.
- **Icons:** lucide. **Components:** shadcn/ui where it saves time; restyle to avoid template look.
- **Booking:** Calendly (link/inline-widget placeholder; real URL pasted into `site.json`).
- **Deploy:** **Vercel** (static/SSG). Document custom-domain attach for a future Prodgeek domain.

## 9. Quality Bars

- **Performance:** Lighthouse ≥ 95; landing JS < 150kb gz, CSS < 30kb; images with explicit
  dimensions; hero font preloaded, `font-display: swap`; no CLS from motion.
- **Accessibility:** WCAG AA; semantic HTML (`header`/`main`/`section`/`footer`); keyboard nav;
  visible focus; reduced-motion honored; contrast verified per scroll-tint section.
- **SEO:** title/description/OpenGraph, sitemap, robots, canonical.
- **Security:** no secrets in repo (`.env.example` only); production CSP; standard security headers;
  form spam protection (honeypot); sanitize any dynamic values.

## 10. Out of Scope (v1)

Portfolio/case studies, GitHub auto-pull, blog/notes, testimonials, multi-page content,
newsletter signup, analytics dashboards. All have content-layer seams for later.

## 11. Research Basis (why the offer is shaped this way)

- Solo no-capital build-for-equity has structural traps: adverse selection (free attracts low
  commitment; equity repels it), capacity ceiling / signal-noise, near-worthless + heavy equity
  in pre-idea projects, and "build only" leaves a post-launch capital gap.
  *(Venture Studio Forum — Fatal Flaws of the Venture Studio Model.)*
- AI/no-code tools take founders to ~70% (clickable demo, fast) but stop at auth/payments/scale/
  finishing and "what to build" — the scarce, defensible 30%. *(Asyncdot; Questera.)*
- 65% of startups fail from cofounder conflict → a committed, stake-aligned partner is the wedge.
  *(Agency-equity analyses.)*
- Equity best practice = vesting with a 6–12mo cliff that functions as a trial; outcome/milestone
  framing beats fixed timelines. *(Sweat-equity & vesting guides.)* → drives the proof-sprint-as-cliff.
- Early credibility = evidence over claims, transparency, design partners, show method — not fake
  logos. *(Credibility-without-track-record guides.)* → drives cutting the proof section rather
  than faking it, and the candid voice.

## 12. Open Items (need Prateek's input before/at build)

- Calendly URL (placeholder until provided).
- Exact equity-stake range to state publicly, if any (or keep "small stake, discussed on the call").
- About narrative specifics (final wording of the personal story).
- Confirm contact email shown publicly (`masters.prateek@gmail.com`).
