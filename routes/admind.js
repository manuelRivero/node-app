const express = require('express');

const admindRouter = express.Router()

const productsController = require('../controllers/admin')

admindRouter.get( '/add-product', productsController.getAddProducts )

admindRouter.post('/add-product', productsController.postAddProducts )

admindRouter.get('/admin-product-list', productsController.getAdminProducts)

admindRouter.get('/edit-product/:id', productsController.getEditProducts)

admindRouter.post('/admin-delete', productsController.postDeleteProduct)

admindRouter.post('/edit-product', productsController.postEditProducts)

module.exports=admindRouter;
