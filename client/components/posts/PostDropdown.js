'use client'
import React, { useEffect, useRef, useState } from 'react'
import { FiLink2 } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import { usePathname, useRouter } from 'next/navigation';
import { deletePost } from '@/actions/posts';
import { displayError } from '@/utils/displayError';
import { useBookmarks } from '@/context/BookmarksContext';


const PostDropdown = ({ post }) => {
    const { isMyPost, _id, createdBy, postType } = post;
    const { username } = createdBy;
    const router = useRouter();
    const [showDrop, setShowDrop] = useState(false);
    const dropdownRef = useRef(null);
    const [copied, setCopied] = useState(false);
    const pathname = usePathname();
    const { deleteBookmarkPost } = useBookmarks();


    const toggleDropdown = () => {
        setShowDrop(!showDrop);
    }

    const handleDelete = async () => {
        const { success } = await deletePost(_id);
        if (success) {
            setShowDrop(false);
            if (pathname.includes('bookmarks'))
                deleteBookmarkPost(_id);
            router.push('/home');
        }

        else
            displayError(response.errorMsg, 'delete post');
    }

    const handleCopy = async () => {
        await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_SITE_URL}${username}/status/${_id}`);
        setCopied(true);
        setTimeout(() => {
            setShowDrop(false);
        }, 1000);

        setTimeout(() => {
            setCopied(false);
        }, 1100);
    }

    useEffect(() => {
        let post = sessionStorage.getItem('post');
        if (post) {
            post = JSON.parse(post);
            if (post.type === 'post')
                router.push('/compose/post')
        }

        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target))
                setShowDrop(false);
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [])

    return (
        <div className="relative z-30" ref={dropdownRef}>
            {/*Open*/}
            <button
                onClick={toggleDropdown}
                className="w-8 h-8 flex justify-center items-center cursor-pointer rounded-full text-lg text-white/50 hover:text-white hover:bg-white/20 duration-300"
            >
                <SlOptions />
            </button>

            {/* Dropdown */}
            <div className={`${showDrop ? 'visible' : 'invisible'} overflow-hidden duration-100 shadow-[0_0_10px_rgba(255,255,255,0.3)] absolute right-0 top-0 w-60 flex flex-col bg-black rounded-2xl z-20`}>

                {
                    isMyPost &&
                    <button onClick={handleDelete} className="hover:bg-white/10 duration-300 transition-colors cursor-pointer flex items-center gap-5 text-sm px-2 py-3 text-white rounded-t-2xl">
                        <AiFillDelete className="text-lg" />
                        <span>{postType === 'reply' ? 'Delete Replay' : 'Delete Post'}</span>
                    </button>
                }


                <button onClick={handleCopy} className="hover:bg-white/30 cursor-pointer duration-300 transition-colors flex items-center gap-5 text-sm w-full px-2 py-2 text-white rounded-b-2xl">
                    <FiLink2 className="text-lg" />
                    <span>{copied ? 'Copied' : 'Copy link'}</span>
                </button>
            </div>
        </div>
    )
}

export default PostDropdown