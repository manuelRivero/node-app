const express = require('express');

const shopRouter = express.Router();

const shopController = require('../controllers/shop')

shopRouter.get( '/', shopController.getIndex )

//shopRouter.get('/cart', shopController.getCar)

shopRouter.get('/product-list', shopController.getProducts)

shopRouter.get('/product/:productId', shopController.getProduct)

//shopRouter.get('/orders', shopController.getOrders)

// POST

//shopRouter.post('/create-order', shopController.createOrder);

//shopRouter.post('/cart-add-product', shopController.addToCar)

//shopRouter.post('/cart-delete-product', shopController.deleteCartItem)


module.exports = shopRouter;