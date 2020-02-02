const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:C8Hk7lUffGcLAeQr@cluster0-lotux.mongodb.net/shop?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

let _db;
let _error;

const MongoConnect = ()=>{
    client.connect().then(client => {
        _db=client.db();
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

