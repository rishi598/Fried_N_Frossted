import React, { useContext } from 'react'
import useOrder from '../../hooks/useOrder';
import { AuthContext } from '../../contexts/AuthProvider';
import { Link, useNavigate } from 'react-router-dom'

const Order = () => {

  const { user } = useContext(AuthContext);
  const [order, refetch] = useOrder();
  const Navigate = useNavigate(); 
  // const orderId = useParams()
  console.log(order)

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      {/** banner */}
      <div className='bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%'>
        <div className='py-28 flex flex-col items-center justify-center'>
          <div className='text-center px-4 space-y-7'>
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Your Ordered<span className="text-orange"> Items</span>
            </h2>
          </div>
        </div>
      </div>
      {/**ordered items */}
      {
        (order.length > 0) ? <div>
        <div className=''>
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
        <th>Total</th>
        <th>Payment Status</th>
        <th>Delivery Status</th>
        {/* <th>Track Order</th> */}
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
      
      order.map((item, index) => (
        
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
        {item.cart[0].name} <span className='text-italic'>    x{item.cart[0].quantity}</span> 
         
         
        </td>
        <td>₹ {item.total / 100}</td>
        <td>{item.payment_status}</td>
        <td>{item.delivery_status}</td>
        {/* <th><button onClick={()=>Navigate(`/track-order/${item._id}`)} className='text-orange'>Track Order</button></th> */}
      </tr>
      ))
     }
      
    </tbody>
    {/* foot */}
    
    
  </table>
</div>
        </div>
      </div> : <div className="text-center mt-20">
        <p>Nothing in your Orders. Please add products.</p>
        <Link to="/menu"><button className="btn bg-orange text-white mt-3">Back to Menu</button></Link>
      </div>
      }
    </div>
  )
}

export default Order
