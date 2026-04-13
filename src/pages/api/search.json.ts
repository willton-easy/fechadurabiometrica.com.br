import { fetchPosts } from '~/utils/blog';
import { getPermalink } from '~/utils/permalinks';

export async function GET() {
  const allPosts = await fetchPosts();

  const payload = allPosts
    .filter((post) => !post.draft)
    .map((post) => ({
      slug: getPermalink(post.permalink, 'post'), // Usando a URL estruturada final do site
      title: post.title,
      description: post.description || post.excerpt || '',
      image: post.image || '',
      category: post.category?.title || '',
      type: post.category?.title || 'artigo' 
    }));

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
