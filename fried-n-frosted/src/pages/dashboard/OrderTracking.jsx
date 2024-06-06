
import React from 'react'
// import useOrder from '../../hooks/useOrder';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const OrderTracking = () => {
  const { id } = useParams()
  const token = localStorage.getItem('access-token');
  console.log(id)
  const { refetch ,data: order = []} = useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
        const res = await fetch(`http://localhost:6001/order/${id}`, {
          method: "GET",
          headers:{
            authorization: `Bearer ${token}`
          }
        })
        
        const data = await res.json()
        console.log(order)
        return data;

      },
})
  
  
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-28 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Track Your<span className="text-orange"> Order</span>
            </h2>
          </div>
          <div>
            {/** order tracking */}
         {
          
         
            <ul  className="steps steps-vertical">
            
           {(order.delivery_status !== "pending") ?<li  className="step step-success">Order Pending</li> : <li  className="step">Order Pending</li>}
           {(order.delivery_status !== "Order Preparing" &&(order.delivery_status !== "pending")) ?<li  className="step step-success">Order preparing</li> : <li  className="step">Order Pending</li>}
        
           {(order.delivery_status !== "Order Dispatched" && (order.delivery_status !== "Order Preparing" &&(order.delivery_status !== "pending")))   ? <li className="step step-success">Order Dispatched</li> : <li className="step">Order Dispatched</li>}
           {(order.delivery_status !== "Order Delivered" && (order.delivery_status !== "Order Dispatched" && (order.delivery_status !== "Order Preparing" &&(order.delivery_status !== "pending")))) ? <li className="step step-success">Order Delivered</li> : <li className="step">Order Delivered</li>}
          </ul>
         
         }
          </div>
          
        </div>
        
      </div>
      <div className='w-full flex items-center justify-center'>
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        {/* <th></th> */}
        <th>Name</th>
        <th>Category</th>
        <th>Quantity</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        {/* <th>1</th> */}
        <td>{order.cart[0].name}</td>
        <td>{order.cart[0].category}</td>
        <td>{order.cart[0].quantity}</td>
        <td>₹ {order.cart[0].price}</td>
      </tr>
     
    </tbody>
  </table>
</div>
          </div>
    </div>
  )
}

export default OrderTracking
