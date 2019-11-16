
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next)=>{
    Product.fetchAll().then( ([rows, fieldData]) =>{
        res.render('shop/product-list', {
            productData: rows,
            docTitle:'Shop',
            path:'/product-list'})
        })
};

exports.getProduct = (req, res, next)=>{
    let productId = req.params.productId;
    
    Product.getById(productId).then( ([product])=>{
        console.log(product)
        res.render('shop/product-detail',{
         product:product[0],
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
    Product.fetchAll().then( ([rows, fieldData])=>{
    res.render('shop/index', {
        productData:rows,
        docTitle:'Shop',
        path:'/'       
    })
})
};

exports.deleteCartItem = (req, res, next)=>{
    const {id, price}= req.body;
    Cart.deleteProduct(id, price, ()=>{
        res.redirect("/cart")
    })
}