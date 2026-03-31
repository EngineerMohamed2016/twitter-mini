'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6';

const ArrowBack = () => {
  const router = useRouter();
  const handleArrow = () => { router.back(); }
    return (
        <div className='px-4 py-4 flex gap-10'>
            <button onClick={handleArrow} className='cursor-pointer text-2xl'><FaArrowLeftLong /></button>
            <div className='flex flex-col'>
                <p className='text-xl'>Bookmarks</p>
            </div>
        </div>
    )
}

export default ArrowBack