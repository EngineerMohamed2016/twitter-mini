import { getUserFollowers } from '@/actions/user';
import FollowerUser from '@/components/profile/FollowerUser'
import { notFound } from 'next/navigation';
import React from 'react'

const Page = async ({ params }) => {
  const { username } = await params
  const { success, followers } = await getUserFollowers(username);

  if (!success)
    return notFound();

  return (
    <section>
      {
        followers.length > 0 ?
        followers.map((follower)=> <FollowerUser key={follower.username} user={follower} />)
        :
        <p className='p-10 text-center text-2xl opacity-70'>{username} has not followers</p>
      }
    </section>
    )
}

export default Page