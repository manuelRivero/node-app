const {ObjectId} = require('mongodb')
const {getDB }= require('./../util/database')

class User {
    constructor (name, email, id = null, cart){
        this.name=name;
        this.email=email;
        this.cart = cart ?  cart :{items:[]}  // {items:[]}
        this._id = id;
        
    }

    save(){

        let db=getDB()
        return db.collection('users').insertOne(this)
    }

    static findById(id){
        
        let db=getDB()
        return db.collection('user').findOne({_id: new ObjectId(id)})
    }

     addToCart(product){
        let newQuantity= 1;
        let cartItems = [...this.cart.items];

        let productIndex = cartItems.findIndex( item => item._id.toString() === product._id.toString());

        if(productIndex >=0){
            newQuantity = cartItems[productIndex].quantity + 1;
            cartItems[productIndex].quantity = newQuantity;
        }else{
            cartItems.push({_id:product._id , quantity:1})
        }


        const updateCart = {items:cartItems}
        let db = getDB();
        return db.collection('user').updateOne({_id: ObjectId(this._id)}, {$set:{cart:updateCart}})
    }

    getCart(){
        let db=getDB();
        let productIndexArray = this.cart.items.map( p => p._id);
        console.log(productIndexArray)
        return db.collection('products').find({_id: {$in: productIndexArray} })
        .toArray()
        .then( products => {
            console.log(products)
            return products.map( p => {
                
                let quantity = this.cart.items.find( i => i._id.toString() === p._id.toString()).quantity;
                
                return {...p, quantity}
            } )
        });



    }
}

module.exports = User;