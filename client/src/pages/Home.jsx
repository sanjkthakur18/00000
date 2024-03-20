import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {FaTrash} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import {deleteStaff} from '../reducers/authSlice'

const Home = () => {
  const [staff, setStaff] = useState([])
  const [user, setUser] = useState([])
  const [date, setDate] = useState('')
  const userRole = localStorage.getItem('role')
  const dispatch = useDispatch()


  const getStaff = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:4000/api/admin/getAllStaff`)
      console.log(response.data)
      setStaff(response.data)
      return response.data
    } catch (error) {
      console.log("Error:", error);
    }
  }

  const addStaff = async (id) => {
    try {
      const userId = localStorage.getItem('userid')
      console.log(userId);
      const response = await axios.put(`http://127.0.0.1:4000/api/user/add-staff/${userId}`, {
        staffId: id,
        date: date
      })
      console.log('Added staff:', response.data);
      getStaff()
      getUser()
      return response.data
    } catch (error) {
      return console.log("Error", error);
    }
  }

  const getUser = async () => {
    try {
      const userId = localStorage.getItem('userid')
      console.log(userId);
      const response = await axios.get(`http://127.0.0.1:4000/api/user/getUser/${userId}`)
      setUser(response.data.staff)
    } catch (error) {
      return console.log("Error", error);
    }
  }

  const handleDel = (userId, staffId) => {
    dispatch(deleteStaff({userId, staffId}))
  }

  useEffect(() => {
    getStaff()
    getUser()
  }, [])

  useEffect(() => {
    getStaff()
  }, [user])

  return (
    <>
      {userRole === 'user' ? (
        <>
          {
            staff.map((staff, i) => (
              <div key={i} className='flex justify-evenly text-lg font-semibold mt-2'>
                <p>{staff.name}</p>
                <p>{staff.email}</p>
                <p>{staff.mobile}</p>
                <p>{staff.availability}</p>
                <input type="date" onChange={(e) => setDate(e.target.value)} />
                <button onClick={() => addStaff(staff._id)} className='bg-gray-500 p-4 rounded-md text-white hover:bg-slate-400'>Add Staff</button>
              </div>
            ))
          }
          <hr className='my-5' />
          <h2 className='text-lg font-bold'>Added Staff for Delivery</h2>
          <table className='w-full text-center border-separate border-spacing-y-4'>
            <thead>
              <tr>
                <th className='px-4 py-2'>Name</th>
                <th className='px-4 py-2'>Email</th>
                <th className='px-4 py-2'>Mobile</th>
                <th className='px-4 py-2'>Availability</th>
                <th className='px-4 py-2'>Date</th>
              </tr>
            </thead>
            <tbody>
              {user.length > 0 ? (
                user.map((item, i) => (
                  <tr key={i} className='border-b text-center'>
                    {console.log(item)}
                    <td className='px-4 py-2'>{item.name}</td>
                    <td className='px-4 py-2'>{item.email}</td>
                    <td className='px-4 py-2'>{item.mobile}</td>
                    <td className='px-4 py-2'>{item.availability}</td>
                    <td className='px-4 py-2'>{item.date}</td>
                    <td className='px-4 py-2'><FaTrash onClick={()=>handleDel(item.staffId)} /></td>
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
        <h1>Welcome to the Home Page!</h1>
      )}
    </>
  )
}

export default Home