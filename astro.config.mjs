// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Static output. Vercel auto-detects Astro; add @astrojs/vercel only when we need
// serverless functions (Phase 3+ / game leaderboard v2).
export default defineConfig({
  site: 'https://prodgeek-lab.vercel.app',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
