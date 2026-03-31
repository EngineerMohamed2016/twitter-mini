import Link from "next/link";

const NotFound = () => {
    return (
        <div className="bg-black text-white h-screen w-full flex flex-col items-center justify-center gap-6 p-6 text-center">
            <div>
                <p className='text-4xl'>404</p>
                <p className='text-2xl'>This page could not be found</p>
            </div>
            <Link href='/home' className='cursor-pointer px-5 py-2 border border-blue-600 py-1 bg-white/10 rounded-2xl hover:bg-blue-600 hover:text-white duration-300'>
                Back To Home Page
            </Link>
        </div>
    );
}

export default NotFound