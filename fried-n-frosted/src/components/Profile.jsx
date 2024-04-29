import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'

const Profile = ({ user }) => {
    const {logOut} = useContext(AuthContext)
    const handleLogOut = () => {
        logOut().then(() => {
            // Sign-out successful.
            alert("logged out successfully!")
          }).catch((error) => {
            // An error happened.
          });
          
    }
    return (
        <div className='flex items-end'>
            <div className="drawer drawer-end Z-50">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost btn-circle avatar"><div className="w-10 rounded-full">
                    {
                        user.photoURL ? <img alt="Tailwind CSS Navbar component" src={user.photoURL} /> : <img alt="Tailwind CSS Navbar component" src="\images\home\socialmedia\default.png" />
                    }
                </div></label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li><a href='/update-profile'>Profile</a></li>
                    <li><a>Order</a></li>
                    <li><a>Settings</a></li>
                    <li><a onClick={handleLogOut}>Logout</a></li>
                </ul>
            </div>
        </div>
        </div>
    )
}

export default Profile
