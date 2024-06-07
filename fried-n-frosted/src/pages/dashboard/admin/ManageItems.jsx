import React, { useState } from 'react'
import useMenu from '../../../hooks/useMenu'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageItems = () => {
    const [menu, refetch] = useMenu();
    const axiosSecure = useAxiosSecure()
    console.log(menu)

    const handleDeleteItem = (item) => {
        console.log(item);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`)
                console.log(res)
               if(res) {
                refetch;
                Swal.fire({
                  title: "Deleted!",
                  text: "Menu Item has been deleted.",
                  icon: "success"
                });
               }
            }
          });
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Number of items to display per page

    // Calculate indexes of the first and last items on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Slice the orders array to get current items to display
    const currentItems = menu.slice(indexOfFirstItem, indexOfLastItem);

    // Pagination click handler
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='w-full md:w-[870px] px-4 mx-auto'>
            <h2 className='text-2xl font-semibold my-4'>Manage All <span className='text-orange'>Menu Item</span></h2>
            {/** Menu items */}
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-orange text-white'>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentItems.map((item, index) => (
                                    <tr key={index}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt=''/>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                    
                                    
                                </td>
                                <td>₹ {item.price}</td>
                                <td>
                                    <Link to={`/dashboard/update-menu/${item._id}`}><button className="btn btn-ghost btn-xs bg-orange text-white"><FaEdit/></button></Link>
                                </td>
                                <td><button onClick={() => handleDeleteItem(item)} className="btn btn-ghost btn-xs text-red"><FaTrash/></button></td>
                            </tr>

                                ))
                            }
                            {/* row 1 */}
                            

                        </tbody>


                    </table>
                </div>
            </div>
              {/* Pagination */}
              <div className="flex justify-center my-8">
                {Array.from({ length: Math.ceil(menu.length / itemsPerPage) }).map((_, index) => (
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

export default ManageItems
