'use client'
import React, { useEffect } from 'react'
import { FaBookmark, FaHeart, FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { usePosts } from '@/context/PostsContext';
import { useBookmarks } from '@/context/BookmarksContext';

const PostButtons = ({ post }) => {
    const { postsMap, toggleLike, updatePost } = usePosts();
    const { bookmarksMap, toggleBookmark } = useBookmarks();
    const router = useRouter();

    const { _id } = post;
    const currentPost = postsMap[_id] || post;

    useEffect(() => {
        updatePost(post);
    }, [post, updatePost]);

    const handleComment = () => {
        sessionStorage.setItem('post', JSON.stringify({ post, type: 'reply' }));
        router.push('/compose/post');
    }

    return (
        <div className='flex gap-30 text-lg'>
            <button onClick={handleComment} className='w-8 h-8 flex gap-2 justify-center items-center cursor-pointer rounded-full hover:bg-green-500/20 duration-300'>
                <FaRegComment />
                <p className='text-sm'>{currentPost.commentsCount || 0}</p>
            </button>

            <button
                onClick={() => toggleLike(_id)}
                className={`w-8 h-8 flex gap-2 justify-center items-center cursor-pointer rounded-full ${currentPost.likedByMe ? 'text-red-600 hover:bg-red-500/20' : 'hover:bg-red-500/20'}`}
            >
                {currentPost.likedByMe ? <FaHeart /> : <FaRegHeart />}
                <p className='text-sm text-white'>{currentPost.likesCount || 0}</p>
            </button>

            <button
                onClick={() => toggleBookmark(_id)}
                className='w-8 h-8 flex justify-center items-center cursor-pointer rounded-full hover:bg-white/20 duration-300'
            >
                {bookmarksMap[_id]?.isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
            </button>
        </div>
    )
}

export default PostButtons;
