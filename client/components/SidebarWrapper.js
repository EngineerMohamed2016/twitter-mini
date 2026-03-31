import React from 'react'
import Sidebar from './Sidebar'
import { getMyProfile } from '@/actions/user'
import { notFound } from 'next/navigation';

const SidebarWrapper = async () => {
    const { success, user } = await getMyProfile();

    if (!success)
        return notFound();

    return (
        <>
            <Sidebar user={user} />
        </>
    )
}

export default SidebarWrapper