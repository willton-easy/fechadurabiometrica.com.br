import { SITE } from '../config/site';

type ArticleSchemaProps = {
  title: string;
  description: string;
  url: string;
  publishedDate: Date;
  modifiedDate?: Date;
  authorName?: string;
  imageUrl?: string;
};

export const generateArticleSchema = ({
  title,
  description,
  url,
  publishedDate,
  modifiedDate,
  authorName = SITE.author,
  imageUrl,
}: ArticleSchemaProps) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": imageUrl ? [imageUrl] : [],
    "datePublished": publishedDate.toISOString(),
    "dateModified": modifiedDate ? modifiedDate.toISOString() : publishedDate.toISOString(),
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE.url}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };
};

export const generateReviewSchema = (
  articleProps: ArticleSchemaProps,
  itemName: string,
  rating: number = 5,
  pros?: string[],
  cons?: string[]
) => {
  const baseSchema = generateArticleSchema(articleProps);
  return {
    ...baseSchema,
    "@type": "Review",
    "itemReviewed": {
      "@type": "Product",
      "name": itemName
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": rating.toString(),
      "bestRating": "5"
    },
    "positiveNotes": pros ? { "@type": "ItemList", "itemListElement": pros.map((p, i) => ({ "@type": "ListItem", "position": i + 1, "name": p })) } : undefined,
    "negativeNotes": cons ? { "@type": "ItemList", "itemListElement": cons.map((c, i) => ({ "@type": "ListItem", "position": i + 1, "name": c })) } : undefined,
  };
};

export const generateBreadcrumbSchema = (url: string, title: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE.url
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${SITE.url}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": url
      }
    ]
  };
};
