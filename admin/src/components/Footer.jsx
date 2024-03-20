import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <footer className='flex items-center justify-center bottom-0 w-full pt-10 bg-gray-200'>
        <div className='mx-auto max-w-[1440px] px-6 lg:px-20 3xl:px-0 flex w-full flex-col gap-14 my-10'>
          <div className='flex flex-col items-start justify-center gap-[10%] md:flex-row'>
            <Link to='/' className='my-4 text-[1.4rem] font-[700] leading-[120%]'>Diomo.</Link>
            <hr className='border-none bg-gradient-to-r from-transparent via-black to-transparent h-[3px] md:h-[3px] w-full md:w-1/2 mx-auto' />
            <p className='text-center text-[0.8rem] font-[500] text-gray-600'>2024 Diomo. | All Rigths Reserved</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer