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
    Product.getById(id, (product)=>{
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
    Product.fetchAll( (p)=>{
    res.render('admin/admin-product-list', {
        productData:p,
        docTitle:'Admin products',
        path:'/admin-product-list'
    })        
    })

}

// POSTS REQUEST

exports.postEditProducts = (req, res, next) =>{
    let {id, title, price, imgUrl, description} = req.body;
    Product.update({id, title, price, imgUrl, description}, (p)=>{
        res.redirect(`/admin-product-list`)
    })
    
}
exports.postAddProducts = (req,res,next)=>{
    const {title, price, imgUrl, description} = req.body;
    const product = new Product(title, price, imgUrl, description);
    product.save().then( () =>{
        res.redirect('/')
    }).catch( err => console.log(err));

};

exports.postDeleteProduct = (req, res, next) =>{
    let id= req.body.id;
    Product.deleteById(id, ()=>{
        res.redirect('/');
    })
}

