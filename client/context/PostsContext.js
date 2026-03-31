'use client';
import { addLike, removeLike } from '@/actions/posts';
import { displayError } from '@/utils/displayError';
import { createContext, useContext, useState, ReactNode } from 'react';

const PostsContext = createContext(null);

export const PostsProvider = ({ children, initialPosts }) => {
    const [postsMap, setPostsMap] = useState(
        Object.fromEntries(initialPosts.map(post => [post._id, post]))
    );

    const updatePost = (post) => {
        setPostsMap(prev => ({ ...prev, [post._id]: post }));        
    }

    const toggleLike = async (postId) => {
        const post = postsMap[postId];
        let res;
        if (!post || !post.likedByMe)
            res = await addLike(postId);
        else
            res = await removeLike(postId);


        const { post: updatedPost, success, errorMsg } = res;
        if (!success) return displayError(errorMsg, 'toggle like')
        updatePost(updatedPost);
    };


    return (
        <PostsContext.Provider value={{ postsMap, toggleLike, updatePost, setPostsMap }}>
            {children}
        </PostsContext.Provider>
    );
};

export const usePosts = () => useContext(PostsContext);