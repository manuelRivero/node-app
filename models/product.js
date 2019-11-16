fs = require('fs');
path = require('path')
const db = require('../util/database');
cart = require('./cart');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getAllProducts = cb => {
    fs.readFile(p, (err, data)=>{
        if(err){
            return cb([]);
        }
        
        cb(JSON.parse(data))
    })
}

module.exports = class Product {
    constructor(title, price, imgUrl, description){
        this.title = title;
        this.price = price;
        this.imgUrl = imgUrl;
        this.description = description;
    }

    save(){
        return db.execute('INSERT INTO products (title, price, imgUrl, description) VALUES (?, ?, ?, ?)',
        [this.title, this.price, this.imgUrl, this.description]);
    }

    static fetchAll(){
        return db.execute('SELECT * from products');

    }

    static deleteById(id){
        return db.execute('SELECT * FROM productos WHERE idproducts === ?', [id])
    }

    static update(product, cb){
        let {id}=product;
        getAllProducts( products => {
            let productId = products.findIndex(prod => prod.id === parseInt(id) )
            products[productId] = {...product, id:parseInt(id)};
            
            fs.writeFile(p, JSON.stringify(products), (err)=>{
                if(!err){
                    return cb();
                }
                console.log(err)
            })
            
            
        } )
    }

    static getById(id){
        return db.execute('SELECT * FROM products WHERE id = ?', [id])
    }
}

