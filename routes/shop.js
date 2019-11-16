const express = require('express');

const shopRouter = express.Router();

const shopController = require('../controllers/shop')

shopRouter.get( '/', shopController.getIndex )

shopRouter.get('/cart', shopController.getCar)

shopRouter.get('/product-list', shopController.getProducts)

shopRouter.get('/product/:productId', shopController.getProduct)

// POST

shopRouter.post('/cart-add-product', shopController.addToCar)

shopRouter.post('/cart-delete-product', shopController.deleteCartItem)


module.exports = shopRouter;