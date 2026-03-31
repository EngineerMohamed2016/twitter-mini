'use client'
import { clearSessionStorage } from '@/utils/clearSessionStorage'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoCloseSharp } from 'react-icons/io5'

const CloseButtonReplay = () => {
    const router = useRouter();
    const handleClose = () => {
        clearSessionStorage();
        router.back();
    }

    return (
        <div className='absolute right-2 top-4 rounded-full p-1 hover:bg-white/10 duration-300'>
            <button onClick={handleClose} className='flex justify-center items-center cursor-pointer text-3xl'><IoCloseSharp /></button>
        </div>
    )
}

export default CloseButtonReplay