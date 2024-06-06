const express = require('express');
const router = express.Router();
const Order = require('../models/Order')
const orderController = require('../controllers/orderController')

router.get('/', orderController.getOrderByEmail),
router.get('/get', orderController.getAllOrderItems),
router.get('/:id',orderController.singleOrderItem ),
router.put('/:id', orderController.updateOrder)

module.exports = router;