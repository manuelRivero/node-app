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
        return db.collection('user').updateOne({_id: new ObjectId(this._id)}, {$set:{cart:updateCart}})
    }

    getCart(){
        let db=getDB();
        let productIndexArray = this.cart.items.map( p => p._id);
        
        return db.collection('products').find({_id: {$in: productIndexArray} })
        .toArray()
        .then( products => {
            return products.map( p => {
                
                let quantity = this.cart.items.find( i => i._id.toString() === p._id.toString()).quantity;
                
                return {...p, quantity}
            } )
        });



    }

    deleteFromCart(productId){
        let updateCart = this.cart.items.filter( p => p._id.toString() !== productId.toString());
        let db=getDB()
        
        return db.collection('user').updateOne({_id: new ObjectId(this._id)}, {$set:{cart:{items:updateCart}}})


    }

    addOrder(){
        let db=getDB()
        const orderInfo = {
            user:{
                _id: new ObjectId(this._id),
                name: this.name},
            items:this.cart.items
        }
        return db.collection('orders').insertOne(orderInfo)
        .then(result =>{
            this.cart.items=[]
            return db.collection('user').updateOne({_id: new ObjectId(this._id)}, {$set:{cart:this.cart}})
        })
    }
    getOrders(){
        let db=getDB();
        return db.collection('orders').find({'user._id': new ObjectId(this._id)}).toArray()
    }
}

module.exports = User;