const MongoClient = require('mongodb').MongoClient;
const userInfo="admin:6WwKnjPbMwXG7LGj"
const uri = "mongodb+srv://admin:6WwKnjPbMwXG7LGj@cluster0-lotux.mongodb.net/shop?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

let _db;
let _error;

const MongoConnect = (callback)=>{
    client.connect().then(client => {
        _db=client.db();
        callback();
    }).catch(err => {
        console.log(err);
        _error=err;
        throw err
    })
}

getDB = () => {
    if(_db){
        return _db;
    }else{
        throw _error;
    }
}


exports.MongoConnect = MongoConnect
exports.getDB = getDB

