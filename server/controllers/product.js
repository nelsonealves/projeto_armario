let mongoose = require('../database.js');
let product_schema = require('../models/product');
let model_product = mongoose.model('product', product_schema);
let objectid = require('mongodb').ObjectID;

module.exports.add_product = (express, req, res) => {
	let product = new model_usuario(req.body);
    product.save((err, result) => {
        if(err) result.status(400).send(err);
        result.status(200).json(usuario);
    })
}

module.exports.get_product = (express, req, res) => {
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
