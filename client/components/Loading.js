import React from 'react'

const Loading = () => {
    return (
        <section className="absolute left-1/2 top-2 -translate-x-1/2 flex justify-center items-center">
            <div className="h-10 w-10 animate-spin rounded-full border-b-3 border-white duration-300" />
        </section>)
}

export default Loading