'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import PageHeader from './FollowPageHeader';

const FollowNav = ({ user }) => {
    const { username } = user;
    const pathname = usePathname();

    return (
        <div className='border-b border-white/30'>
            <PageHeader user={user} />
            <div className='flex items-center text-xl'>
                <Link href={`/${username}/followings`} className={`${pathname.includes('followings') ? 'text-white border-white' : ' text-white/30 border-transparent'} border-b w-1/2 py-2 text-center hover:bg-white/10 duration-300`}>Followings</Link>
                <Link href={`/${username}/followers`} className={`${pathname.includes('followers') ? 'text-white border-white' : ' text-white/30 border-transparent'} border-b w-1/2 py-2 text-center hover:bg-white/10 duration-300`}>Followers</Link>
            </div>
        </div>
    )
}

export default FollowNav