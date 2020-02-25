
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


/*

exports.createOrder = (req, res,  next)=>{
    const {user}=req;
    let fetechedCart, fetechedProducts;
    user.getCart()
    .then( cart =>  {
        fetechedCart = cart;
        return cart.getProducts()
    })
    .then( products => {
        fetechedProducts = products
        return user.createOrder()  
    })
    .then( order => {
        order.addProducts( fetechedProducts.map(p =>{
            p.orderItem= { quantity: p.cartItem.quantity};
            return p;
        }))
    })
    .then( result => {
        fetechedCart.setProducts(null)
    })
    .then( result =>{
        res.redirect('/orders')
    })
    .catch( err => console.log( err ))
}

exports.getOrders = ( req, res , next) =>{
    const {user} = req;
    user.getOrders({include:['products']})
    .then( orders =>{
        console.log(orders)
        res.render('shop/orders',  {
        docTitle:'Orders',
        path:'/Orders',
        orders })
    })
    .catch(err => console.log(err))
}
exports.deleteCartItem = (req, res, next)=>{
    const {id, price}= req.body;
    const {user} = req;

    user.getCart()
    .then( cart => {
        return cart.getProducts({where:{id: id}})
    })
    .then( ([product]) => {
        
        return product.cartItem.destroy();
    })
    .then( result => {
        res.redirect("/cart")
    })
}

*/