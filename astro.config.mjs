// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Static output. Vercel auto-detects Astro; add @astrojs/vercel only when we need
// serverless functions (Phase 3+ / game leaderboard v2).
// React intentionally absent — no islands today. Re-add @astrojs/react when the
// v2 leaderboard (PRO-27/28) needs an interactive React component.
export default defineConfig({
  site: 'https://prodgeek-lab.vercel.app',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
