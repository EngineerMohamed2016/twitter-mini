import React from 'react'

const FloatingLabel = ({field}) => {
    return (
        <label className='absolute left-2 top-1/2 -translate-y-1/2 text-white/50 duration-200 capitalize peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-white/50 peer-focus:top-0 peer-focus:translate-y-0 peer-focus:text-blue-400 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-blue-400'>{field}</label>
    )
}

export default FloatingLabel
