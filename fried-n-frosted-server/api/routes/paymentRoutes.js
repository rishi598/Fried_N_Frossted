const express = require('express')
const router = express.Router();
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order= require("../models/Order")
const Carts = require("../models/Carts");
const cartController = require('../controllers/cartControllers');



router.post('/create-checkout-session', async (req, res) => {

  const customer = await stripe.customers.create({
    metadata:{
      userId: req.body.userId,
      userName: req.body.userName,
      userMail: req.body.userMail,
      cart: JSON.stringify(req.body.cart)
    }
  })
  console.log("cart: " , req.body.cart)
  const line_items = req.body.cart.map(item => {
    return{
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.recipe,
          metadata: {
            id: item.menuItemId
          }
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }
  })

  
  // const paymentIntent = await stripe.paymentIntents.create({
  //   amount: line_items.reduce((item) => item.unit_amount * item.quantity, 0),
  //   currency: 'inr',
  //   automatic_payment_methods: { enabled: true },
  //   customer: customer.id,
  // });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    payment_method_options: {
      card: {
        // installments: null,
        // mandate_options: null,
        // network: null,
        request_three_d_secure: 'automatic',
      },
    },
    shipping_address_collection: {
      allowed_countries: ['IN'],
    },
    // shipping_options: [
      // {
      //   shipping_rate_data: {
      //     type: 'fixed_amount',
      //     fixed_amount: {
      //       amount: 0,
      //       currency: 'inr',
      //     },
      //     display_name: 'Free shipping',
      //     delivery_estimate: {
      //       minimum: {
      //         unit: 'business_day',
      //         value: 5,
      //       },
      //       maximum: {
      //         unit: 'business_day',
      //         value: 7,
      //       },
      //     },
      //   },
      // },
      
      // {
      //   shipping_rate_data: {
      //     type: 'fixed_amount',
      //     fixed_amount: {
      //       amount: 1500,
      //       currency: 'inr',
      //     },
      //     display_name: 'Next day air',
      //     delivery_estimate: {
      //       minimum: {
      //         unit: 'business_day',
      //         value: 1,
      //       },
      //       maximum: {
      //         unit: 'business_day',
      //         value: 1,
      //       },
      //     },
      //   },
      // },
    // ],
    phone_number_collection: {
      enabled: true
    },
    customer: customer.id,
    line_items: line_items,
    mode: 'payment',
    // payment_intent_data: {
    //   amount: line_items.unit_amount * line_items.quantity,
    //   // setup_future_usage: 'off_session',
    //   currency: 'inr',
    //   automatic_payment_methods: { enabled: true },
    // },
    success_url: `http://localhost:5173/cart`,
    cancel_url: `http://localhost:5173/cart`,
  });
  
  // console.log(session.url)
  res.send({url: session.url});
});


// delete cart items from database 
const deleteCart = async (customer) => {
  console.log(customer.metadata.userMail,"======request")
  const email = customer.metadata.userMail;
 try {
  const deleteCartAfterPayment = await Carts.deleteMany({"email":email})
  console.log("Cart Item Deleted Successfully!")
 } catch (error) {
  console.log(error,"===error")
 }
}

// create order in database
const creatOrder = async (customer, data) => {
  console.log(customer.metadata)
  const items = JSON.parse(customer.metadata.cart);
  const newOrder = new Order({
    userId : customer.metadata.userId,
    name: customer.metadata.userName,
    email: customer.metadata.userMail,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    cart: items,
    subTotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status
  })
  try {
     const saveOrder = await newOrder.save()
     console.log("Proccesed order:", customer.metadata.cart )
     
  } catch (error) {
    console.log(error)
  }
}



// stripe webhook

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret ;

 endpointSecret= "whsec_dc562f7af45f6b33b1d8dcb0171673f488b1ba2f32389ec1222186f693ff4fd9";


router.post('/webhook',
 express.raw({type: 'application/json'}),
  (req, res) => {
  const sig = req.headers['stripe-signature'];
  console.log("webhook is calling")

  let data;
  let eventType;

 
  // bufferBody.toString()

  console.log('headers:', req.headers);
  console.log('Raw body:', req.body);
 var parsedString= JSON.stringify(req.body, null, 2);
 

  if(endpointSecret){
    let event;

    try {
      // Ensure req.body is a Buffer before constructing the event
   
        event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
        console.log('Webhook verified:', event);
   
      
   
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  data = event.data.object;
    eventType = event.type;
    console.log("data:",data)
    console.log("eventType: ",eventType)
  } 
    
  else {
      data = req.body.data.object;
      eventType = req.body.type;
  }

  

  // Handle the event

  if(eventType === "checkout.session.completed"){
    
    stripe.customers.retrieve(data.customer).then(
      (customer) => {
        console.log("customer:",customer);
        console.log("data:" ,data)
        creatOrder(customer, data)
        deleteCart(customer)
        

      }
    ).catch(err => console.log(err.message))
  }
  // switch (event.type) {
  //   case 'payment_intent.succeeded':
  //     const paymentIntentSucceeded = event.data.object;
  //     // Then define and call a function to handle the event payment_intent.succeeded
  //     break;
  //   // ... handle other event types
  //   default:
  //     console.log(`Unhandled event type ${event.type}`);
  // }

  // Return a 200 res to acknowledge receipt of the event
  res.send().end();
});


module.exports = router;