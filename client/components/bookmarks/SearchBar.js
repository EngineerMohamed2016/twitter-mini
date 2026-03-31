'use client'
import { IoSearchSharp } from 'react-icons/io5'

export default function SearchBar({ search, setSearch }) {
    const handleSearch = (e) => setSearch(e.target.value);

    return (
        <div className='relative px-4 py-4'>
            <div className='relative rounded-3xl border border-white/30'>
                <div className='absolute left-0 top-0 text-white/30 w-12 text-xl h-full flex items-center justify-center rounded-l-3xl pl-5'>
                    <IoSearchSharp />
                </div>

                <input
                    type="search"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search Bookmarks"
                    className='pl-13 pr-4 py-2 w-full outline-none border rounded-3xl'
                />
            </div>
        </div>
    )
}