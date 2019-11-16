
const express = require('express')

const bodyParser = require('body-parser')
const path = require('path');


const adminRouter = require('./routes/admind')
const shopRouter = require('./routes/shop')

const app = express();

const notFound = require('./controllers/error')
app.set('view engine', 'pug');
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended:false}))

app.use(adminRouter);
app.use(shopRouter);

app.use(express.static(path.join(__dirname, 'public')))

app.use( notFound.notFound)

app.listen(5000);


