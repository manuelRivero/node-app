
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next)=>{
    Product.findAll().then( products =>{
        res.render('shop/product-list', {
            productData: products,
            docTitle:'Shop',
            path:'/product-list'})
        })
};

exports.getProduct = (req, res, next)=>{
    let productId = req.params.productId;
    
    Product.findByPk(productId).then( product =>{
        console.log(product)
        res.render('shop/product-detail',{
         product:product,
         docTitle:product.title,
         path:'/product'
      }) 
     })
    
}

exports.getCar = (req, res, next)=>{
    Cart.fetchProducts((cart)=>{
        res.render('shop/cart', {
        docTitle:'Car',
        path:'/car',
        cart     
    })
    })

};

exports.addToCar = (req, res, next)=>{
    const productId = req.body.id;
    Product.getById(productId, (product)=>{
        if(product){
            Cart.addProduct(product.id, product.price, product.title);
        }
    })
    res.redirect('/cart')
}

exports.getIndex = (req, res, next)=>{
    Product.findAll().then( products =>{
        res.render('shop/product-list', {
            productData: products,
            docTitle:'Shop',
            path:'/product-list'})
        })
};

exports.deleteCartItem = (req, res, next)=>{
    const {id, price}= req.body;
    Cart.deleteProduct(id, price, ()=>{
        res.redirect("/cart")
    })
}