'use client'
import { signOut } from '@/actions/auth';
import { getMyProfile } from '@/actions/user';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaUserAlt } from 'react-icons/fa';
import { FaRegBookmark } from 'react-icons/fa6';
import { IoHome } from 'react-icons/io5';

const SmallScreenNav = () => {
    const [username, setUsername] = useState('');
    const links = [
        { icon: <IoHome />, name: 'Home', path: '/home' },
        { icon: <FaRegBookmark />, name: 'Bookmarks', path: '/bookmarks' },
        { icon: <FaUserAlt />, name: 'Profile', path: `/${username}` },
    ];
    const pathname = usePathname();
    const handleLogout = async () => {
        await signOut();
    }

    useEffect(() => {
        const fetchProfile = async () => {
            const { user } = await getMyProfile();
            setUsername(user.username);
        }
        fetchProfile();
    }, [])

    return (
        <>
            <button onClick={handleLogout} className='text-lg cursor-pointer opacity-80 border-white border rounded-2xl px-4'>LogOut</button>
            <ul className='flex items-center justify-center gap-2'>
                {links.map((link) => (
                    <li key={link.name}>
                        <Link
                            href={link.path}
                            className={`flex items-center gap-5 px-4 py-2 rounded-3xl duration-300 hover:bg-white/10 ${pathname.includes(link.path) ? 'text-white' : 'text-white/25'}`}>
                            <span className='text-2xl'>
                                {link.icon}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </>

    )
}

export default SmallScreenNav