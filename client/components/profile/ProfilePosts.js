import { fetchUserPosts } from '@/actions/posts'
import React from 'react'
import Post from '../posts/Post.js';
import { notFound } from 'next/navigation.js';

const ProfilePosts = async ({ username }) => {
    const { success, posts } = await fetchUserPosts(username);
    
    if (!success) return notFound();

    return (
        <>
            {
                posts.map((post) => <Post key={post._id} post={post} />)
            }
        </>
    )
}

export default ProfilePosts