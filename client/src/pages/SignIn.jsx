import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signin, loggedStatus, loadingStatus } from '../reducers/authSlice'

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const dispatch = useDispatch()
  const isLoading = useSelector(loadingStatus)
  const isLoggedin = useSelector(loggedStatus)
  // const error = useSelector((state) => state.auth.error)
  const navigate = useNavigate()

  // console.log('Error Status:', error)
  console.log('Loading:', isLoading)
  console.log('Loggedin:', isLoggedin)

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(signin(formData))
    setFormData({ email: '', password: '' })
    navigate('/')
  }

  return (
    <>
      <div className='flex'>
        {isLoading ? <p className='text-green-400'>Loading..........</p> :
          <div className='m-auto'>
            <form className='p-2' onSubmit={handleSubmit}>
              <fieldset className='p-4 my-[10rem] border border-gray-500 rounded-[0.8rem] flex items-center justify-center flex-col'>
                <legend className='text-lg font-bold gap-5'>User Signin</legend>
                <div className='flex w-full py-2 justify-evenly gap-2 items-center'>
                  <label className='text-lg font-semibold text-gray-600 py-1'>Email:</label>
                  <div className='border border-gray-600 rounded-full flex items-center gap-2 px-4 overflow-hidden w-full'>
                    <input type="text" name='email' value={formData.email} onChange={handleChange} required placeholder='example@email.com' className='p-2 w-full outline-none border-none' />
                  </div>
                </div>
                <div className='flex w-full py-2 justify-evenly gap-2 items-center'>
                  <label className='text-lg font-semibold text-gray-600 py-1'>Password:</label>
                  <div className='border border-gray-600 rounded-full flex items-center gap-2 px-4 overflow-hidden w-full'>
                    <input type="text" name='password' value={formData.password} onChange={handleChange} required placeholder='password' className='p-2 w-full outline-none border-none' />
                  </div>
                </div>
                <button className='w-full bg-gray-500 py-4 border rounded-full text-lg font-semibold text-white hover:bg-slate-400' type='submit'>Signin</button>
              </fieldset>
            </form>
          </div>
        }
      </div>
    </>
  )
}

export default SignIn