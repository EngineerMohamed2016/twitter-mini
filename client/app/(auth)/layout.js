import React from 'react'
import Home from '../page'

const Layout = ({ children }) => {
    return (
        <>
            <Home />
            {children}
        </>
    )
}

export default Layout
