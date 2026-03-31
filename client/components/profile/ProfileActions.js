'use client'
import useFollow from '@/hooks/useFollow';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const ProfileActions = ({ user }) => {
    const { isMyProfile, followedByMe, username } = user;
    const { handleFollow, handleUnfollow } = useFollow(username);
    const router = useRouter();

    const handleEdit = () => {
        sessionStorage.setItem('profile-info', JSON.stringify(user));
        router.push('/settings/profile');
    }

    useEffect(() => {
        const user = sessionStorage.getItem('profile-info');
        if (user) router.push('/settings/profile');
    }, [])

    return (
        <>
            {
                isMyProfile ?
                    <button onClick={handleEdit} className='px-4 py-1 hover:bg-white/20 border border-white/30 duration-300 cursor-pointer  rounded-2xl'>Edit Profile</button>
                    :
                    followedByMe ?
                        <>
                            <button className='duration-100 bg-black text-white border border-white/30 text-lg rounded-3xl px-4 py-1 cursor-pointer'>Following</button>
                            <button onClick={handleUnfollow} className='duration-100 absolute left-0 top-0 w-full invisible group-hover:visible bg-black text-red-600 border border-red-600/30 text-lg rounded-3xl px-4 py-1 cursor-pointer'>UnFollow</button>
                        </>
                        :
                        <button onClick={handleFollow} className='duration-100 bg-white text-black text-lg rounded-3xl px-4 py-1 cursor-pointer'>Follow</button>
            }
        </>
    )
}

export default ProfileActions