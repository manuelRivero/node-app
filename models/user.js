const {ObjectId} = require(mongodb)
const {getDB }= require('./../util/database')

class User {
    constructor (name, email, id = null){
        this.name=name;
        this.email=email;
        this.id = 
    }

    static save(){

        let db=getDB()
        return db.colletion('users').insertOne(this)
    }

    static findById(id){
        
        let db=getDB()
        return db.colletion('users').findOne({_id: new ObjectId(id)})
    }
}

module.exports = user;