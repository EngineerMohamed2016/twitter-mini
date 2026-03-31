'use client'
import React, { useState } from 'react'
import SearchBar from './SearchBar'
import BookmarksPosts from './BookmarksPosts'

const BookmarksWrapper = () => {
    const [search, setSearch] = useState('');
    return (
        <>
            <SearchBar search={search} setSearch={setSearch} />
            <BookmarksPosts search={search} />
        </>
    )
}

export default BookmarksWrapper