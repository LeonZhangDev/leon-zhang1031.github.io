import { learningPaths } from './learning-paths';

export const agentCourseOverview = 'agent-learning-route';
export const agentCourseStages = [
  { title: '基础与核心能力', first: 1, last: 7 },
  { title: 'RAG、路由与协作', first: 8, last: 11 },
  { title: '框架与动手实现', first: 12, last: 14 },
  { title: '质量、部署与模型优化', first: 15, last: 18 },
  { title: '进阶工具与架构', first: 19, last: 22 },
  { title: '综合案例与知识自测', first: 23, last: 24 },
];

type Post = { id: string; data: { date: Date } };

/** Reuse the published curriculum order for the feed and chapter navigation. */
export function getAgentCourse<T extends Post>(posts: T[]): T[] {
  const course = learningPaths.find(path => path.id === 'agent-learning');
  if (!course) return [];
  const byId = new Map(posts.map(post => [post.id, post]));
  return [agentCourseOverview, ...course.slugs]
    .map(id => byId.get(id)).filter((post): post is T => post !== undefined);
}

/** Keep the course together, followed by the existing dated article feed. */
export function orderPostsForReading<T extends Post>(posts: T[]): T[] {
  const course = getAgentCourse(posts);
  const courseIds = new Set(course.map(post => post.id));
  return [...course, ...posts.filter(post => !courseIds.has(post.id))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())];
}
