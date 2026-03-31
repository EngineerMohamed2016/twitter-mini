'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const PostHeader = ({ post }) => {
    const { createdBy, _id: postId, createdAt } = post;
    const { displayName, username } = createdBy;

    const [timeAgo, setTimeAgo] = useState('');

    useEffect(() => {
        const calcTime = () => {
            const now = new Date();
            const created = new Date(createdAt);
            const diffInMs = now - created;
            const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

            if (diffInMinutes < 60) setTimeAgo(diffInMinutes + 'm');
            else if (diffInMinutes < 60 * 24) setTimeAgo(Math.floor(diffInMinutes / 60) + 'h');
            else setTimeAgo(Math.floor(diffInMinutes / (60 * 24)) + 'd');
        };

        calcTime();
        const interval = setInterval(calcTime, 60 * 1000);
        return () => clearInterval(interval);
    }, [createdAt]);


    return (
        <div className='flex items-start gap-2 bv'>
            <div className='relative text-white'>
                <Link href={`/${username}`}>
                    <Image src={`/user.png`} className='min-w-10 min-h-10 rounded-full' width={40} height={40} alt='post' />
                    <span className='absolute left-1/2 top-1/2 -translate-1/2 text-xl'>{displayName[0].toUpperCase()}</span>
                </Link>
            </div>
            <Link href={`/${username}`} className='hover:border-b text-white'>{displayName}</Link>
            <div className='text-white/30 flex gap-1'>
                <Link href={`/${username}`}>{username}</Link>
                <Link href={`/${username}/status/${postId}`} className='hover:border-b'>{timeAgo}</Link>
            </div>
        </div>
    )
}

export default PostHeader;