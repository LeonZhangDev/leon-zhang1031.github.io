import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const IDS = ['technology-comparison', 'official-source-check', 'cost-estimation'];
export function loadSkills() {
  return IDS.map(id => {
    const source = readFileSync(new URL(`./skills/${id}/SKILL.md`, import.meta.url), 'utf8');
    const match = /^---\nname: ([a-z-]+)\ndescription: ([^\n]+)\nversion: ([\d.]+)\n---\n([\s\S]+)$/.exec(source.replaceAll('\r\n', '\n'));
    if (!match || match[1] !== id) throw new Error('INVALID_TRUSTED_SKILL');
    return { id, description: match[2], version: match[3], body: match[4].trim(), hash: createHash('sha256').update(source).digest('hex').slice(0, 12) };
  });
}
export const skillMetadata = skills => skills.map(({ id, description, version, hash }) => ({ id, description, version, hash }));
export function selectSkills(skills, task) {
  return skills.filter(skill => skill.id !== 'cost-estimation' || /预算|费用|成本|价格|cost|price/i.test(`${task.goal} ${task.constraints}`));
}
