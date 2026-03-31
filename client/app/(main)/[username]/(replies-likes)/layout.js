import { getUserByUsername } from '@/actions/user';
import ProfileHeader from '@/components/profile/ProfileHeader'
import ProfileNav from '@/components/profile/ProfileNav';
import { notFound } from 'next/navigation';
import React from 'react'

const Layout = async ({ children, params }) => {
    const { username } = await params;
    const { success, user } = await getUserByUsername(username);

    if(!success) return notFound();

    return (
        <>
            <ProfileHeader user={user} />
            <ProfileNav username={username}/>
            {children}
        </>
    )
}

export default Layout