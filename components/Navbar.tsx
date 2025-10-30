import React from 'react';
import Image from 'next/image';

const Navbar = () => {
    return (
        <div className="md:hidden flex justify-between items-center p-4 bg-gray-800 text-white">
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
            <div className="text-lg font-bold">Section Name</div>
            <Image src="/photos/profile.png" alt="Profile" width={40} height={40} className="rounded-full" />
        </div>
    );
};

export default Navbar;
