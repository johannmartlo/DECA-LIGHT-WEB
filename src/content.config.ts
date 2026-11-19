import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articulos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articulos' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    seo_title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date(),
    keywords: z.array(z.string())
  })
});

export const collections = { articulos };
