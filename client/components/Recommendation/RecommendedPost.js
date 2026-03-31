import React from 'react'
import PostLinkOverlay from '../posts/PostLinkOverlay.js'
import PostButtons from '../posts/PostButtons.js'
import PostText from '../posts/PostText.js'
import PostDropdown from '../posts/PostDropdown.js'
import PostHeader from '../posts/PostHeader.js'

const RecommendedPost = ({ post }) => {
    return (
        <div className='relative mb-8'>
            <div className='px-2 py-4 flex  flex-col gap-2 rounded-2xl w-full border border-white/30'>
                <section className='relative px-5'>
                    <div>
                        <div className='flex justify-between'>
                            <PostHeader post={post} />
                            <PostDropdown post={post} />
                        </div>

                        <div className='relative z-2 break-all'>
                            <PostText post={post} />
                        </div>


                        <div className='relative z-2'>
                            <PostButtons post={post} />
                        </div>
                    </div>
                    <PostLinkOverlay post={post} />
                </section>
            </div>
        </div>
    )
}

export default RecommendedPost