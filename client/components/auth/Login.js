'use client'
import React, { useActionState, useEffect } from 'react'
import Link from 'next/link'
import FloatingLabel from '@/components/FloatingLabel';
import CloseButton from '@/components/CloseButton';
import Logo from '@/components/Logo';
import { useRouter } from 'next/navigation';
import { displayError } from '@/utils/displayError';
import { signIn } from '@/actions/auth';

const Login = () => {
    const [state, formAction, pending] = useActionState(signIn, { resObj: { success: false, errorMsg: '' } });
    const router = useRouter();
    const { success, errorMsg: error } = state.resObj;

    useEffect(() => {
        if (success)
            router.push('/home');

        else if (error)
            displayError(error, 'login');
    }, [success, error]);

    return (
        <div className='absolute left-0 top-0 w-full h-full bg-white/20 flex justify-center items-center px-4'>
            <div className='relative bg-black p-5 text-white rounded-2xl w-112.5 sm:w-137.5 sm:h-143'>
                <div className='flex flex-col gap-5 justify-center items-center'>
                    <Logo />
                    <p className='text-3xl'>Login to X</p>
                </div>

                <form action={formAction} className='mt-10 flex flex-col w-[300] m-auto gap-8'>
                    {['email', 'password'].map((field) =>
                        <div className='relative' key={field}>
                            <input type={`${field === 'email' ? 'email' : 'password'}`} name={field} required className='peer w-full border border-white outline-none rounded-[5px] px-2 py-4 focus:border-blue-400 duration-300' placeholder=' ' />
                            <FloatingLabel field={field} />
                        </div>
                    )
                    }

                    <input type='submit' value={pending ? 'Logining...' : 'Login'} className='bg-white text-black rounded-2xl text-xl py-1 cursor-pointer hover:bg-blue-600 hover:text-white duration-300' />
                </form>
                <div className='my-10 w-[300] m-auto text-center'>
                    <span className='text-white/50 text-lg'>Don't have an account? </span>
                    <Link href='/register' className='text-lg'>Register</Link>
                </div>
                <CloseButton path={'/'} />
            </div>
        </div>)
}

export default Login