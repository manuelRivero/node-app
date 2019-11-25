const Product = require('../models/product');

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
    Product.findByPk(id).then( product=>{
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
    Product.findAll()
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
    Product.findByPk(id)
    .then( product =>{
        product.title=title;
        product.price=price;
        product.imgUrl=imgUrl;
        product.description=description;
        return product.save()
    })
    .then( response =>{
        console.log("update susscesfull!");
        res.redirect(`/admin-product-list`)

    })
    .catch( err=> console.log(err))
    
    
}
exports.postAddProducts = (req,res,next)=>{
    const {title, price, imgUrl, description} = req.body;
    Product.create({
        title,
        price,
        imgUrl,
        description
    })
    .then( result => {
        res.redirect('/admin-product-list');
    })
    .catch( err => console.log(err))
};

exports.postDeleteProduct = (req, res, next) =>{
    let id= req.body.id;
    Product.findByPk(id)
    .then(product=>{
        return product.destroy()
    })
    .then( response=>{
        res.redirect('/admin-product-list');
    })
    .catch( err => console.log(err));
}

