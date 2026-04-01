import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import ProfileActions from './ProfileActions';

const ProfileHeader = ({ user }) => {
    const { displayName, username, bio, followersCount, followingCount, createdAt } = user;

    const formatDate = () => {
        const date = new Date(createdAt);
        const formatted = date.toLocaleString("en-US", {
            month: "long",
            year: "numeric"
        });
        return formatted;
    }

    return (
        <section>
            <div className='relative'>
                <div className=''>
                    <Image src={`/user.png`} className='w-full h-50' width={120} height={120} alt='post' />
                </div>
                <div className='absolute left-5 top-full -translate-y-1/2 w-fit border-2 rounded-full'>
                    <Image src={`/user.png`} className='w-30 h-30 rounded-full' width={120} height={120} alt='post' />
                    <span className='absolute left-1/2 top-1/2 -translate-1/2 text-3xl'>{displayName[0].toUpperCase()}</span>
                </div>
            </div>


            <main className='mt-5 px-4 flex flex-col gap-5'>
                <div className='flex relative group w-fit self-end'>
                    <ProfileActions user={user} />
                </div>

                <div className=''>
                    <p className='text-xl font-semibold'>{displayName}</p>
                    <span className='text-white/30 text-lg'>@{username}</span>
                </div>

                <p>{bio} </p>

                <p className='text-white/30 text-lg'>Joined {formatDate()}</p>

                <div className='flex gap-5 items-start'>
                    <Link href={`/${username}/followings`} className='hover:border-b duration-100'>{followingCount} <span className='opacity-40'>Followings</span></Link>
                    <Link href={`/${username}/followers`} className='hover:border-b duration-100'>{followersCount} <span className="opacity-40">Followers</span></Link>
                </div>
            </main>
        </section>


    )
}

export default ProfileHeader
