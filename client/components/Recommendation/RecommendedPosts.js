import { getRecommendedPosts } from '@/actions/posts'
import React from 'react'
import RecommendedPost from './RecommendedPost';

const RecommendedPosts = async () => {
    const { success, posts } = await getRecommendedPosts();
    console.log(posts,4);
    
    return (
        <div>
            <p className='text-xl mb-4 font-semibold'>What's happening?</p>
            {
                posts.map((post) => <RecommendedPost key={post._id} post={post} />)
            }
        </div>
    )
}

export default RecommendedPosts