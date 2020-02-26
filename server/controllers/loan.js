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
    let model = new loan_model(req.body);
    console.log(model);
    model.product.forEach((item, i) => {
        console.log("Produto", i)
        console.log(item)
        // Addding loan product to user 
        user_model.update(                  
            {
                _id: objectid(model.user)
            },{
                $push: {products: item}
            }, (err, result) => {
                if(err) res.send(err);
                // Desactive product from product available
                product_model.update({
                    _id: objectid(item)
                },{
                        $set: {loan: true}
                    }, {new: true},
                    (err, result) =>{
                        if(err) res.status(400).send(err);
                    });
        });
    })
    model.save((err, result) => {
        if(err) res.status(400).send(err);
        res.send(result);
    })
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
    //console.log(req.body);
    req.body.forEach((item) => {
        console.log('item');
        console.log(item);
        product_model.update({
            _id: objectid(item.id)
        },{
                $set: {loan: false}
            }, {new: true},
            (err, result) =>{
                if(err) res.status(400).send(err);
                res.send(result)
            });

    })
    
}

module.exports.get_all_loan = (req, res) => {
    loan_model.find({},
        (err, msg) => {
            if(err) res.send(err);
            res.status(200).json(msg);
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

module.exports.remove_loan = (req, res) => {
    loan_model.remove({ 
        _id: objectid(req.params.model_id) 
    }, (err, result) => {
            if(err) res.send(err);
            res.status(200).json(result);
        })
}