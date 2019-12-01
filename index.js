
const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');

// Routes
const adminRouter = require('./routes/admind');
const shopRouter = require('./routes/shop');

const sequelize = require('./util/database');

const app = express();

const notFound = require('./controllers/error');

// models
const Product = require('./models/product');
const User = require('./models/user');

app.set('view engine', 'pug');
app.set('views', 'views')


app.use(bodyParser.urlencoded({extended:false}))

app.use( (req, res, next)=>{
    User.findByPk(1)
    .then( user =>{
        req.user = user;
        next();
    })
    .catch(err=> console.log(err))
})

app.use(adminRouter);
app.use(shopRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.use( notFound.notFound);

Product.belongsTo(User, {constraints:true, onDelete:"CASCADE"});

sequelize.sync()
.then( res =>{
    return User.findByPk(1)
})
.then( user =>{
    if(!user){
       return User.create({
            name:"manuel",
            email:"manuel.enrique.r.v@gmail.com"
        })

        return user
    }
})
.then( user =>{
    console.log(user)
    app.listen(5000)
})
.catch( err => console.log(err))




