import React from 'react'
import SearchBar from './SearchBar';
import RecommendedUsers from './RecommendedUsers';
import RecommendedPosts from './RecommendedPosts';

const Recommendation = () => {

    return (

        <div className='flex flex-col gap-10 px-4 py-4 bg-black sticky top-0 h-screen'>
            <SearchBar />
            <RecommendedUsers />
            <RecommendedPosts />
        </div>

    )
}

export default Recommendation
