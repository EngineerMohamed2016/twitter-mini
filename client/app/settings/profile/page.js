'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
    const router = useRouter();

    useEffect(() => {
        let user = sessionStorage.getItem('profile-info');

        if (!user) {
            router.replace('/404');
            return;
        }

        user = JSON.parse(user);
        router.replace(`/${user.username}`);
    }, []);

};

export default Page;