// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// Pages stay prerendered (static); only routes that opt out via
// `export const prerender = false` (e.g. /api/score) run as Vercel serverless
// functions — added in PRO-28 for the cloud leaderboard. React still absent.
export default defineConfig({
  site: 'https://prodgeek-lab.vercel.app',
  output: 'static',
  adapter: vercel(),
  // No Astro <Image> usage anywhere (og-image is a static public PNG), so skip
  // the sharp-based image service the adapter would otherwise require.
  image: { service: { entrypoint: 'astro/assets/services/noop' } },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
