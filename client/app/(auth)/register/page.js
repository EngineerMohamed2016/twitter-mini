
import React from 'react'
import Register from '@/components/auth/Register'
import { redirectIfAuthenticated } from '@/actions/auth';

const Page = async () => {
    await redirectIfAuthenticated();
    return (
        <Register />
    )
}

export default Page