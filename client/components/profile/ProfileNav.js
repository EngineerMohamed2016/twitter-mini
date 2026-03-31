'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const ProfileNav = ({ username }) => {
    const pathname = usePathname();
    return (
        <div className='flex items-center text-xl mt-3 '>
            <Link href={`/${username}`} scroll={false} className={`${pathname === `/${username}` ? 'text-white border-white' : ' text-white/30 border-transparent'} border-b w-1/2 py-2 text-center hover:bg-white/10 duration-300`}>Posts</Link>
            <Link href={`/${username}/replies`} className={`${pathname.includes('replies') ? 'text-white border-white' : ' text-white/30 border-transparent'} border-b w-1/2 py-2 text-center hover:bg-white/10 duration-300`}>Replies</Link>
            <Link href={`/${username}/likes`} className={`${pathname.includes('likes') ? 'text-white border-white' : ' text-white/30 border-transparent'} border-b w-1/2 py-2 text-center hover:bg-white/10 duration-300`}>Likes</Link>
        </div>)
}

export default ProfileNav