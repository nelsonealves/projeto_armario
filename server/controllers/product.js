let mongoose = require('../database.js');
let product_schema = require('../models/product');
let model_product = mongoose.model('product', product_schema);
let objectid = require('mongodb').ObjectID;

module.exports.add_product = (req, res) => {
	let product = new model_product(req.body);
    product.save((err, result) => {
        if(err) result.status(400).send(err);
        res.status(200).json(result);
    })
}

module.exports.get_products = (express, req, res) => {
    model_product.find({},
        (err, msg) => {
            if(err) res.send(err);
            res.status(200).json(msg);
    });
}
module.exports.get_a_product = (express, req, res) => {
    model_product.aggregate(
        [{
            $match: {
                _id: objectid(req.params.product_id)
            }
        }],
        (err, result) => {
            if (err) result.status(400).send(err);
            result.status(200).json(result);
        }
    );
}

module.exports.update_product = (req, res) => {
    model_product.findOneAndUpdate(
        objectid(req.params.product_id), 
        req.body, {new: true},
        (err, result) =>{
            if(err) res.status(400).send(err);
            res.status(200).json(result);
        });
}

module.exports.remove_product = (req, res) => {
    model_product.remove({ 
        _id: objectid(req.params.product_id) 
    }, (err, result) => {
            if(err) res.status(400).send(err);
            res.status(200).json(result);
        })
}
module.exports.remove_user_product = (req, res) => {
    
}
