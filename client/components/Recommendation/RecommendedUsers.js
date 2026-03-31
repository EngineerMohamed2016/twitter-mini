import { getRecommendedUsers } from '@/actions/user';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import RecommendedUser from './RecommendedUser';


const RecommendedUsers = async () => {
    const { success, users } = await getRecommendedUsers();

    return (
        <div className='py-4 rounded-2xl w-full border border-white/30'>

            <p className='px-4 text-xl font-semibold'>You might Like</p>
            {
                users.map((user) => {
                    const { displayName, username, _id } = user;
                    return (
                        <div key={_id} className='flex items-center justify-between px-4 py-2 hover:bg-white/5 duration-300 mt-4'>
                            <Link href={`/${username}`} className='flex items-center justify-between'>
                                <div className='flex gap-2'>
                                    <div className='relative'>
                                        <Image src={`/user.png`} className='w-10 h-10 rounded-full block' width={40} height={40} alt='post' />
                                        <span className='absolute w-10 h-10 inset-0 flex items-center justify-center capitalize'>
                                            {username[0]}
                                        </span>
                                    </div>
                                    <div>
                                        <p className='hover:underline duration-300'>{displayName}</p>
                                        <span className='text-white/30'>@{username}</span>
                                    </div>
                                </div>
                            </Link>
                            <RecommendedUser user={user} />
                        </div>
                    )
                })
            }

        </div>
    )
}

export default RecommendedUsers