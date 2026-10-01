import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    author: z.string().default('Zack-Zhang1031'),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    math: z.boolean().optional(),
    updated: z.coerce.date().optional(),
    level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    prerequisites: z.array(z.string()).default([]),
    verification: z.object({
      status: z.enum(['not-run', 'example-tested', 'reproduced', 'source-checked']),
      scope: z.string(),
      checkedAt: z.coerce.date().optional(),
    }).optional(),
  }),
});

export const collections = { posts };
