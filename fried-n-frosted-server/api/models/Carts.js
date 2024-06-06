const express = require('express')
const mongoose = require('mongoose');

const {Schema} = mongoose;

const cartSchema = new Schema({
    menuItemId: String,
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    category: String,
    recipe: String,
    image: String,
    quantity: Number,
    price: Number,
    email: {
        type: String,
        trim: true,
        required: true,
        
    }
})

const Carts = mongoose.model('Cart', cartSchema);
module.exports = Carts;