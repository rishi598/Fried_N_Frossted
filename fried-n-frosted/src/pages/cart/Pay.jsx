import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../contexts/AuthProvider'
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PLlaiSA2ddTZTUXoH59ayBQomH6jFvUjOpzDrDVJELzQhDYxZnQIiOBuAWphMTg9QsXxHcAhAfrOJ1Xxp6KxPuC00Rx0Bobvy');


const Pay = ({cart}) => {

    const { user } = useContext(AuthContext);
    const [error, setError] = useState(null);

   const handleCheckout = async () => {
    try {
      // console.log(cart)
   const response = await axios.post('http://localhost:6001/stripe/create-checkout-session', {
        cart,
        
        userId: user?.uid,
        userName: user?.displayName || "None",
        userMail: user?.email
    });
    const { url } = response.data;
    window.location.href = url;
    // console.log(sessionId)
    // const stripe = await stripePromise;
    //   const { error: stripeError } = await stripe.redirectToCheckout({
    //      sessionId,
    //   });
    //   if (stripeError) {
    //     setError(stripeError.message);
    //   }
    } catch (error) {
      setError(error.message);
    }
   }
  return (
    <div>
      <button className='btn btn-md bg-orange text-white px-8 py-1 mt-5' onClick={() => handleCheckout()}>Proceed to Checkout</button>
    </div>
  )
}

export default Pay
