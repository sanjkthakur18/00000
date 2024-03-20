import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import { signup } from '../reducers/adminSlice'


const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', mobile: '' })
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.admin.isLoading)
    const error = useSelector(state => state.admin.error)
    const message = useSelector(state => state.admin.message)

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(signup(formData))
        setFormData({ name: '', email: '', password: '' })
    }

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <>
            <section className='mx-auto max-w-[1440px] px-6 lg:px-20 3xl:px-0 flex items-center justify-center flex-col my-32'>
                {isLoading ? <AiOutlineLoading3Quarters /> :
                    <div className='w-full mx-auto text-center bg-white px-14 py-10 rounded-md'>
                        <h3 className='text-[2rem] leading-tight md:text-[2rem] md:leading-[1.3] mb-4 font-bold'>Sign Up</h3>
                        <form className='w-[30rem] m-auto' onSubmit={handleSubmit}>
                            <div className='flex flex-col gap-4 mt-7'>
                                <input onChange={handleChange} required value={formData.name} type="text" name='name' placeholder='John Doe' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' />
                                <input onChange={handleChange} required value={formData.email} type="email" name='email' placeholder='example@email.com' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' />
                                {error.email && <p className="text-red-500 text-xs italic">{error.email}</p>}
                                <input onChange={handleChange} required value={formData.mobile} type="text" name='mobile' placeholder='+91 0000000000' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' />
                                {error.mobile && <p className="text-red-500 text-xs italic">{error.mobile}</p>}
                                <div className='relative'>
                                    <input onChange={handleChange} name='password' value={formData.password} type={showPassword ? "text" : "password"} placeholder='password@1234' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' />
                                    {showPassword ?
                                        <FaEyeSlash onClick={togglePassword} className='absolute right-3 top-4 cursor-pointer text-gray-500' />
                                        :
                                        <FaEye onClick={togglePassword} className='absolute right-3 top-4 cursor-pointer text-gray-500' />
                                    }
                                </div>
                            </div>
                            <button type='submit' className='medium-15 border border-green-90 bg-gray-900 px-7 py-3 text-white transition-all hover:bg-black my-4 w-full rounded-lg'>Continue</button>
                        </form>
                        {message && <p className="text-green-500 text-xs italic">{message.message}</p>}
                        <p className='text-black font-bold'>Dont't have an account? <Link to='/signin' className='text-green-400 underline cursor-pointer'>Signin</Link></p>
                    </div>
                }
            </section>
        </>
    )
}

export default Signup