'use client'
import CloseButtonReplay from '@/components/posts/ClosePostButton'
import PostComposer from '@/components/posts/PostComposer'
import PostHeader from '@/components/posts/PostHeader'
import PostText from '@/components/posts/PostText'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = () => {
    let postObj = sessionStorage.getItem('post');
    if (!postObj)
        redirect('/home');
    postObj = JSON.parse(postObj);

    if (postObj.type === 'reply')
        return (
            <div className='z-100 bg-white/50 min-h-screen fixed top-0 left-0 w-full flex justify-center items-center '>
                <div className='relative bg-black px-3 py-5 rounded-2xl text-white w-150  max-h-160 overflow-auto'>
                    <CloseButtonReplay />
                    {
                        <div className='flex flex-col items-start gap-2 rounded-2xl'>
                            <div className='flex gap-2'>
                                <PostHeader post={postObj.post} />
                            </div>
                            <div className='w-full break-all'>
                                <PostText post={postObj.post} />
                            </div>
                            <div className='w-full'>
                                <PostComposer />
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    else
        return (
            <div className='z-100 bg-white/50 min-h-screen fixed top-0 left-0 w-full flex justify-center items-center '>
                <div className='relative bg-black px-3 py-5 rounded-2xl text-white w-150  max-h-160 overflow-auto'>
                    <CloseButtonReplay />
                    {
                        <div className='flex flex-col items-start gap-2 rounded-2xl'>
                            <div className='w-full'>
                                <PostComposer />
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
}



export default Page
