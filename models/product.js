const {getDB} = require('./../util/database');
const mongodb = require('mongodb');

class products {
    constructor(title, price, imgUrl, description, id, userId){
        this.title=title;
        this.price=price;
        this.description=description;
        this.imgUrl=imgUrl;
        this._id= id ? new mongodb.ObjectId(id) : null;
        this.userId= userId
    }
    save(){
        console.log("save")
        let dbOp;
        let a;
        let db=getDB();
        if(this._id){
            a=1
            dbOp= db.collection('products').updateOne({_id: this._id}, {$set:this})
        }else{
            a=2
            dbOp= db.collection('products').insertOne(this);
        }
        console.log(a)
        return dbOp;
    }

    static fetchAll(){
        let db=getDB();

        return db
        .collection('products')
        .find()
        .toArray()
        .then( products => products)
        .catch( err => console.log(err))
    }

    static findById(id){
        let db=getDB();
        return db.collection('products').find({_id: new mongodb.ObjectId(id)}).next();
    }

    static destroy(id){
        console.log(id)
        let db=getDB();
        return db.collection('products').deleteOne({_id:new mongodb.ObjectId(id)})
    }
}

/*

const products = sequelize.define('products',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    title:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    price:{
        type:Sequelize.DOUBLE,
        allowNull: false,
    },
    imgUrl:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    description:{
        type:Sequelize.STRING,
        allowNull: false,

    }
})

*/

module.exports = products;