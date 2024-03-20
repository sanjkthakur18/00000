import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Layout from './components/Layout'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Addstaff from './pages/Addstaff'
import Stafflist from './pages/Stafflist'
import './App.css'

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/addstaff' element={<Addstaff />} />
            <Route path='/stafflist' element={<Stafflist />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
