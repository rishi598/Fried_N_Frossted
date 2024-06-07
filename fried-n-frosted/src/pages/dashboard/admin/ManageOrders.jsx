import React, { useState } from 'react'
// import useOrder from '../../../hooks/useOrder'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const ManageOrders = () => {
    const axiosSecure = useAxiosSecure()
    const [orderItems, setOrderItems] = useState([]);
    const { refetch, data: orders = [] } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
          const res = await axiosSecure.get('/order/get')
        //   console.log(res.data, "=============console.log(res.data)")
          return res.data;
          
        },
      });

      const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Number of items to display per page

    // Calculate indexes of the first and last items on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Slice the orders array to get current items to display
    const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

    // Pagination click handler
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
    
        return `${day}/${month}/${year}`;
      };

    //   update delivery status
    const handleDeliveryStatusChange = async (deliverystatus,item) => {
        console.log(deliverystatus)
        console.log(item)
        try {
            const response = await fetch(`http://localhost:6001/order/${item._id}`, {
                method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ delivery_status:  deliverystatus}),
            });
            if (response.ok){
             const updatedOrder = orderItems.map((orderItem) => {
                if(orderItem === item.id) {
                    return {
                        ...orderItem,
                        delivery_status: orderItem.delivery_status
                    };
                }
                return orderItem
             })   ;
             await refetch();
             setOrderItems(updatedOrder)
             showNotification("Delivery status updated", `Your order ${item._id} status is now ${deliverystatus}`);
             console.log("Delivery status updated", `Your order ${item._id} status is now ${deliverystatus}`)
            } else {
                console.error("Failed to update status");
            }
            
        } catch (error) {
            console.error("Error updating status:", error);
        }
    }

    const showNotification = (title, body) => {
        // Check if the browser supports notifications
        if ("Notification" in window) {
            // Request permission
            if (Notification.permission === "granted") {
                // If granted, show the notification
                new Notification(title, { body });
            } else if (Notification.permission !== "denied") {
                // If permission is not denied, request it
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        new Notification(title, { body });
                    }
                });
            }
        } else {
            console.error("This browser does not support notifications.");
        }
    };
      
  return (
    <div>
            <div className='w-full md:max-w-[870px] mx-auto px-4 flex items-center justify-between m-4'>
                <h5>Total Number of Orders: {orders.length}</h5>
            </div>
            {/* order table */}
            <div>
                <div className=''>
                    <div className="overflow-x-auto">
                        <table className="table w-full md:max-w-[870px] mx-auto px-4">
                            {/* head */}
                            <thead className='bg-orange text-white'>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Item Name</th>
                                    <th>Total</th>
                                    <th>Customer Name</th>
                                    <th>Order Date</th>
                                    <th>Payment Status</th>
                                    <th>Delivery Status</th>
                                    {/* <th>Track Order</th> */}
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* rows */}
                                {currentItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={item.cart[0].image} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {item.cart[0].name} <span className='text-italic'> x{item.cart[0].quantity}</span>
                                        </td>
                                        <td>₹ {item.total / 100}</td>
                                        <td>{item.name}</td>
                                        <td>{formatDate(item.createdAt)}</td>
                                        <td>{item.payment_status}</td>
                                        <td>
                                            <select
                                                value={item.delivery_status}
                                                onChange={(e) => handleDeliveryStatusChange(e.target.value, item)}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Order Preparing">Order Preparing</option>
                                                <option value="Order Dispatched">Order Dispatched</option>
                                                <option value="Order Delivered">Order Delivered</option>
                                            </select>
                                        </td>
                                        {/* <th><button onClick={()=>Navigate(`/track-order/${item._id}`)} className='text-orange'>Track Order</button></th> */}
                                    </tr>
                                ))}
                            </tbody>
                            {/* foot */}
                        </table>
                    </div>
                </div>
            </div>
            {/* Pagination */}
            <div className="flex justify-center my-8">
                {Array.from({ length: Math.ceil(orders.length / itemsPerPage) }).map((_, index) => (
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

export default ManageOrders
