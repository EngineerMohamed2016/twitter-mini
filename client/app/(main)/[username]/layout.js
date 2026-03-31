import React from 'react'

const Layout = ({children}) => {
    return (
        <div  className='border-l border-r border-white/30'>
            {children}
        </div>
    )
}

export default Layout