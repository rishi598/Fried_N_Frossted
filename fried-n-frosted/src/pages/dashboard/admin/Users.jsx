import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { FaTrash, FaUser, FaUsers } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Users = () => {
  const axiosSecure = useAxiosSecure()
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
          const res = await axiosSecure.get('/users')
          return res.data;
        },
      });
      // const isAdmin = false;
    // console.log(users)
    const handleMakeAdmin = (user)  => {
      axiosSecure.patch(`/users/admin/${user._id}`).then(res => {
        alert(`${user.name} is now admin`)
         refetch()
      })
      
    }

    const handleDeleteUser = user => {
      axiosSecure.delete(`/users/${user._id}`).then(res => {
        alert(`${user.name} is deleted`)
        refetch()
      })
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Number of items to display per page

    // Calculate indexes of the first and last items on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Slice the orders array to get current items to display
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

    // Pagination click handler
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>      
      <div className='flex items-center justify-between m-4'>
        <h5>All Users</h5>
        <h5>Total User: {users.length}</h5>
      </div>
      {/** user table */}
      <div>
      <div className="overflow-x-auto">
  <table className="table table-zebra md:w-[870px]">
    {/* head */}
    <thead className='bg-orange text-white rounded-lg'>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        currentItems.map((user, index) => (
          <tr key={index}>
        <th>{index + 1}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          {
            user.role === 'admin' ? "Admin" : (<button onClick={() => handleMakeAdmin(user)} className='btn btn-xs btn-circle bg-indigo-500 text-white'><FaUsers/></button>)
          }
        </td>
        <td><button onClick={() => handleDeleteUser(user)} className='btn btn-xs bg-red text-white'><FaTrash/></button></td>
      </tr>
        ))
      }
    
    </tbody>
  </table>
</div>
      </div>
      <div className="flex justify-center my-8">
                {Array.from({ length: Math.ceil(users.length / itemsPerPage) }).map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`mx-1 px-3 py-1 rounded-full ${
                            currentPage === index + 1 ? "bg-orange text-white" : "bg-gray-200"
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
    </div>
  )
}

export default Users



  