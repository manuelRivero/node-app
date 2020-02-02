
const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');

// Routes
/*
const adminRouter = require('./routes/admind');
const shopRouter = require('./routes/shop');
*/
const app = express();

const notFound = require('./controllers/error');

const {Connect} = require('./util/database')



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

/*app.use(adminRouter);
app.use(shopRouter);
*/

app.use(express.static(path.join(__dirname, 'public')));

app.use( notFound.notFound);

Connect( (client)=> {
    app.listen(5000)
    console.log(client)
})

