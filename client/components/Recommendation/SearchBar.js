'use client'
import { searchUsers } from '@/actions/user';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";

const SearchBar = () => {
    const [showDrop, setShowDrop] = useState(false);
    const dropdownRef = useRef(null);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

    const handleFocus = (e) => {
        setShowDrop(true);
    }

    const handleSearch = async (e) => {
        const { success, users } = await searchUsers(e.target.value);
        if (!success) setUsers([]);
        else setUsers(users);
        setSearch(e.target.value);
    }

    const handleLink = () => {
        // setShowDrop(false);
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
    }, [])



    return (
        <form className='relative ' ref={dropdownRef}>
            <div className='relative rounded-3xl  border border-white/30 focus:border-blue-500'>
                <div className='absolute left-0 top-0 text-white/30 w-12 text-xl h-full flex items-center justify-center rounded-l-3xl pl-5'>
                    <IoSearchSharp />
                </div>
                <input onFocus={handleFocus} onChange={handleSearch} type="search" name='search' className=' pl-13 pr-4 py-2 w-full placeholder:text-white/40 outline-none focus:border-blue-600 border-white/30 border duration-300 rounded-3xl' placeholder='Search users' />
            </div>
            <div className={`${showDrop ? 'visible' : 'invisible'} absolute z-1 left-0 top-full w-full flex flex-col max-h-40 transition-colors overflow-y-auto duration-300 bg-black rounded-xl shadow-[0_0_10px_rgba(255,255,255,0.3)]`}>
                {
                    users.length > 0 ?
                        users.map((user) => {
                            const { _id, displayName, username } = user;
                            return <Link onClick={handleLink} key={_id} href={`/${username}`} className='flex items-start gap-2 py-2 hover:bg-white/20 duration-300 transition-colors px-4 py-2'>
                                <div className='relative text-white'>
                                    <p>
                                        <Image src={`/user.png`} className='w-10 h-10 rounded-full' width={40} height={40} alt='post' />
                                        <span className='absolute left-1/2 top-1/2 -translate-1/2 text-xl'>{displayName[0].toUpperCase()}</span>
                                    </p>
                                </div>
                                <div>
                                    <p className=' text-white'>{displayName}</p>
                                    <div className='text-white/30 flex gap-1'>
                                        <p>@{username}</p>
                                    </div>
                                </div>
                            </Link>
                        }
                        )
                        :
                        <div className='p-5 opacity-35'>{search ? 'User not found' : 'Try searching for people'}</div>
                }
            </div>
        </form>
    )
}

export default SearchBar