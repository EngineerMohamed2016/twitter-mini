import { redirectIfAuthenticated } from "@/actions/auth";
import Image from "next/image";
import Link from "next/link";

const Home = async () => {
  await redirectIfAuthenticated();
  
  return (
    <div className='bg-black'>
      <div className='container h-screen flex flex-col-reverse gap-24 md:flex-row md:gap-x-52 justify-center items-center'>
        <div className="text-white flex flex-col gap-y-5 text-center w-75">
          <Link href={'/login'} className="text-xl rounded-3xl border-2 border-white py-2 hover:bg-blue-600 hover:text-white duration-300">Login</Link>
          <Link href={'/register'} className="text-xl rounded-3xl border-2 border-white py-2 hover:bg-blue-600 hover:text-white duration-300">Register</Link>
        </div>
        <div className="relative">
          <Image src='/x-logo.png' className="w-37.5 h-37.5 md:w-75 md:h-75" width={300} height={300} alt='logo' />
          <div className='absolute left-0 top-0 w-full h-full'></div>
        </div>
      </div>
    </div>
  );
}

export default Home