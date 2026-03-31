import React from 'react'
import PostText from './PostText';
import PostHeader from './PostHeader';
import PostButtons from './PostButtons';
import PostDropdown from './PostDropdown';
import PostLinkOverlay from './PostLinkOverlay';
import Image from 'next/image';

const Post = ({ post }) => {
    const { postImgUrl } = post;
    return (
        <section className='relative px-5 py-2 border-b first:border-t border-white/30'>
            <div>
                <div className='flex justify-between z-3 relative'>
                    <PostHeader post={post} />
                    <PostDropdown post={post} />
                </div>

                <div className='py-4 relative z-2 break-all'>
                    <PostText post={post} />
                    <PostLinkOverlay post={post} />
                </div >

                {
                    postImgUrl &&
                    <div className='my-2 relative z-2'>
                        <Image src={postImgUrl} className='w-full max-h-100 object-cover' width={400} height={400} alt='post-image' />
                    </div>
                }


                <div className='relative z-2'>
                    <PostButtons post={post} />
                </div>
            </div>
        </section>


    )
}

export default Post