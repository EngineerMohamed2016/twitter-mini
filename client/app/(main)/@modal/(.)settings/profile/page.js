'use client'
import { editProfile } from '@/actions/user'
import FloatingLabel from '@/components/FloatingLabel'
import { displayError } from '@/utils/displayError'
import { useRouter } from 'next/navigation'
import React, { useActionState, useEffect, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'

const Page = () => {
    const [user, setUser] = useState({ displayName: '', bio: '', birthDate: '', location: '' });
    const { displayName, bio, birthDate, location } = user;
    const [state, formAction, pending] = useActionState(editProfile, { resObj: { success: false, errorMsg: '' } });
    const { success, errorMsg: error } = state.resObj;

    const router = useRouter();
    const handleClose = () => {
        sessionStorage.clear();
        router.back();
    }

    const formatDate = () => {
        const date = new Date(birthDate);
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();
        const formatted = `${day}-${month}-${year}`;
        return formatted
    }

    useEffect(() => {
        if (success) {
            sessionStorage.clear();
            router.back();
        }
        else if (error)
            displayError(error, 'edit profile');
    }, [success, error]);


    useEffect(() => {
        let user = sessionStorage.getItem('profile-info');
        if (user) {
            user = JSON.parse(user);
            setUser(user);
        }
    }, [])

    return (
        <div className='fixed z-10 left-0 top-0 flex justify-center items-center w-full min-h-screen bg-black/40'>
            <section className='px-4 py-4 text-white bg-black rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.3)] w-140 '>
                <form action={formAction} className='my-4 flex flex-col gap-3'>
                    <div className='py-2 flex justify-between items-center'>
                        <div className='flex justify-between items-center gap-6'>
                            <div className=' rounded-full p-1 hover:bg-white/10 duration-300'>
                                <button onClick={handleClose} className='text-2xl flex items-center justify-center cursor-pointer'><IoCloseSharp /></button>
                            </div>
                            <p className='text-lg'>Edit Profile</p>
                        </div>
                        <button className='px-4 py-1 cursor-pointer text-black bg-white rounded-2xl hover:bg-white/70 duration-300'>
                            {
                                pending ? 'Saving' : 'Save'
                            }
                        </button>
                    </div>
                    <div className='relative' key={'4'}>
                        <input type='text' name='displayName' defaultValue={displayName} required className='peer w-full border border-white/30 outline-none rounded-[5px] px-2 py-4 focus:border-blue-400 duration-300' placeholder=' ' />
                        <FloatingLabel field={'Name'} />
                    </div>

                    <div className='relative' key={'8'}>
                        <textarea defaultValue={bio} name='bio' className='peer resize-none max-h-20 overflow-y-auto border border-white/30 w-full outline-none rounded-[5px] px-2 py-4 focus:border-blue-400 duration-300' cols={1} placeholder=' '></textarea>
                        <FloatingLabel field={'Bio'} />
                    </div>

                    <div className='relative' key={'40'}>
                        <input type='text' name='location' defaultValue={location} required className='peer w-full border border-white/30 outline-none rounded-[5px] px-2 py-4 focus:border-blue-400 duration-300' placeholder=' ' />
                        <FloatingLabel field={'Location'} />
                    </div>
                </form>

                <div>
                    <p className='text-lg opacity-90'>Birth Date</p>
                    <span className='opacity-40'>{formatDate()}</span>
                </div>
            </section>
        </div>
    )
}

export default Page