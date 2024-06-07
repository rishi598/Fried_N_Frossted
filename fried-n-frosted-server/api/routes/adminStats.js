const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Menu = require('../models/Menu')
const Order = require('../models/Order')
const verifyToken = require('../middlewares/verifyToken')
const verifyAdmin = require('../middlewares/verifyAdmin')

// get all orders, users, menu length

router.get('/', async (req, res) => {
    try {
        const users = await User.countDocuments()
        const menuItems = await Menu.countDocuments()
        const orders = await Order.countDocuments()
        
        const result = await  Order.aggregate([{
            $sort: { createdAt: 1 } // Sort by createdAt in ascending order
        },
        {
            $group: {
                _id: 0,
                totalRevenue: { $sum: '$total' },
                firstDate: { $first: '$createdAt' },
                lastDate: { $last: '$createdAt' }
            }
        },
        {
            $project: {
                _id: 0,
                totalRevenue: 1,
                firstDate: 1,
                lastDate: 1
            }
        }])
        const revenueData = result.length > 0 ? result[0] : { totalRevenue: 0, firstDate: null, lastDate: null };
        res.status(200).json({
            users, 
            menuItems, 
            orders,
            revenue: revenueData.totalRevenue,
            firstDate: revenueData.firstDate,
            lastDate: revenueData.lastDate
        })

    } catch (error) {
      res.status(500).send("Internal Server Error" + error.message)  
    }
})

module.exports = router;