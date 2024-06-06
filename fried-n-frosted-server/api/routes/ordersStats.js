const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Menu = require('../models/Menu')
const Order = require('../models/Order')
const verifyToken = require('../middlewares/verifyToken')
const verifyAdmin = require('../middlewares/verifyAdmin')

//  get all orders stats
router.get('/', async(req, res) => {
   try {
    const result = await Order.aggregate([
        {
            $unwind: '$cart'
        },
        // {
        //     $lookup: {
        //         from: 'menus',
        //         localField: 'cart',
        //         foreignField: '_id',
        //         as: 'menuItemDetails'
        //     }
        // },
        // {
        //     $unwind: '$menuItemDetails'
        // },
        {
            $group: {
                _id: '$cart.category',
                quantity: {$sum: '$cart.quantity'},
                revenue: {$sum: '$cart.price'}

            }

        },
        {
            $project: {
                _id: 0,
                category: '$_id',
                quantity: '$quantity',
                revenue: '$revenue'
            }
        }
    ])
    res.json(result)
    console.log(result)
   } catch (error) {
    res.status(500).send("Internal Server Error" + error.message)  
   }
})

module.exports = router;