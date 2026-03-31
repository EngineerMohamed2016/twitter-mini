'use client';

const Error = ({ error, reset }) => {
    return (
        <div className="h-screen flex items-center justify-center bg-black/70">
            <div className="bg-black text-white w-80 sm:w-100 flex flex-col gap-6 p-6 rounded-2xl text-center">
                <h2 className="text-xl font-bold">Something went wrong 😕</h2>

                <p className="text-sm text-gray-300">It’s not your fault. Please try again in a moment.</p>

                <button onClick={() => window.location.reload()} className="cursor-pointer border border-blue-600 py-1 bg-white/10 rounded-2xl hover:bg-blue-600 hover:text-white duration-300">
                    Try again
                </button>
            </div>
        </div>
    );
}

export default Error
