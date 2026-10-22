import { describe, expect, it } from 'vitest';
import { agentCourseStages, getAgentCourse, orderPostsForReading } from './agent-course-navigation';
import { learningPaths } from './learning-paths';

const makePost = (id: string, date = '2026-10-22') => ({ id, data: { date: new Date(date) } });

describe('published Agent course navigation', () => {
  it('uses overview then chapters 01–24 consistently without mutating the input', () => {
    const slugs = learningPaths.find(path => path.id === 'agent-learning')!.slugs;
    expect(slugs).toHaveLength(24);
    const expected = ['agent-learning-route', ...slugs];
    const input = [makePost('older', '2026-09-01'), ...expected.toReversed().map(id => makePost(id)), makePost('newer', '2026-10-23')];
    const original = input.map(post => post.id);
    expect(getAgentCourse(input).map(post => post.id)).toEqual(expected);
    expect(orderPostsForReading(input).map(post => post.id)).toEqual([...expected, 'newer', 'older']);
    expect(input.map(post => post.id)).toEqual(original);
    expect(agentCourseStages.flatMap(stage => slugs.slice(stage.first - 1, stage.last))).toEqual(slugs);
  });

  it('preserves date ordering for collections with no course articles', () => {
    const input = [makePost('older', '2026-09-01'), makePost('newer', '2026-10-23')];
    expect(getAgentCourse(input)).toEqual([]);
    expect(orderPostsForReading(input).map(post => post.id)).toEqual(['newer', 'older']);
  });
});
