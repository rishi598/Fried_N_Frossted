import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import { FaLocationArrow, FaQuestionCircle, FaRegUser, FaUsers } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import FAF from "/FAF.png";
import { FaCartShopping } from 'react-icons/fa6';
import Login from '../components/Login';
import useAdmin from '../hooks/useAdmin';
import { useNavigate } from 'react-router-dom';

const sharedLinks = (
    <>
    <li className='mt-3' ><Link to="/" ><MdDashboard /> Home</Link></li>
    <li><Link to="/menu"><FaCartShopping/>Menu</Link></li>
    {/* <li><Link to="/menu"><FaLocationArrow/>Manage Orders</Link></li> */}
    {/* <li><Link to="/menu"><FaQuestionCircle/>Customer Support</Link></li> */}
    </>
)

const DashboardLayout = () => {
  const [isAdmin, isAdminLoading] = useAdmin()
  const Navigate = useNavigate();

  console.log(isAdmin+"=============isADmin")
  return (
    <div>
      {
        isAdmin ? <div className="drawer sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
          {/* Page content here */}
          <div className='flex items-center justify-between mx-4 '>
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden"><MdDashboardCustomize /></label>
          <button className='btn rounded-full px-6 flex items-center gap-2 bg-orange text-white sm:hidden'><FaRegUser />Logout</button>
          </div>
         <div className='mt-5 md:mt-2 mx-4'>
         <Outlet/>
         </div>
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link to="/dashboard" className='flex justify-start mb-3'><img src={FAF} alt="" className='w-20' />
              <span className="badge badge-primary">admin</span></Link>
            </li>
            <hr />
            <li className='mt-3' ><Link to="/dashboard" ><MdDashboard /> Dashboard</Link></li>
            <li><Link to="/dashboard/add-menu"><FaPlusCircle /> Add Menu </Link></li>
            <li><Link to="/dashboard/manage-items"><FaEdit /> Manage items</Link></li>
            <li><Link to="/dashboard/mangage-orders"><MdDashboard /> Manage orders</Link></li>
            <li className='mb-3'><Link to="/dashboard/users"><FaUsers />Users</Link></li>
          {/** shared nav links */}
          <hr />
          {
              sharedLinks
          }
          </ul>
        
        </div>
      </div> : <div className='h-screen flex items-center justify-center'>
        <button className='btn bg-orange text-white' onClick={() => Navigate('/')}>Back to Home</button>
      </div>
      }
    </div>
  )
}

export default DashboardLayout
