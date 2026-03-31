'use client'
import { usePathname } from 'next/navigation';
import React from 'react';

const PostText = ({ post }) => {
    const limit = 200;
    const { caption } = post;
    const pathname = usePathname();

    const isStatusPage = pathname.includes('status');
    const shouldTrim = !isStatusPage && caption.length > limit;

    const displayedText = shouldTrim
        ? caption.slice(0, limit) + '...'
        : caption;

    return (
        <div>
            <p>{displayedText}</p>
        </div>
    );
};

export default PostText;