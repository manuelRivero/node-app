const Product = require('../models/product');
const mongodb = require('mongodb')

exports.getAddProducts = (req, res, next)=>{

    res.render('admin/add-product', {
        docTitle:'Add product',
        path:'/add-product',
        editin:false
        }
        )
};

exports.getEditProducts = (req, res, next) =>{
    let editing = req.query.edit;
    if(!editing){
        return res.redirect('/');
    }
    let id = req.params.id;
    Product.findById(id).then( product=>{
        if(!product){
            return res.redirect('/')
        }
        res.render('admin/add-product', {
            docTitle:'Edit product',
            path:'/edit-product',
            product,
            editing
        })
    })

}
exports.getAdminProducts = ( req, res, next) =>{
    Product.fetchAll()
    .then(products =>{
        res.render('admin/admin-product-list', {
        productData:products,
        docTitle:'Admin products',
        path:'/admin-product-list'
        }) 
    })
    .catch( err => console.log(err));
}

// POSTS REQUEST

exports.postEditProducts = (req, res, next) =>{
    let {id, title, price, imgUrl, description} = req.body;
    console.log(req.body)
    const product = new Product(title,price,imgUrl,description, id)
    product.save()
    .then( response =>{
        console.log("update susscesfull!");
        res.redirect(`/admin-product-list`)

    })
    .catch( err=> console.log(err))
    
    
}


exports.postAddProducts = (req,res,next)=>{
    const {title, price, imgUrl, description} = req.body;
    console.log(req.user)
    let product = new Product(title, price, imgUrl, description, null, req.user._id )
    product.save()
    .then( result => {
        res.redirect('/admin-product-list');
    })
    .catch( err => console.log(err))
};

exports.postDeleteProduct = (req, res, next) =>{
    let id= req.body.id;
    console.log(req.body)
    Product.destroy(id)
    .then( response=>{
        res.redirect('/admin-product-list');
    })
    .catch( err => console.log(err));
}


