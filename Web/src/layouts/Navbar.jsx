import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IoHomeSharp, IoSearchSharp, IoNotificationsOutline } from 'react-icons/io5'
import { VscAccount } from 'react-icons/vsc'
import { LuLayoutDashboard } from "react-icons/lu";

export const Navbar = () => {
    const navigate  = useNavigate();
  return (
    <div>
        <div className='bg-cyan-200/35 text-sm backdrop-blur-md shadow-2xl fixed w-full bottom-0 p-2 flex flex-row justify-around gap-2 items-center md:hidden'>
           <div className='flex flex-col justify-between' onClick={() => navigate("/")}>
                <span className='font-semibold gap-1.5'><IoHomeSharp className='text-xl m-2' />Home</span>
           </div>
           <div className='flex flex-col justify-between'>
                <span className='font-semibold gap-1.5'><IoSearchSharp className='text-xl m-2' />Search</span>
           </div>
           <div className='flex flex-col justify-between'>
                <span className='font-semibold gap-1.5'><VscAccount className='text-xl m-2' />Profile</span>
           </div>
           <div className='flex flex-col justify-between'>
                <span className='font-semibold gap-1.5'><LuLayoutDashboard className='text-xl m-2 w-1/2' />Dashboard</span>
           </div>
           <div className='flex flex-col justify-between'>
                <span className='font-semibold gap-1.5'><IoNotificationsOutline className='text-xl m-2 w-1/2' />Notification</span>
           </div>
        </div>
        <div>
            {/* Desktop Navbar */}
            <div className='hidden md:flex flex-row justify-between items-center p-4 bg-cyan-200/30 backdrop-blur-md shadow-2xl fixed w-full top-0 z-10 text-shadow-lg'>
                <div className='text-2xl font-bold italic text-blue-900'>ScholarTrack</div>
                <div className='flex flex-row gap-6 text-lg font-semibold'>
                    <span className='hover:text-blue-600 cursor-pointer' onClick={() => navigate("/")}>Home</span>
                    <span className='hover:text-blue-600 cursor-pointer'>Search</span>
                    <span className='hover:text-blue-600 cursor-pointer'>Profile</span>
                    <span className='hover:text-blue-600 cursor-pointer'>Dashboard</span>
                    <span className='hover:text-blue-600 cursor-pointer'>Notification</span>
                </div>
                <div>
                    <button className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700' onClick={() => navigate("/login")}>Login</button>
                </div>
            </div>
        </div>
        <div className='md:h-16'>
            {/* Spacer for fixed navbar */}
        </div>
    </div>
  )
}
