import { getUserByUsername } from '@/actions/user'
import Loading from '@/components/Loading'
import ProfileHeader from '@/components/profile/ProfileHeader'
import ProfileNav from '@/components/profile/ProfileNav'
import ProfilePosts from '@/components/profile/ProfilePosts'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'


const Page = async ({ params }) => {
    const { username } = await params;
    const { success, user } = await getUserByUsername(username);

    if (!success)
        return notFound();

    return (
        <section>
            <ProfileHeader user={user} />
            <ProfileNav username={username} />
            <main className='relative'>
                <Suspense fallback={<Loading />}>
                    <ProfilePosts username={username} />
                </Suspense>
            </main>
        </section>
    )
}

export default Page