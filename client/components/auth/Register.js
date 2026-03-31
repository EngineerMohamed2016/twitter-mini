'use client'
import React, { useActionState, useEffect } from 'react'
import Link from 'next/link'
import { dateFields, monthsMappingObject } from '../../lib/constants'
import FloatingLabel from '@/components/FloatingLabel'
import CloseButton from '@/components/CloseButton'
import Logo from '@/components/Logo'
import { signUp } from '@/actions/auth'
import { displayError } from '@/utils/displayError'
import { displaySuccess } from '@/utils/displaySuccess'
import { useRouter } from 'next/navigation';

const Register = () => {
    const [state, formAction, pending] = useActionState(signUp, { resObj: { success: '', errorMsg: '' } });
    const router = useRouter();
    const { success, errorMsg: error } = state.resObj;

    const inputs = [
        { name: 'name', type: 'text' },
        { name: 'email', type: 'email' },
        { name: 'password', type: 'password' }
    ];

    const selects = [
        { field: dateFields['days'], name: 'day' },
        { field: dateFields['months'], name: 'month' },
        { field: dateFields['years'], name: 'year' },
    ];

    const selectWidths = {
        day: 'w-[25%]',
        month: 'w-[45%]',
        year: 'w-[30%]'
    };

    useEffect(() => {
        if (success) {
            displaySuccess('Registered Successfully, You can login now');
            router.push('/login');
        }
        else if (error)
            displayError(error,'register');
    }, [success, error]);


    return (
        <div className='absolute left-0 top-0 w-full h-full bg-white/20 flex justify-center items-center px-4'>
            <div className='relative flex flex-col justify-center gap-10 w-112.5 sm:w-137.5 px-5 sm:px-24 py-5 bg-black text-white m-auto rounded-2xl'>
                <Logo />
                <p className='text-2xl'>Creating an account</p>
                <form action={formAction} className='flex flex-col gap-8'>
                    {
                        inputs.map((obj) =>
                            <div className='relative' key={obj.name}>
                                <input type={obj.type} name={obj.name} required className='peer w-full border border-white outline-none rounded-[5px] px-2 py-4 focus:border-blue-400 duration-300' placeholder=' ' />
                                <FloatingLabel field={obj.name} />
                            </div>
                        )
                    }


                    <div className='flex gap-3'>
                        {
                            selects.map((obj) =>
                                <div className={`${selectWidths[obj.name]} relative `} key={obj.name}>
                                    <select name={obj.name} required className='peer w-full bg-black border border-white py-5 rounded-[5px] focus:border-blue-400 duration-300'>
                                        <option value='' disabled hidden></option>
                                        {
                                            obj['field'].map((ele) => <option key={ele} value={obj.name === 'month' ? monthsMappingObject[ele] : ele}>{ele}</option>)
                                        }
                                    </select>
                                    <label className='absolute left-2 top-0.5 text-white/50 text-[14px] peer-focus:text-blue-300 duration-200 capitalize'>{obj.name}</label>
                                </div>
                            )
                        }
                    </div>
                    <input type='submit' value={pending ? 'Registering...' : 'Register'} disabled={pending ? true : false} className='bg-white text-black rounded-2xl text-xl py-1 cursor-pointer hover:bg-blue-600 hover:text-white duration-300 ' />
                </form>
                <div>
                    <span className='text-white/50 text-lg'>Have an account? </span>
                    <Link href='/login' className='text-lg'>Login</Link>
                </div>
                <CloseButton path={'/'} />
            </div>
        </div>
    )
}

export default Register