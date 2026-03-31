'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const PostLinkOverlay = ({ post }) => {
    const { username } = post.createdBy;
    const pathname = usePathname();

    if (pathname.includes('status'))
        return null;

    return (
        <Link href={`/${username}/status/${post._id}`} className='z-1 absolute left-0 top-0 w-full h-full'></Link>
    )
}

export default PostLinkOverlay