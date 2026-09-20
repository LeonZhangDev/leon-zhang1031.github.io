import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { figures } from './figure-specs.mjs';

const root = resolve(import.meta.dirname, '../..');
const sourceDir = resolve(root, 'src/content/posts');
const outputDir = resolve(root, 'docs/editorial');
mkdirSync(outputDir, { recursive:true });
const unquote = value => (value || '').trim().replace(/^["']|["']$/g, '');
const rows = readdirSync(sourceDir).filter(name => name.endsWith('.md')).sort().map(name => {
  const raw = readFileSync(resolve(sourceDir,name), 'utf8').replace(/^\uFEFF/, '').replace(/\r\n/g,'\n');
  const parsed = raw.match(/^---[^\S\n]*\n([\s\S]*?)\n---[^\S\n]*(?:\n|$)([\s\S]*)$/);
  if (!parsed) throw new Error(`Missing or invalid frontmatter: ${name}`);
  const [, front, body] = parsed;
  let fence = null;
  const proseLines = [];
  const codeLanguages = [];
  for (const line of body.split('\n')) {
    const marker = line.match(/^\s{0,3}(`{3,}|~{3,})(.*)$/);
    if (marker) {
      if (!fence) { fence = marker[1]; codeLanguages.push(marker[2].trim() || 'unspecified'); }
      else if (marker[1][0] === fence[0] && marker[1].length >= fence.length && !marker[2].trim()) fence = null;
      continue;
    }
    if (!fence) proseLines.push(line);
  }
  const prose = proseLines.join('\n');
  const slug = name.slice(0,-3);
  const headings = [...prose.matchAll(/^#{1,3} (.+)$/gm)].map(match=>match[1]);
  const images = [...prose.matchAll(/!\[([^\]]*)\]\(([^\s)]+)(?:\s+[^)]*)?\)/g)].map(match=>({alt:match[1],path:match[2]}));
  const links = [...prose.matchAll(/\]\((\/posts\/[^)#\s]+)(?:#[^)]*)?\)/g)].map(match=>match[1]);
  const claims = proseLines.filter(line => /\d+(?:\.\d+)?\s*(?:%|ms|毫秒|倍)|线上|上线|最[佳快好]|无需密钥|礼貌池/.test(line)).map(line=>line.trim()).filter(Boolean);
  const kind = /research-|deep-learning-/.test(slug) ? 'course' : /devlog|retrospective|reflections|dev-notes/.test(slug) ? 'retrospective' : /comparison/.test(slug) ? 'comparison' : 'tutorial';
  const checks = [];
  if (!images.length) checks.push('判断是否需要结构图或真实结果图；不按数量强制插图');
  if (codeLanguages.length) checks.push('逐块标注完整示例/增量片段/伪代码，核对依赖与运行入口');
  if (claims.length) checks.push('人工核验下列候选断言；关键词命中不代表结论错误');
  if (/research-/.test(slug)) checks.push('核对与前后课的输入、输出、数据版本及验收契约');
  if (/vllm|llm|rag|agent|deployment|publish|api/.test(slug)) checks.push('按官方来源复查版本、服务限制和配置，记录核验日期');
  if (kind === 'retrospective') checks.push('历史版本、截图、实验日志需关联可追溯证据');
  return {
    slug, title:unquote(front.match(/^title:\s*(.*)$/m)?.[1]), kind,
    description:unquote(front.match(/^description:\s*(.*)$/m)?.[1]),
    headings, codeBlocks:codeLanguages.length, codeLanguages:[...new Set(codeLanguages)], images,
    localLinks:[...new Set(links)], candidateClaims:claims.slice(0,10),
    priority:figures.some(figure=>figure.slug===slug)?'P0':claims.length>3?'P1':'P2',
    scopedVerification: front.includes('\nverification:') ? {
      status:unquote(front.match(/^  status:\s*(.*)$/m)?.[1]),
      scope:unquote(front.match(/^  scope:\s*(.*)$/m)?.[1]),
    } : null,
    reviewStatus:'structural-inventory-complete; full-technical-review-pending',
    explanatoryFigureAdded:figures.some(figure=>figure.slug===slug),
    nextChecks:checks,
  };
});
const knownSlugs=new Set(rows.map(row=>row.slug));
const failures=[];
for(const row of rows) {
  for(const image of row.images) {
    if (!image.alt.trim()) failures.push(`${row.slug}: empty image alt`);
    if (image.path.startsWith('/') && !existsSync(resolve(root,'public',image.path.slice(1)))) failures.push(`${row.slug}: missing ${image.path}`);
  }
  for(const link of row.localLinks) {
    const target=link.replace(/^\/posts\//,'').replace(/\/$/,'');
    if(target !== 'learning-paths' && target && !knownSlugs.has(target)) failures.push(`${row.slug}: missing ${link}`);
  }
}
const report={ schemaVersion:1, scope:'Source inventory, not independent experiment reproduction', posts:rows.length, postsWithImages:rows.filter(row=>row.images.length).length, imageReferences:rows.reduce((n,row)=>n+row.images.length,0), failures, articles:rows };
const json=JSON.stringify(report,null,2)+'\n';
const table=rows.map(row=>`| [${row.slug}](../../src/content/posts/${row.slug}.md) | ${row.priority} | ${row.kind} | ${row.codeBlocks} | ${row.images.length} | ${row.explanatoryFigureAdded?'已补图解；全篇待审':'全篇待审'} |`).join('\n');
const cards=rows.map(row=>`### ${row.title}\n\n- 文件：\`${row.slug}\`\n- 本文目标（取自摘要，待编辑复核）：${row.description}\n- 前几节：${row.headings.slice(0,5).join(' → ')}\n- 下一步：${row.nextChecks.join('；')}。\n- 候选证据核验点：\n${row.candidateClaims.length?row.candidateClaims.slice(0,4).map(line=>`  - ${line.replace(/\|/g,' / ').slice(0,350)}`).join('\n'):'  - 自动扫描未命中；不等于已完成事实核验。'}\n`).join('\n');
const markdown=`# 全站博客编辑台账\n\n由 \`node scripts/blog/audit-content.mjs\` 生成。覆盖 ${rows.length} 篇文章。\n\n自动盘点仅用于安排人工审读，不能证明代码已运行、断言已核验或文章已完整重写。逐篇实验状态以有范围说明的验证记录为准。\n\n| 文章 | 优先级 | 类型初分 | 代码块 | 图引用 | 状态 |\n| --- | --- | --- | ---: | ---: | --- |\n${table}\n\n## 逐篇编辑卡\n\n${cards}`;
const cleanMarkdown = markdown.replace(/[ \t]+$/gm, '');
if(process.argv.includes('--check')) {
  for(const [name,data] of [['content-ledger.json',json],['content-ledger.md',cleanMarkdown]]) {
    if(!existsSync(resolve(outputDir,name)) || readFileSync(resolve(outputDir,name),'utf8')!==data) failures.push(`Stale ${name}: run audit-content.mjs`);
  }
} else {
  writeFileSync(resolve(outputDir,'content-ledger.json'),json);
  writeFileSync(resolve(outputDir,'content-ledger.md'),cleanMarkdown);
}
console.log(JSON.stringify({posts:report.posts,postsWithImages:report.postsWithImages,imageReferences:report.imageReferences,failures},null,2));
if(failures.length) process.exitCode=1;
