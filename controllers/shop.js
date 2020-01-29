
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
    
};

exports.getCar = (req, res, next)=>{
    const {user} = req;
    user.getCart().then( (cart)=>{
        return cart.getProducts()
    })
    .then( products =>{
        console.log(products)
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
    let fetchCart;
    let finalQuantity = 1;

    user.getCart().then( cart =>{
        fetchCart=cart;
        return cart.getProducts({where:{id: productId}});
    })
    .then( ([product]) =>{
        
        if(product){
            finalQuantity = product.cartItem.quantity + 1;
            return product;
        }
        return Product.findByPk(productId);
    })
    .then( finalProduct =>{
        return fetchCart.addProduct(finalProduct, {through: {quantity: finalQuantity}})
    })
    .then( ()=> res.redirect("/cart"));
    
}

exports.getIndex = (req, res, next)=>{
    Product.findAll().then( products =>{
        res.render('shop/product-list', {
            productData: products,
            docTitle:'Shop',
            path:'/product-list'})
        })
};

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