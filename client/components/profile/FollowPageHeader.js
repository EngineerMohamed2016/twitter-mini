'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6';

const PageHeader = ({ user }) => {
    const router = useRouter();
    const { displayName, username } = user;

    const handleArrow = () => {
        router.back();
    }


    return (
        <div className='px-4 py-4 flex gap-10'>
            <button onClick={handleArrow} className='cursor-pointer text-2xl'><FaArrowLeftLong /></button>
            <div className='flex flex-col'>
                <p className='text-xl'>{displayName}</p>
                <span className='opacity-40 text-sm'>@{username}</span>
            </div>

        </div>
    )
}

export default PageHeader