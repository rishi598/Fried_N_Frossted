const express = require('express')
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 6001;
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripe = require('./api/routes/paymentRoutes')
app.use(cors());


// console.log()

// middleware
 
 

app.use(express.json({verify: (req,res,buf) => { req.rawBody = buf }}));
 app.use('/stripe', stripe)

//  rishiram122000
// 2Li5RHzYSlbLT0dp
// mongodb+srv://rishiram122000:2Li5RHzYSlbLT0dp@fried-n-frossted.o8isf4n.mongodb.net/

// mongodb

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@fried-n-frossted.o8isf4n.mongodb.net/fried-n-frossted?retryWrites=true&w=majority&appName=fried-n-frossted`).then(
  console.log("Mongodb connected successfully")
).catch((error) => console.log("Error connecting to mongodb", error))

// jwt authentication
app.post('/jwt', async (req,res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr"
  })
  res.send({token})
})



// import routes
const menuRoutes = require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes = require('./api/routes/userRoutes');
const orderRoutes = require('./api/routes/orderRoutes')
const adminStats = require('./api/routes/adminStats');
const orderStats = require('./api/routes/ordersStats');
const userStats = require('./api/routes/userStats')
app.use('/users', userRoutes);
app.use('/menu', menuRoutes);
app.use('/carts', cartRoutes);
app.use('/order', orderRoutes);
app.use('/adminStats', adminStats);
app.use('/orderStats', orderStats);
app.use('/userStats', userStats)



// app,use('/pay', paymentRoutes);

// stripe payment routes
// Create a PaymentIntent with the order amount and currency
// app.post('/create-checkout-session', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price_data: {
//           currency: 'inr',
//           product_data: {
//             name: 'T-shirt',
//           },
//           unit_amount: 2000,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${process.env.CLIENT_URL}/checkout-success`,
//     cancel_url: `${process.env.CLIENT_URL}/cart`,
//   });

//   res.send({url: session.url});
// });




app.get('/', (req, res) => {
  res.send('Hello Fried And Frossted Server!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})