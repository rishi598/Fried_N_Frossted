const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Menu = require('../models/Menu')
const Order = require('../models/Order')
const verifyToken = require('../middlewares/verifyToken')
const verifyAdmin = require('../middlewares/verifyAdmin')

router.get('/', async(req, res) => {
    try {
       const result = await Order.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'email', // Assuming 'email' is the field in orders collection to join on
                foreignField: 'email', // Assuming 'email' is the field in users collection to join on
                as: 'userDetails'
            }
        },
        {
            $unwind: '$userDetails'
        },
        {
            $group: {
                _id: '$userDetails.name', // Group by email
                orderCount: { $sum: 1 } // Count the number of orders
            }
        },
        // {
        //     $sort: { orderCount: -1 } // Optional: Sort by the number of orders in descending order
        // },
        {
            $project: {
                email: '$_id', // Project the email field
                orderCount: 1, // Project the order count
                _id: 0 // Exclude the _id field from the result
            }
        }
        
       ]) 
       res.json(result)
    } catch (error) {
        res.status(500).send("Internal Server Error" + error.message)  
    }
})

module.exports = router;