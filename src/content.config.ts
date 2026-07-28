import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const loader = (name: string) => glob({ pattern: '**/*.md', base: `./src/content/${name}` });

const experiences = defineCollection({
  loader: loader('experiences'),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    duration: z.string(),
    details: z.array(z.string()).default([]),
    photos: z.array(z.string()).default([]),
  }),
});

const projects = defineCollection({
  loader: loader('projects'),
  schema: z.object({
    title: z.string(),
    tech: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    link: z.string().default('#'),
    photos: z.array(z.string()).default([]),
  }),
});

const updates = defineCollection({
  loader: loader('updates'),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    photos: z.array(z.string()).default([]),
  }),
});

const certificates = defineCollection({
  loader: loader('certificates'),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    issuer: z.string(),
    description: z.string(),
    link: z.string().default('#'),
  }),
});

const achievements = defineCollection({
  loader: loader('achievements'),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    issuer: z.string(),
    description: z.string(),
  }),
});

const articles = defineCollection({
  loader: loader('articles'),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.string(),
    summary: z.string(),
    image: z.string().optional(),
  }),
});

export const collections = { experiences, projects, updates, certificates, achievements, articles };
