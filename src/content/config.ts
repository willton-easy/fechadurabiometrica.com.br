import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),
      canonical: z.string().url().optional(),
      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),
      description: z.string().optional(),
      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),
      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const baseSchema = z.object({
  publishDate: z.date().optional(),
  updateDate: z.date().optional(),
  draft: z.boolean().optional(),
  title: z.string(),
  description: z.string().optional(),
  excerpt: z.string().optional(),
  image: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  author: z.string().optional(),
  metadata: metadataDefinition(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  type: z.string().optional(),
  featured: z.boolean().optional(),
  pros: z.array(z.string()).optional(),
  cons: z.array(z.string()).optional(),
  affiliateLink: z.string().optional(),
  priceText: z.string().optional(),
  highlight: z.string().optional(),
  date: z.date().optional()
});

export const collections = {
  post: defineCollection({
    loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/content/reviews' }),
    schema: baseSchema,
  }),
  reviews: defineCollection({
    loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/content/reviews' }),
    schema: baseSchema,
  }),
  comparativos: defineCollection({
    loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/content/comparativos' }),
    schema: baseSchema,
  }),
  guias: defineCollection({
    loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/content/guias' }),
    schema: baseSchema,
  }),
};
