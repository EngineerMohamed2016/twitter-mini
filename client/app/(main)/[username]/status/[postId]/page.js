import { fetchPost } from '@/actions/posts';
import Post from '@/components/posts/Post.js';
import PostComposer from '@/components/posts/PostComposer';
import PostPageHeader from '@/components/posts/PostPageHeader';
import React from 'react'
import Replies from '@/components/profile/Replies';

const Page = async ({ params }) => { 
    const { postId } = await params;
    const { success, post } = await fetchPost(postId);
  

    return (
        <section className='text-white'>
            <PostPageHeader/>

            <Post post={post} />

            <div className='px-4'>
                <PostComposer />
            </div>
            <div className='mx-6'>
                <Replies post={post} />
            </div>
        </section>
    )
}

export default Page