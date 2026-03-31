import { fetchUserLikes } from '@/actions/posts';
import Post from '@/components/posts/Post.js';
import { notFound } from 'next/navigation';

const Page = async ({ params }) => {
  const { username } = await params;
  const { success, posts } = await fetchUserLikes(username);

  if (!success) return notFound();

  return (
    <div>
      {posts.map((post) => <Post key={post._id} post={post} />)}
    </div>
  )
}

export default Page