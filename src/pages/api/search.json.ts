import { getCollection } from 'astro:content';

export async function GET() {
  const guias = await getCollection('guias');
  const reviews = await getCollection('reviews');
  const comparativos = await getCollection('comparativos');

  const allPosts = [...guias, ...reviews, ...comparativos];

  const payload = allPosts
    .filter((post) => !post.data.draft)
    .map((post) => ({
      slug: post.slug,
      title: post.data.title,
      description: post.data.description || post.data.excerpt || '',
      image: post.data.image || '',
      category: post.data.category || '',
      type: post.collection // 'guias', 'reviews' ou 'comparativos'
    }));

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
