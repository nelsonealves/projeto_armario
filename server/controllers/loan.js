let mongoose = require('../database.js');
let model_schema = require('../models/loan.js');
let loan_model = mongoose.model('loan', model_schema);
let user_schema = require('../models/users.js');
let user_model = mongoose.model('user', user_schema);
let product_schema = require('../models/product.js');
let product_model = mongoose.model('product', product_schema);
let cabinet_schema = require('../models/cabinet.js');
let cabinet_model = mongoose.model('cabinet', cabinet_schema);
let objectid = require('mongodb').ObjectID;

module.exports.add_loan = (req, res) => {
    console.log('REQ.BODY');
    console.log(req.body);
    req.body.map(item => {
        let loan = new loan_model(item);
        loan.save((err, result) => {
             if(err) res.status(400).send(err)
            product_model.update({
                _id: objectid(loan.product)
            },{
                    $set: {status: item.status}
                }, {new: true},
                (err, result) =>{
                    if(err) result.status(400).send(err);
                   
                });
        });
        
    })

    res.send({res: "ok"});
    
    // model.product.forEach((item, i) => {
    //     console.log("Produto", i)
    //     console.log(item)
    //     // Addding loan product to user 
    //     user_model.update(                  
    //         {
    //             _id: objectid(model.user)
    //         },{
    //             $push: {products: item}
    //         }, (err, result) => {
    //             if(err) res.send(err);
    //             // Desactive product from product available
    //             product_model.update({
    //                 _id: objectid(item)
    //             },{
    //                     $set: {loan: true}
    //                 }, {new: true},
    //                 (err, result) =>{
    //                     if(err) res.status(400).send(err);
    //                 });
    //     });
    // })
    // model.save((err, result) => {
    //     if(err) res.status(400).send(err);
    //     res.send(result);
    // })
    // Desativar produto
}

module.exports.get_loan = (req, res) => {
    loan_model.aggregate(
        [{
            $match: {
                _id: objectid(req.params.model_id)
            }
        }],
        (err, result) => {
            if (err) res.send(err);
            res.status(200).json(result);
        }
    );
}

module.exports.devolute = (req, res) => {
    req.body.forEach((item) => {
        loan_model.remove({
            _id: objectid(item._id)
        }, (err) => {
            product_model.update({
                _id: objectid(item.product._id)
            },  {
                    $set: {status: "0"}
                }, {new: true},
                    (err) =>{
                        if(err) res.status(400).send(err);
                    });
            }
        );    
    })
    res.send({result: "deleted"})
}

module.exports.get_all_loans = (req, res) => {
    loan_model.find({},
        (err, msg) => {
            if(err) res.send(err);
            loan_model.populate(msg, {path: 'product', model: 'product'}, (err, result1) => {
                if(err) res.send(err);
                loan_model.populate(msg, {path: 'user', model: 'user'}, (err, result1) => {
                    if(err) res.send(err);
                    loan_model.populate(msg, {path: 'product.model', model: 'model'}, (err, result1) => {
                        if(err) res.send(err);
                        loan_model.populate(msg, {path: 'product.cabinet', model: 'cabinet'}, (err, result1) => {
                            res.status(200).json(msg);
                        })
                    })
                })
                
            })
                
            
    });
}

module.exports.update_laon = (req, res) => {
    loan_model.findOneAndUpdate(
        objectid(req.params.model_id), 
        req.body, {new: true},
        (err, result) =>{
            if(err) res.send(err);
            res.status(200).json(result);
        });
}

module.exports.get_loan_by_user = (req, res) => {
    loan_model.find({
        user: objectid(req.params.user_id)
    })
    .exec((err, msg) => {
        var options = {
            path: 'product',
            model: 'product'
      };
        loan_model.populate(msg, options, (err, resp)=>{
            if(err) res.send(err);
            var options = {
                path: 'product.model',
                model: 'model'
            };
            loan_model.populate(msg, options, (err, resp)=>{
                if(err) res.send(err)  
                res.send(msg)
            })
            //res.status(200).json(resp.products);
        })
       ;
    })
        
}
