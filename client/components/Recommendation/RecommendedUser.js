'use client'
import useFollow from '@/hooks/useFollow';
import React from 'react'

const RecommendedUser = ({ user }) => {
    const { followedByMe, username } = user;
    const { handleFollow, handleUnfollow } = useFollow(username);
    return (
        <>
            {
                followedByMe ?
                    <>
                        <button className='duration-100 bg-black text-white border border-white/30 text-lg rounded-3xl px-4 py-1 cursor-pointer'>Following</button>
                        <button onClick={handleUnfollow} className='duration-100 absolute left-0 top-0 w-full invisible group-hover:visible bg-black text-red-600 border border-red-600/30 text-lg rounded-3xl px-4 py-1 cursor-pointer'>UnFollow</button>
                    </>
                    :
                    <button onClick={handleFollow} className='duration-100 bg-white text-black text-lg rounded-3xl px-4 py-1 cursor-pointer'>Follow</button>
            }
        </>
    )
}

export default RecommendedUser