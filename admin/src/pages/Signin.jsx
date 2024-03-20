import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { signin } from '../reducers/adminSlice'

const Signin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.admin.isLoading)
    const error = useSelector(state => state.admin.error)
    const navigate = useNavigate()

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(signin(formData))
        setFormData({ email: '', password: '' })
        navigate('/')
    }

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <>
            <section className='mx-auto max-w-[1440px] px-6 lg:px-20 3xl:px-0 flex items-center justify-center flex-col my-32'>
                {isLoading ? <AiOutlineLoading3Quarters /> :
                    <div className='w-full mx-auto text-center bg-white px-14 py-10 rounded-md'>
                        <h3 className='text-[2rem] leading-tight md:text-[2rem] md:leading-[1.3] mb-4 font-bold'>Sign In</h3>
                        <form className='w-[30rem] m-auto' onSubmit={handleSubmit}>
                            <div className='flex flex-col gap-4 mt-7'>
                                <input required onChange={handleChange} name='email' value={formData.email} type="email" placeholder='example@email.com' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' />
                                {error.email && <p className="text-red-500 text-xs italic">{error.email}</p>}
                                <div className='relative'>
                                    <input onChange={handleChange} name='password' value={formData.password} type={showPassword ? "text" : "password"} placeholder='password@1234' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' />
                                    {error.password && <p className="text-red-500 text-xs italic">{error.password}</p>}
                                    {showPassword ?
                                        <FaEyeSlash onClick={togglePassword} className='absolute right-3 top-4 cursor-pointer text-gray-500' />
                                        :
                                        <FaEye onClick={togglePassword} className='absolute right-3 top-4 cursor-pointer text-gray-500' />
                                    }
                                </div>
                            </div>
                            <button type='submit' className='medium-15 border border-green-90 bg-gray-900 px-7 py-3 text-white transition-all hover:bg-black my-4 w-full rounded-lg'>Continue</button>
                        </form>
                        <p className='text-black font-bold'>Dont't have an account? <Link to='/signup' className='text-green-400 underline cursor-pointer'>Signup</Link></p>
                    </div>
                }
            </section>

        </>
    )
}

export default Signin