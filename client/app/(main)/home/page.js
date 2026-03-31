import Loading from '@/components/Loading';
import PostComposer from '@/components/posts/PostComposer';
import PostsList from '@/components/posts/PostsList';
import React, { Suspense } from 'react'

const Page =  () => {
    return (
        <div className='border-r border-l border-white/30'>
            <div className='px-5'>
                <PostComposer />
            </div>
            <section className='relative'>
                <Suspense fallback={<Loading />}>
                    <PostsList />
                </Suspense>
            </section>
        </div >

    )
}

export default Page
