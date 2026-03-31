import { fetchPosts } from '@/actions/posts';

import React from 'react'
import Post from './Post.js';

const PostsList = async () => {
    const { errorMsg, posts } = await fetchPosts();
    if (errorMsg)
        throw new Error();

    return (
        <div>
            {
                posts.map((post, i) => <Post key={post._id} post={post} />)
            }

        </div>
    )
}

export default PostsList