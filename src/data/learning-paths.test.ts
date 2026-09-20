import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { learningPaths, readingMinutes } from './learning-paths';

describe('learning paths', () => {
  it('uses unique path ids and existing published lessons', () => {
    expect(new Set(learningPaths.map(path => path.id)).size).toBe(learningPaths.length);
    for (const path of learningPaths) {
      expect(path.slugs.length).toBeGreaterThan(1);
      expect(new Set(path.slugs).size).toBe(path.slugs.length);
      for (const slug of path.slugs) {
        const file = resolve('src/content/posts', `${slug}.md`);
        expect(existsSync(file), `${path.id}: ${slug}`).toBe(true);
        expect(readFileSync(file, 'utf8')).not.toMatch(/^draft:\s*true\s*$/m);
      }
    }
  });
  it('keeps ten deep learning and twenty-seven research lessons', () => {
    expect(learningPaths.find(path => path.id === 'deep-learning')?.slugs).toHaveLength(10);
    expect(learningPaths.filter(path => path.id.startsWith('research-')).flatMap(path => path.slugs)).toHaveLength(27);
  });
  it('estimates mixed prose and ignores fenced code', () => {
    expect(readingMinutes('')).toBe(1);
    expect(readingMinutes('中'.repeat(401))).toBe(2);
    expect(readingMinutes('word '.repeat(201))).toBe(2);
    expect(readingMinutes('```python\n' + 'code '.repeat(2000) + '\n```')).toBe(1);
    expect(readingMinutes('~~~js\n' + 'code '.repeat(2000) + '\n~~~')).toBe(1);
  });
});
