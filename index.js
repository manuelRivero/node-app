
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
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item');
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

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

//Sequelize Relationship inicialitation

Product.belongsTo(User, {constraints:true, onDelete:"CASCADE"});

// User
User.hasMany(Product);
User.hasOne(Cart);
User.hasMany(Order)

// Cart
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});

// Product
Product.belongsToMany(Cart, {through: CartItem});
Product.belongsToMany(Order, {through: OrderItem});

// Order
Order.belongsTo(User);
Order.belongsToMany(Product, {through: OrderItem});





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
    }
    return user
})
.then( user =>{
    user.getCart().then( car =>{
        if(!car){
            return user.createCart()
        }
        return;
    })
   
})
.then( res =>  app.listen(5000) )
.catch( err => console.log(err))




