import { fetchUserReplies } from '@/actions/posts';
import Post from '@/components/posts/Post.js'
import { notFound } from 'next/navigation';
import React from 'react'

const Page = async ({ params }) => {
  const { username } = await params;
  const { success, replies } = await fetchUserReplies(username);

  if (!success) return notFound();

  return (
    <div>
      {replies.map((reply=><Post key={reply._id} post={reply}/>))}
    </div>
  )
}

export default Page