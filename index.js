
const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');

// Routes

const adminRouter = require('./routes/admind');
const shopRouter = require('./routes/shop');

const app = express();

const notFound = require('./controllers/error');

const {MongoConnect} = require('./util/database');

const User = require('./models/user');

app.set('view engine', 'pug');
app.set('views', 'views')


app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));


app.use( (req, res, next)=>{
    User.findById('5e40a04b702bf81eec17ebbc')
    .then( user =>{
        req.user = new User(user.name, user.email, user._id, user.cart );
        
        next();
    })
    .catch( err => {
        console.log("erro");
        console.log(err)
    })
})

app.use(adminRouter);
app.use(shopRouter);
app.use( notFound.notFound);



MongoConnect( ()=> app.listen(5000))

