import React, { useContext, useEffect, useState } from 'react'
import useCart from '../../hooks/useCart';
import { AuthContext } from '../../contexts/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../hooks/useAxiosSecure';
// import 'bootstrap/dist/css/bootstrap.min.css';

const Checkout = ({price, cart}) => {

  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [cardError, setCardError] = useState("");
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    if(typeof price !== 'number' || price < 1) {
      return;
    }
    axiosSecure.post('/create-payment-intent', {price})
    .then(res => {
      console.log(res.data.clientSecret)
      setClientSecret(res.data.clientSecret)
    })
  }, [price, axiosSecure])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

     // Use your card Element with other Stripe.js APIs
     const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });
    // if(checkoutInput.fullname === null && checkoutInput.phone === null && checkoutInput.email === null && checkoutInput.address === null && checkoutInput.city === null && checkoutInput.state === null && checkoutInput.country === null && checkoutInput.zipcode === null){
    //   setError(error.name, error.phone, error.email, error.address, error.city, error.state, error.country, error.zipcode)
    // } 
    // else {
      if (error) {
        console.log('[error]', error);
        setCardError(error.message)
      } else {
        console.log('[PaymentMethod]', paymentMethod);
        setCardError("")
        // submitOrder()
      }
    // }
    

    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: checkoutInput.fullname,
            email: checkoutInput.email,
            phone: checkoutInput.phone,
            // address: [
            //   checkoutInput.address,
            //    checkoutInput.city,
            //    checkoutInput.state,
            //    checkoutInput.country,
            //    checkoutInput.zipcode
            // ]
          },
        },
      },
      {
        handleActions: false, // Optional: if you want to handle actions manually
        description: 'Export transaction for goods/services description' // Add the required description here
      }
    );

    if(confirmError) {
      console.log(confirmError)
    }
    console.log(paymentIntent)
  }

  const { user } = useContext(AuthContext);
  const navigate = useNavigate()
  // console.log(user.email)

  const [checkoutInput, setCheckoutInput] = useState({
    fullname: '',
    // lastname: '',
    phone: '',
    email: user.email,
    address: '',
    city: '',
    state: '',
    country: '',
    zipcode: ''

  })

  const [error, setError] = useState([])

  const handleInput = (e) => {
    e.persist();
    setCheckoutInput({...checkoutInput, [e.target.name]: e.target.value})
  }

  const submitOrder = (e) => {
    e.preventDefault();
    const data = {
      fullname: user.name,
      // lastname: checkoutInput.lastname,
      phone: checkoutInput.phone,
      email: user.email,
      address: checkoutInput.address,
      city: checkoutInput.city,
      state: checkoutInput.state,
      country: checkoutInput.country,
      zipcode: checkoutInput.zipcode,
      // product: cart,
      // price: price
    }

    axios.post(``, data).then(res => {
      if(res.data.status === 200){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your order has been placed",
          showConfirmButton: false,
          timer: 1500
        });
        setError([]);
        navigate('/thank-you')
      } else if(res.data.status === 422){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "All Fields are mandatory!",
          // footer: '<a href="#">Why do I have this issue?</a>'
        });
        setError(res.data.errors);
      }
    });
  }

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-28' >
     <div className="py-3 bg-orange">
                <div className="container">
                    <h6 className= 'text-white p-3'>Home / Checkout</h6>
                </div>
            </div>

            <div className="py-8 flex justify-center">
  <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Basic Information</h2>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block mb-1">Full Name</label>
            <input type="text" name="fullname" onChange={handleInput} value={checkoutInput.fullname} className="input input-bordered w-full" />
            <small className='text-danger'>{error.fullname}</small>
          </div>
          {/* <div>
            <label className="block mb-1">Last Name</label>
            <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className="input input-bordered w-full" />
            <small className='text-danger'>{error.lastname}</small>
          </div> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block mb-1">Phone Number</label>
            <input type="text" name="phone" onChange={handleInput} value={checkoutInput.phone} className="input input-bordered w-full" />
            <small className='text-danger'>{error.phone}</small>
          </div>
          <div>
            <label className="block mb-1">Email Address</label>
            <input type="email" name="email" onChange={handleInput} value={checkoutInput.email} className="input input-bordered w-full" />
            <small className='text-danger'>{error.email}</small>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Full Address</label>
          <textarea name="address" onChange={handleInput} value={checkoutInput.address} className="textarea textarea-bordered w-full"></textarea>
          <small className='text-danger'>{error.address}</small>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div>
            <label className="block mb-1">City</label>
            <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className="input input-bordered w-full" />
            <small className='text-danger'>{error.city}</small>
          </div>
          <div>
            <label className="block mb-1">State</label>
            <input type="text" name="state" onChange={handleInput} value={checkoutInput.state} className="input input-bordered w-full" />
            <small className='text-danger'>{error.state}</small>
          </div>
          <div>
            <label className="block mb-1">Country</label>
            <input type="text" name="country" onChange={handleInput} value={checkoutInput.country} className="input input-bordered w-full" />
            <small className='text-danger'>{error.country}</small>
          </div> 
          <div>
            <label className="block mb-1">Pin Code</label>
            <input type="text" name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} className="input input-bordered w-full" />
            <small className='text-danger'>{error.zipcode}</small>
          </div>
        </div>
        {/* <div className="flex justify-end">
          <button type="submit" className="btn btn-primary" onClick={submitOrder}>Place Order</button>
        </div> */}
      </form>
    </div>
    <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div className='flex-1 overflow-y-auto' style={{maxHeight: '300px'}}>
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {
              cart.map((item, index) => (
                <tr key={index}>
              <td className="px-4 py-2 whitespace-nowrap">{item.name}</td>
              <td className="px-4 py-2 whitespace-nowrap">{item.price}</td>
              <td className="px-4 py-2 whitespace-nowrap">{item.quantity}</td>
              <td className="px-4 py-2 whitespace-nowrap">{item.price * item.quantity}</td>
            </tr>
              ))
            }
            {/* <tr>
              <td className="px-4 py-2 whitespace-nowrap">{cart.name}</td>
              <td className="px-4 py-2 whitespace-nowrap">9000</td>
              <td className="px-4 py-2 whitespace-nowrap">2</td>
              <td className="px-4 py-2 whitespace-nowrap">{cart.price}</td>
            </tr> */}
            <tr>
              <td className="px-4 py-2 whitespace-nowrap font-bold" colSpan="3">Grand Total</td>
              <td className="px-4 py-2 whitespace-nowrap font-bold">{price}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-6 space-y-5">
        <h2 className="text-lg font-semibold">Payment Information</h2>
        <h5 className='font-medium '>Credit/Debit Card</h5>
        <form className='space-y-5' onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button type="submit" className='btn btn-primary w-full'>
        Place Order
      </button>
    </form>
    {
      cardError ? <p className='text-red italic text-xs'>{cardError}</p> : ""
    }
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default Checkout
