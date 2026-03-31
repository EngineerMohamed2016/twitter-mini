import Link from 'next/link'
import React from 'react'
import { IoCloseSharp } from 'react-icons/io5'

const CloseButton = ({ path }) => {
    return (
        <div className='absolute right-2 top-4 rounded-full p-1 hover:bg-white/10 duration-300'>
            <Link href={path} className=' text-3xl'><IoCloseSharp /></Link>
        </div>
    )
}

export default CloseButton