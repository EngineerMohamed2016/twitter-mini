import { getUserByUsername } from '@/actions/user';
import FollowNav from '@/components/profile/FollowNav';
import { notFound } from 'next/navigation';
import React from 'react'

const Layout = async ({ children, params }) => {
    const { username } = await params
    const { success, user } = await getUserByUsername(username);

    if (!success)
        return notFound();

    return (
        <div className='border-l border-r border-white/30'>
            <FollowNav user={user} />
            {children}
        </div>
    )
}

export default Layout