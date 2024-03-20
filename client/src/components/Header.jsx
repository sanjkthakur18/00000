import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <div className='bg-gray-500 gap-2 w-full p-4'>
                <div className='relative group flex gap-8'>
                    <Link className='text-white group-hover:block'>Items</Link>
                    <ul className='absolute top-10 transition-all duration-100 ease-in-out hidden w-32 group-hover:block bg-blue-500 rounded-lg p-2'>
                        <li><NavLink className='block text-white hover:text-gray-800' to='/'>Home</NavLink></li>
                        <li><NavLink className='block text-white hover:text-gray-800' to='/signup'>Signup</NavLink></li>
                        <li><NavLink className='block text-white hover:text-gray-800' to='/signin'>Signin</NavLink></li>
                        <li><NavLink className='block text-white hover:text-gray-800' to='/adminsignup'>Admin Signup</NavLink></li>
                        <li><NavLink className='block text-white hover:text-gray-800' to='/adminsignin'>Admin Signin</NavLink></li>
                        <li><NavLink className='block text-white hover:text-gray-800' to='/addstaff'>Add Staff</NavLink></li>
                    </ul>
                    <Link className='text-white group-hover:block'>Items 2</Link>
                    <ul className='absolute top-10 transition-all duration-100 ease-in-out hidden w-32 group-hover:block bg-blue-500 rounded-lg p-2'>
                        <li><NavLink className='block text-white hover:text-gray-800' to='/'>Home</NavLink></li>
                        <li><NavLink className='block text-white hover:text-gray-800' to='/signup'>Signup</NavLink></li>
                        <li><NavLink className='block text-white hover:text-gray-800' to='/signin'>Signin</NavLink></li>
                        <li><NavLink className='block text-white hover:text-gray-800' to='/adminsignup'>Admin Signup</NavLink></li>
                        <li><NavLink className='block text-white hover:text-gray-800' to='/adminsignin'>Admin Signin</NavLink></li>
                        <li><NavLink className='block text-white hover:text-gray-800' to='/addstaff'>Add Staff</NavLink></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Header