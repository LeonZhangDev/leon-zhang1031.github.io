import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { figures } from './figure-specs.mjs';

const root = resolve(import.meta.dirname, '../..');
const output = resolve(root, 'public/images/blog');
mkdirSync(output, { recursive: true });
const escape = value => value.replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&apos;' })[c]);
for (const figure of figures) {
  const boxes = figure.steps.map(([title, detail], index) => {
    const y = 108 + index * 110;
    return `<rect x="32" y="${y}" width="696" height="82" rx="12" fill="#ffffff" stroke="#ccd4e2"/><text x="56" y="${y + 31}" fill="#152339" font-size="23" font-weight="700">${index+1}. ${escape(title)}</text><text x="56" y="${y+62}" fill="#384b68" font-size="20">${escape(detail)}</text>${index<figure.steps.length-1 ? `<path d="M380 ${y+84}v22m-6-6 6 6 6-6" fill="none" stroke="#b45309" stroke-width="3"/>` : ''}`;
  }).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 592" width="760" height="592" role="img" aria-labelledby="title desc"><title id="title">${escape(figure.title)}</title><desc id="desc">${escape(figure.caption)}</desc><rect width="760" height="592" rx="16" fill="#f4f6fa"/><g font-family="Microsoft YaHei, Noto Sans SC, sans-serif"><text x="32" y="48" font-size="27" font-weight="700" fill="#152339">${escape(figure.title)}</text><text x="32" y="79" font-size="17" fill="#54657d">张坤 · 技术图解 / 概念示意</text>${boxes}<text x="32" y="571" font-size="16" fill="#54657d">原始图源：scripts/blog/figure-specs.mjs · 可点击查看原尺寸</text></g></svg>`;
  writeFileSync(resolve(output, `${figure.slug}.svg`), svg + '\n');
  if (process.argv.includes('--insert')) {
    const path = resolve(root, 'src/content/posts', `${figure.slug}.md`);
    let source = readFileSync(path, 'utf8');
    if (source.includes(`<!-- figure:${figure.slug} -->`)) continue;
    if (!source.includes(figure.anchor)) throw new Error(`Missing anchor: ${figure.slug}: ${figure.anchor}`);
    const block = `<!-- figure:${figure.slug} -->\n\n![${figure.title}](/images/blog/${figure.slug}.svg)\n\n*图解：${figure.caption}*\n\n${figure.text}\n\n**动手核对：** ${figure.exercise}\n\n`;
    source = source.replace(figure.anchor, block + figure.anchor);
    writeFileSync(path, source);
  }
}
console.log(`Built ${figures.length} original explanatory SVGs.`);
