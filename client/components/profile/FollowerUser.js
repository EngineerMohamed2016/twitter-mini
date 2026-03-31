'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useFollow from '@/hooks/useFollow'
const FollowerUser = ({ user }) => {
    const { displayName, username, bio, followedByMe, inMyProfile, isMe } = user;
    const { handleFollow, handleUnfollow } = useFollow(username);
    console.log(isMe);

    return (
        <div className='px-4 py-4 relative flex flex-col gap-1 hover:bg-white/5 duration-300 '>
            <div className='relative flex items-center justify-between'>
                <div className='relative flex gap-3 z-2'>
                    <Link href={`/${username}`} className='relative flex justify-center items-center'>
                        <Image src={`/random-image-2.png`} className='w-10 h-10 rounded-full' width={40} height={40} alt='post' />
                    </Link>
                    <div className='flex flex-col'>
                        <Link href={`/${username}`} className='hover:underline'>{displayName}</Link>
                        <div className='flex items-center gap-2 '>
                            <span className='opacity-40'>@{username}</span>
                            {
                                !isMe && <span className=' text-[11px] rounded px-2 bg-white/10 text-white/40'>Follows You</span>
                            }
                        </div>
                    </div>
                </div>

                <div className='relative z-2'>
                    {
                        !isMe &&
                        (
                            followedByMe ?
                                <div className='relative group z-2'>
                                    <button className=' bg-black text-white border border-white/30 text-lg rounded-3xl px-4 py-1 cursor-pointer'>Following</button>
                                    <button onClick={handleUnfollow} className=' absolute left-0 top-0 w-full invisible group-hover:visible bg-black text-red-600 border border-red-600/30 text-lg rounded-3xl px-4 py-1 cursor-pointer'>UnFollow</button>
                                </div>
                                :
                                <button onClick={handleFollow} className=' bg-white text-black text-lg rounded-3xl px-4 py-1 cursor-pointer'>
                                    {inMyProfile ? 'Follow Back' : 'Follow'}
                                </button>
                        )
                    }

                </div>
            </div>

            <p className='opacity-90'>Lorem {bio}</p>

            {/* overlay */}
            <Link href={`/${username}`} className='absolute z-0 left-0 top-0 h-full w-full'></Link>
        </div>
    )
}

export default FollowerUser