import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    updated: z.date().optional(),
    type: z.enum(['review', 'comparativo', 'guia', 'informativo']),
    featured: z.boolean().default(false).optional(),
    draft: z.boolean().default(false).optional(),
    tags: z.array(z.string()).optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    
    // Campos específicos para 'review' ou 'comparativo'
    pros: z.array(z.string()).optional(),
    cons: z.array(z.string()).optional(),
    affiliateLink: z.string().url().optional(),
    priceText: z.string().optional(),
    highlight: z.string().optional()
  })
});

export const collections = {
  blog: blogCollection,
};
