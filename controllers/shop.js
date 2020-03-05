
const Product = require('../models/product');


exports.getProducts = (req, res, next)=>{
    Product.fetchAll().then( products =>{

        res.render('shop/product-list', {
            productData: products,
            docTitle:'Shop',
            path:'/product-list'})
        })
};

exports.getProduct = (req, res, next)=>{
    const {productId} = req.params;
    Product.findById(productId).then( product =>{
        console.log(product)
        res.render('shop/product-detail',{
         product:product,
         docTitle:product.title,
         path:'/product'
      }) 
     })
    
};

exports.getCar = (req, res, next)=>{
    const {user} = req;
    user.getCart()
    .then( products =>{
        res.render('shop/cart', 
        { docTitle:'Car',
        path:'/car',
        cart:products }
        );    
    })

};

exports.addToCar = (req, res, next)=>{
    const productId = req.body.id;
    const {user} = req;
    console.log(user)
    Product.findById(productId)
    .then( product => {
        return user.addToCart(product)
    })
    .then( ()=> {
        res.redirect('/cart')
    } )
    .catch( err => console.log(err));
    
    
}

exports.getIndex = (req, res, next)=>{
    Product.fetchAll().then( products =>{
        console.log(products)
        res.render('shop/product-list', {
            productData: products,
            docTitle:'Shop',
            path:'/product-list'})
        })
};


exports.deleteCartItem = (req, res, next)=>{
    const {id, price}= req.body;
    const {user} = req;

    user.deleteFromCart(id)
    .then( result => {
        res.redirect("/cart")
    }).catch( err => console.log(err))
}


exports.createOrder = (req, res,  next)=>{
    const {user}=req;
    user.addOrder()
    .then( result =>{
        res.redirect('/orders')
    })
    .catch( err => console.log( err ))
}

exports.getOrders = ( req, res , next) =>{
    const {user} = req;
    user.getOrders(user._id)
    .then( orders =>{
        console.log(orders)
        res.render('shop/orders',  {
        docTitle:'Orders',
        path:'/Orders',
        orders })
    })
    .catch(err => console.log(err))
}
