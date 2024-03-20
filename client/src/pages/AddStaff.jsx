import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { createStaff, getAllStaff, deleteStaff } from '../reducers/staffSlice'

const AddStaff = () => {
    const [staff, setStaff] = useState({ name: '', email: '', mobile: '', availability: '' })
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const allStaff = useSelector((state) => state.staff.staff)

    const handleChange = (evt) => {
        setStaff({ ...staff, [evt.target.name]: evt.target.value })
    }

    const handleAdd = (e) => {
        e.preventDefault()
        dispatch(createStaff(staff))
        setStaff({ name: '', email: '', mobile: '', availability: '' })
    }

    const handleDelete = (id) => {
        dispatch(deleteStaff(id))
    }

    const getStaff = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:4000/api/admin/getAllStaff`)
            // console.log(response.data)
            setData(response.data)
            return response.data
        } catch (error) {
            console.log("Error:", error);
        }
    }

    useEffect(() => {
        getStaff()
    }, [data, setData])

    // console.log(data);

    const adminRole = localStorage.getItem('role')

    /* useEffect(() => {
        dispatch(getAllStaff())
    }, [dispatch])

    useEffect(() => {
        setData(allStaff)
    }, [allStaff]) */

    return adminRole === 'admin' ? (
        <>
            <div className='w-full m-auto'>
                <h2 className='text-black font-semibold text-lg'>Manage Staff</h2>
                <hr />
                <div className='m-auto'>
                    <form onSubmit={handleAdd} className='flex items-center justify-evenly p-2'>
                        <div className=''>
                            <label>Name: </label>
                            <input type="text" name='name' onChange={handleChange} value={staff.name} placeholder='enter name' />
                        </div>
                        <div className=''>
                            <label>Email: </label>
                            <input type="email" name='email' onChange={handleChange} value={staff.email} placeholder='example@email.com' />
                        </div>
                        <div className=''>
                            <label>Mobile: </label>
                            <input type="text" name='mobile' onChange={handleChange} value={staff.mobile} placeholder='phone number' />
                        </div>
                        <div className=''>
                            <label>Availability: </label>
                            <input type="text" name='availability' onChange={handleChange} value={staff.availability} placeholder='availability' />
                        </div>
                        <button className='bg-gray-500 p-2 text-lg font-semibold text-white hover:bg-slate-400'>Add</button>
                    </form>
                </div>
            </div>
            <hr />
            <table className='table-auto w-full'>
                <thead>
                    <tr>
                        <th className='px-4 py-2'>Name</th>
                        <th className='px-4 py-2'>Email</th>
                        <th className='px-4 py-2'>Mobile</th>
                        <th className='px-4 py-2'>Availability</th>
                        <th className='px-4 py-2'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((staff, i) => (
                            <tr key={i} className='border-b text-center'>
                                <td className='px-4 py-2'>{staff.name}</td>
                                <td className='px-4 py-2'>{staff.email}</td>
                                <td className='px-4 py-2'>{staff.mobile}</td>
                                <td className='px-4 py-2'>{staff.availability}</td>
                                <td className='px-4 py-2'>
                                    <button className='text-red-500' onClick={() => handleDelete(staff._id)}>X</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className='px-4 py-2 text-center'>No staff data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    ) : (
        <div className="text-center mt-5 text-red-500">You are not authorized. Only admins are authorized.</div>
    );
}

export default AddStaff