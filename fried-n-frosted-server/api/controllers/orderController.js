const Order = require('../models/Order')
const mongoose = require('mongoose');

const getOrderByEmail = async (req, res) => {
    try {
        const email = req.query.email;
       
        const query = {"email": email}
        const result = await Order.find(query);
 
        res.status(200).json(result);
        console.log(result)
    } catch (error) {
        res.status(500).json({message: error.message});
    }

    
}

const getAllOrderItems = async(req,res) => {
    console.log("getAllOrderItems")
    try{
        const orders = await Order.find({});
        res.status(200).json(orders);
        console.log(orders+"===============result on order")
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const singleOrderItem = async (req, res) => {
    const orderId = new mongoose.Types.ObjectId(req.params.id);
    try {
     const order = await Order.findById(orderId);
     res.status(200).json(order);   
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

const updateOrder = async (req, res) => {
    const orderId = new mongoose.Types.ObjectId(req.params.id);
    const { delivery_status } = req.body;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId, { delivery_status }, {new: true, runValidators: true}
        );
        if(!updatedOrder) {
            return res.status(404).json({message:"Order item is not found"})
        }
        res.status(200).json(updatedOrder)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getOrderByEmail,
    getAllOrderItems,
    singleOrderItem, 
    updateOrder
}