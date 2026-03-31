import React from 'react'
import { fetchPostReplies } from '@/actions/posts'
import { notFound } from 'next/navigation';
import Post from '../posts/Post.js.js';

const Replies = async ({ post }) => {
    const { _id: postId } = post;
    const { success, replies } = await fetchPostReplies(postId);
    if (!success)
        return notFound();
    return (
          <section className=''>
            {
                replies.map((reply) => <Post key={reply._id} post={reply} />)
            }
        </section>
    )
}

export default Replies