import {  getUserFollowing } from '@/actions/user';
import FollowingUser from '@/components/profile/FollowingUser'
import { notFound } from 'next/navigation';
import React from 'react'

const Page = async ({ params }) => {
  const { username } = await params
  const { success, following } = await getUserFollowing(username);
  
  if (!success)
    return notFound();

  return (
    <section>
      {
        following.length > 0 ?
          following.map((following) => <FollowingUser key={following.username} user={following} />)
          :
          <p className='p-10 text-center text-2xl opacity-70'>{username} has not following</p>
      }
    </section>
  )
}

export default Page