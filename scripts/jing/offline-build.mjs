import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
const marker = 'const OFFLINE_BUILD = null;';
async function filesUnder(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesUnder(path));
    else files.push(path);
  }
  return files;
}

/** Only public Jing assets and their exact Vite dependency graph enter the cache. */
export async function buildOfflineWorker(directory, chunks) {
  const root = resolve(directory);
  const worker = await readFile(join(root, 'jing/service-worker.js'), 'utf8');
  if (!worker.includes(marker)) throw new Error('Jing offline build marker is missing');
  const queue = [];
  const visited = new Set();
  const entries = [];
  const add = (reference, from = '/jing/') => {
    if (reference.includes('${') || reference.startsWith('data:')) return;
    const url = new URL(reference, `https://jing.invalid${from}`);
    if (url.origin !== 'https://jing.invalid' || url.search
      || !/^\/(jing|_astro)\//.test(url.pathname)) return;
    url.hash = '';
    if (!visited.has(url.pathname)) { visited.add(url.pathname); queue.push(url.pathname); }
  };
  for (const file of await filesUnder(join(root, 'jing'))) {
    const path = '/' + file.slice(root.length + 1).split(sep).join('/');
    if (path.endsWith('/index.html')) add(path.slice(0, -10));
    // Runtime-generated URLs cannot all be discovered from literal references.
    if (/^\/jing\/audio\/[^/]+\.(mp3|wav|ogg)$/.test(path)
      || /^\/jing\/generated\/lot\/frames-safe\/(guanyin|luzu|guandi)\/frame-\d+\.webp$/.test(path)
      || /^\/jing\/generated\/lot\/selected-sticks\/[^/]+\.png$/.test(path)) add(path);
  }
  add('/jing/favicon.svg');
  add('/jing/jingxin-hall.webmanifest');
  for (let index = 0; index < queue.length; index++) {
    const url = queue[index];
    const file = resolve(root, '.' + url, url.endsWith('/') ? 'index.html' : '');
    if (!file.startsWith(root + sep)) throw new Error(`Invalid offline path: ${url}`);
    const bytes = await readFile(file);
    entries.push({ url, revision: digest(bytes), bytes: bytes.length });
    const extension = extname(file);
    if (['.html', '.css', '.js', '.webmanifest'].includes(extension)) {
      const source = bytes.toString('utf8');
      // Local literal image/audio paths also cover figures selected after entry.
      for (const match of source.matchAll(/["'`](\/jing\/[^"'`\s<>]+)["'`]/g)) {
        if (extname(match[1]) && !match[1].endsWith('/service-worker.js')) add(match[1], url);
      }
      if (extension === '.html') {
        for (const match of source.matchAll(/\bsrcset=["']([^"']+)["']/g)) {
          for (const candidate of match[1].split(',')) {
            const reference = candidate.trim().split(/\s+/)[0];
            if (/\.(?:png|webp|avif|jpe?g|svg)$/.test(reference)) add(reference, url);
          }
        }
        for (const match of source.matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
          if (/\.(?:js|css|png|webp|svg|woff2?|webmanifest)(?:[?#]|$)/.test(match[1])) add(match[1], url);
        }
      }
      if (extension === '.css') {
        for (const match of source.matchAll(/url\(\s*["']?([^"')\s]+)["']?\s*\)/g)) {
          // Ignore SVG filter fragment URLs nested inside data-URI SVGs.
          if (/\.(?:png|jpe?g|webp|avif|gif|svg|woff2?|ttf|otf|eot)(?:[?#]|$)/.test(match[1])) add(match[1], url);
        }
      }
    }
    const chunk = chunks.get(url.slice(1));
    if (chunk) for (const reference of [...chunk.imports, ...chunk.dynamicImports,
      ...(chunk.referencedFiles ?? []), ...(chunk.viteMetadata?.importedCss ?? [])]) {
      add('/' + reference);
    }
  }
  entries.sort((a, b) => a.url.localeCompare(b.url));
  const version = digest(worker + JSON.stringify(entries)).slice(0, 20);
  const manifest = { version, entries };
  await writeFile(join(root, 'jing/service-worker.js'), worker.replace(marker, `const OFFLINE_BUILD = ${JSON.stringify(manifest)};`));
  return { version, files: entries.length, bytes: entries.reduce((sum, entry) => sum + entry.bytes, 0) };
}

export default function jingOffline() {
  const chunks = new Map();
  return {
    name: 'jing-offline',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => updateConfig({ vite: { plugins: [{
        name: 'jing-offline-chunks',
        generateBundle(_options, bundle) {
          for (const item of Object.values(bundle)) if (item.type === 'chunk') chunks.set(item.fileName, item);
        },
      }] } }),
      'astro:build:done': async ({ dir, logger }) => {
        const result = await buildOfflineWorker(fileURLToPath(dir), chunks);
        logger.info(`Jing offline: ${result.files} files, ${result.bytes} bytes, version ${result.version}`);
      },
    },
  };
}
