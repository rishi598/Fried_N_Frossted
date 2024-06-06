import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Checkout from './Checkout'
import useCart from '../../hooks/useCart'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK)

const PaymentForm = () => {
    const [cart] = useCart();
    //  calculate the prices
    const cartTotal = cart.reduce((sum, item) => sum + item.price,0)
    console.log(cart)
    console.log(cart.name)
    const totalPrice = parseFloat(cartTotal.toFixed(2));
    // console.log(totalPrice)
  return (
    <div>
      <Elements stripe={stripePromise}>
      <Checkout price={totalPrice} cart={cart}/>
    </Elements>
    </div>
  )
}

export default PaymentForm
