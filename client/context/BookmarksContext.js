'use client';
import { addBookmark, removeBookmark } from '@/actions/posts';
import { displayError } from '@/utils/displayError';
import { createContext, useContext, useState, } from 'react';

const BookmarksContext = createContext(null);

export const BookmarksProvider = ({ children, initialBookmarks }) => {
    const [bookmarksMap, setBookmarksMap] = useState(
        Object.fromEntries(initialBookmarks.map(bookmark => [bookmark._id, bookmark]))
    );

    // from client state
    const deleteBookmarkPost = (postId) =>
        setBookmarksMap(prev => {
            const copy = { ...prev };
            delete copy[postId];
            return copy;
        });

    const toggleBookmark = async (postId) => {
        const bookmarkPost = bookmarksMap[postId];
        let res;
        if (!bookmarkPost) {
            res = await addBookmark(postId);
            setBookmarksMap(prev => ({ ...prev, [postId]: res.bookmark }));
        }
        else {
            res = await removeBookmark(postId);
            deleteBookmarkPost(postId);
        }

        const { success, errorMsg } = res;
        if (!success) return displayError(errorMsg, 'toggle bookmark')
    };



    return (
        <BookmarksContext.Provider value={{ bookmarksMap, toggleBookmark, deleteBookmarkPost }}>
            {children}
        </BookmarksContext.Provider>
    );
};

export const useBookmarks = () => useContext(BookmarksContext);