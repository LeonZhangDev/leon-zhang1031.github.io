import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  // 国内 OSS 构建时通过 ASTRO_SITE 注入 OSS 默认域名；Vercel 构建不设这个变量，回退到 workers.dev
  site: process.env.ASTRO_SITE || 'https://zk.lz1031.workers.dev',
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
