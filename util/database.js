const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://<username>:<password>@cluster0-lotux.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

const Connect = callback =>{
    client.connect(err => {
  callback(client)
});
}

module.exports.Connect = Connect
