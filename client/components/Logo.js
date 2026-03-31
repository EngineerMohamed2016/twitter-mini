import Image from 'next/image'
import React from 'react'

const Logo = () => {
    return (
        <div className='relative'>
            <Image src='/x-logo.png' className='mx-auto' width={35} height={35} alt='logo' />
            <div className='absolute left-0 top-0 w-full h-full'></div>
        </div>
    )
}

export default Logo
