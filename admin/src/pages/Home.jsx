import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { IoIosAddCircleOutline, IoIosList } from 'react-icons/io'


const Home = () => {
  const navigate = useNavigate()

  const adminRole = localStorage.getItem('role')
  useEffect(() => {
    if (adminRole !== 'admin') {
      navigate('/signin')
    }
  }, [])

  return (
    <>
      <div className='py-7 flex justify-center gap-x-2 gap-y-5 w-full bg-white sm:gap-x-4 lg:flex-col lg:pt-20 lg:max-w-60 lg:h-screen lg:justify-start lg:pl-6'>
        <Link to='/addProduct'>
          <button className='flex items-center justify-center gap-2 rounded-md bg-primary h-12 w-40 xs:w-44 medium-16'>
            <IoIosAddCircleOutline height={50} width={50} />
            <span>Add Product</span>
          </button>
        </Link>
        <Link to='/listProduct'>
          <button className='flex items-center justify-center gap-2 rounded-md bg-primary h-12 w-40 xs:w-44 medium-16'>
            <IoIosList height={50} width={50} />
            <span>Product List</span>
          </button>
        </Link>
      </div>
    </>
  )
}

export default Home