const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');


module.exports = class Cart{

    static addProduct(id, price, name){
        fs.readFile(p, (err, fileContent)=>{
            let cart = {product:[], totalPrice:0}
            if(!err){
                cart = JSON.parse(fileContent);
                
            }

            let existingProductIndex = cart.product.findIndex(pro => pro.id === id);
            console.log(existingProductIndex + "index")

            let updatedProduct;
            if(cart.product[existingProductIndex]){
                updatedProduct = {...cart.product[existingProductIndex] };
                updatedProduct.qty = updatedProduct.qty +1;
                cart.product[existingProductIndex]= updatedProduct;
            }else{
                updatedProduct = { id, name, qty:1}
                cart.product = [...cart.product, updatedProduct];
            }
            cart.totalPrice = +cart.totalPrice + +price
            fs.writeFile(p, JSON.stringify(cart), err => console.log(err));
        })
    }

    static fetchProducts(cb){
        fs.readFile(p, (err, fileContent)=>{
            let cart = {product:[], totalPrice:0}
            if(!err){
                cart = JSON.parse(fileContent)
            }
            cb(cart)
        })
    }

    static deleteProduct(id, price, cb){
        fs.readFile(p, (err, cartData)=>{
            if(err){
                return;
            }
            let updateCart = {...JSON.parse(cartData)}
            let product = updateCart.product.find( p => p.id === parseInt(id));
            if(!product){
                return null
            }
            console.log(product)
            updateCart.product = updateCart.product.filter( p => p.id !== parseInt(id));
            updateCart.totalPrice= updateCart.totalPrice - (product.qty * parseInt(price));

            fs.writeFile(p, updateCart, (err)=>{
                cb();
                if(err){
                    console.log(err);
                }
            })
            
        })
    }
}