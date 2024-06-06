const  mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId : {
        type: String,
        required: true
    },
    customerId : {
        type: String
        
    },
    paymentIntentId : {
        type: String
        
    },
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    cart: [
        {
            id: { type: String },
            name: { type: String },
            recipe: {type: String},
            price: { type: Number },
            image: { type: String },
            quantity :{ type: Number },
            category: { type: String }
        }
    ],
    subTotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: { type: Object, required: true },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true },

},
{
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema) 
 
module.exports = Order;

