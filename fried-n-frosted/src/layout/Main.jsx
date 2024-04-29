import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { AuthContext } from '../contexts/AuthProvider'
import Loading from '../components/Loading'

const Main = () => {
  const {loading, setLoading} = useContext(AuthContext);
  return (
    <div className='bg-prigmayBG'>
      {
        loading ? <Loading/> : <div>
        <Navbar/>
        <div className='min-h-screen'>
        <Outlet/>
        </div>
        <Footer/>
        </div>
      }
      
    </div>
  )
}

export default Main
