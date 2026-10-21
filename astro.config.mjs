import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  // 正式站点域名：EdgeOne Pages 托管的 leonzk.cn
  // sitemap / RSS / canonical 全部由这里推导；如需临时覆盖可用 ASTRO_SITE 环境变量
  site: process.env.ASTRO_SITE || 'https://leonzk.cn',
  output: 'static',
  compressHTML: true,
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, { strict: 'ignore' }]],
    }),
  },
  vite: { plugins: [tailwind()] },
  integrations: [
    sitemap({
      filter: (page) => !new URL(page).pathname.startsWith('/jing/'),
    }),
  ],
});
