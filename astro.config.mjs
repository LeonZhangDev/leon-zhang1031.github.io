import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://zk.lz1031.workers.dev',
  output: 'static',
  adapter: vercel(),
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { strict: 'ignore' }]],
  },
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !new URL(page).pathname.startsWith('/jing/'),
    }),
  ],
});
