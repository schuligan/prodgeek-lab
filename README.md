# Prodgeek Lab

An AI venture studio site — and an experiment in building & maintaining a product with agents.

> You've got the idea. I've got the build. Let's make it real — together.

**Prodgeek Lab** helps AI-curious builders turn an idea into a live product: invested engineering + infrastructure in exchange for a small stake, with a short free proof sprint up front. The site itself is the proof of craft.

## How this repo is built

This is driven from a **Notion control plane** (intent + status) with this repo as the substrate (the code) and GitHub Actions as the gate. Requirements, acceptance criteria, the build plan, the task queue, and an agent operating guide all live in Notion; agents pick up `Ready` tasks, build to the linked criteria, and open PRs.

- **Design spec:** [`docs/superpowers/specs/2026-06-19-prodgeek-lab-site-design.md`](docs/superpowers/specs/2026-06-19-prodgeek-lab-site-design.md)

## Stack

Astro · React islands · TypeScript · Tailwind · Framer Motion · Lenis · deployed on Vercel. Content lives in editable `/content` files (JSON + MDX) so updates are a copy-paste, not a code change.

## Status

🧪 Early build. Brainstorm and spec complete; foundation (Phase 0) next. See the spec for the full plan.

## License

MIT — see [LICENSE](LICENSE).
