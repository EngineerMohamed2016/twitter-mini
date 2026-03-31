
'use client'
import { BsThreeDots } from "react-icons/bs";
import React, { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import { IoHome } from "react-icons/io5";
import Link from 'next/link';
import { FaRegBookmark } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { IoMdArrowDropdown } from "react-icons/io";
import { signOut } from "@/actions/auth";


const Sidebar = ({ user }) => {
    const { username, displayName } = user;
    const links = [
        { icon: <IoHome />, name: 'Home', path: '/home' },
        { icon: <FaRegBookmark />, name: 'Bookmarks', path: '/bookmarks' },
        { icon: <FaUserAlt />, name: 'Profile', path: `/${username}` },
    ];
    const pathname = usePathname();
    const [showDrop, setShowDrop] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();

    const toggleDropdown = () => {
        setShowDrop(!showDrop);
    }

    const handleCreatePost = () => {
        sessionStorage.setItem('post', JSON.stringify({ type: 'post' }));
        router.push('/compose/post');
    }

    const handleLogout = async () => {
        await signOut();
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target))
                setShowDrop(false);
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const post = sessionStorage.getItem('post');
        if (post)
            router.push('/compose/post')
    }, [])


    return (
        <div className=' px-4 py-4 bg-black sticky top-0 h-screen flex flex-col gap-10'>
            <Link href={'/home'} className='flex justify-center items-center duration-300 hover:bg-white/20 w-15 h-15  rounded-full '>
                <Logo />
            </Link>
            <ul className='flex flex-col items-start gap-2'>
                {links.map((link) => (
                    <li key={link.name}>
                        <Link
                            href={link.path}
                            className={`flex items-center gap-5 px-4 py-2 rounded-3xl duration-300 hover:bg-white/10 ${pathname.includes(link.path) ? 'text-white' : 'text-white/25'}`}>
                            <span className='text-2xl'>
                                {link.icon}
                            </span>
                            <span className='text-xl'>{link.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <button onClick={handleCreatePost} className='bg-white hover:bg-white/70 text-black duration-300 px-5 py-2 rounded-3xl text-lg cursor-pointer'>Create Post</button>
            <div className='relative mt-10' ref={dropdownRef}>
                <button onClick={toggleDropdown} className='flex w-full justify-between items-center hover:bg-white/10 rounded-4xl px-4 py-2 duration-300 cursor-pointer'>
                    <div className='flex items-start gap-2'>
                        <div className='relative text-white'>
                            <Image src={`/user.png`} className='min-w-10 min-h-10 rounded-full' width={40} height={40} alt='post' />
                            <span className='absolute left-1/2 top-1/2 -translate-1/2 text-xl'>{displayName[0].toUpperCase()}</span>
                        </div>
                        <div className="flex flex-col items-start">
                            <p>{displayName}</p>
                            <div>
                                <p>@{username}</p>
                            </div>
                        </div>
                    </div>
                    <div> <BsThreeDots className="text-xl" /></div>
                </button>
                <div className={`${showDrop ? 'visible' : 'invisible'}`}>
                    <button onClick={handleLogout} className='shadow-[0_0_5px_rgba(255,255,255,0.3)] hover:bg-white/5 cursor-pointer shadow-white absolute left-0 top-0 -translate-y-16 py-4 rounded-2xl bg-black w-full'>
                        Log out @{username}
                    </button>
                    <div className='text-2xl absolute left-1/2 top-0 -translate-x-1/2 -translate-y-3.75'><IoMdArrowDropdown /></div>
                </div>
            </div>

        </div>
    )
}

export default Sidebar
