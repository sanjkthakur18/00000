import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import AdminSignup from './pages/AdminSignup'
import AdminSignin from './pages/AdminSignin'
import AddStaff from './pages/AddStaff'
import './App.css'

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='signin' element={<SignIn />} />
            <Route path='adminsignup' element={<AdminSignup />} />
            <Route path='adminsignin' element={<AdminSignin />} />
            <Route path='addstaff' element={<AddStaff />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App