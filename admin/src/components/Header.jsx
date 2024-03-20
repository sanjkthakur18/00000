import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <nav className='bg-white flex items-center justify-between mx-auto max-w-[1440px] px-6 lg:px-20 3xl:px-0 py-2 ring-1 ring-slate-900/5 relative'>
        <div><Link to='/'>Diomo.</Link></div>
        <div className='uppercase text-[1.5rem] font-[700] leading-[120%] text-orange-500 px-3 rounded-md tracking-widest line-clamp-1 max-xs:text-[1.2rem] max-xs:font-[700] max-xs:leading-[120%] max-xs:py-2 max-xs:px-1'>Admin Panel</div>
      </nav>
    </>

  )
}

export default Header