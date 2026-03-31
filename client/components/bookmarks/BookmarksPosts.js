'use client'
import React, { useEffect, useState } from 'react'
import { getUserBookmarks } from '@/actions/posts.js';
import Post from '../posts/Post.js.js';
import { displayError } from '@/utils/displayError.js';
import { useBookmarks } from '@/context/BookmarksContext.js';
import Loading from '../Loading.js';

const BookmarksPosts = ({ search }) => {
    const [bookmarksList, setBookmarksList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { bookmarksMap } = useBookmarks();

    const fetchBookmarks = async () => {
        const { bookmarks, success } = await getUserBookmarks(search);
        if (!success) displayError();
        else setBookmarksList(bookmarks);
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        fetchBookmarks();
    }, [search]);

    useEffect(() => {
        fetchBookmarks();
    }, [bookmarksMap]);

    return (
        <>
            {
                loading ?
                    <div className='relative mt-10'>
                        <Loading />
                    </div>
                    :
                    bookmarksList.length > 0 ?
                        bookmarksList.map((post) => <Post post={post} key={post._id} />)
                        :
                        <p className='text-center text-xl'>No bookmarks found</p>
            }
        </>
    )
}

export default BookmarksPosts