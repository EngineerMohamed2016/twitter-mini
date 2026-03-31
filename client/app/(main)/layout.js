import Recommendation from '@/components/Recommendation/Recommendation'
import SidebarWrapper from '@/components/SidebarWrapper'
import SmallScreenNav from '@/components/SmallScreenNav'
import { fetchPosts, getUserBookmarks } from '@/actions/posts'
import { BookmarksProvider } from '@/context/BookmarksContext'
import { PostsProvider } from '@/context/PostsContext'
import React from 'react'

const Layout = async ({ children, modal }) => {
    const { posts } = await fetchPosts();
    const { bookmarks } = await getUserBookmarks('');

    return (
        <PostsProvider initialPosts={posts}>
            <BookmarksProvider initialBookmarks={bookmarks}>
                <div className="bg-black">
                    <div className='container text-white grid grid-cols-[100%] md:grid-cols-[50%_50%] lg:grid-cols-[60%_40%] xl:grid-cols-[20%_50%_30%] min-h-screen'>
                        <div className='hidden xl:block'>
                            <SidebarWrapper />
                        </div>
                        {children}
                        <div className='hidden md:block'>
                            <Recommendation />
                        </div>
                    </div>
                    <nav className='xl:hidden  sticky bottom-0 z-3 text-2xl px-4 flex items-center justify-center text-white h-14 bg-black border-t border-white'>
                        <SmallScreenNav />
                    </nav>
                </div>
                {modal}

            </BookmarksProvider>
        </PostsProvider >
    )
}

export default Layout
