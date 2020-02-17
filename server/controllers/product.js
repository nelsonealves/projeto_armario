let mongoose = require('../database.js');
let product_schema = require('../models/product');
let model_product = mongoose.model('product', product_schema);
let model_schema = require('../models/model');
let model_model = mongoose.model('model', model_schema);
let cabinet_schema = require('../models/cabinet');
let model_cabinet = mongoose.model('cabinet', cabinet_schema);
let objectid = require('mongodb').ObjectID;

module.exports.add_product = (req, res) => {
	let product = new model_product(req.body);
    product.save((err, result) => {
        if(err) res.status(400).send(err);
        model_model.update(
            {
                _id: objectid(req.params.model_id)
            },{
                $push: {products: result._id}
            }, (err, result) => {
                if(err) res.send(err);
                res.status(200).json(result);
            });
    })
}

module.exports.add_many_products = (req, res) => {
    let id_products= [];
    model_product.insertMany(req.body,(err, result1) => {
        if(err) console.log(err);
            if (Array.isArray(result1)){
                result1.forEach(element => {
                    id_products.push(element._id)
                })
                
                console.log(result1);
                
                model_cabinet.updateMany(
                    {
                        _id: objectid(result1[0].cabinet)
                    },{
                        $push: {products: id_products}
                    }, (err, result2) => {
                        if(err) res.send(err);
                        console.log(result2);
                        res.send(result2);
                    }
                );
                
            }
        //console.log(res);
    })       
}

module.exports.get_products = (req, res) => {
    model_product.find({})
    .populate('model')
    .populate('cabinet')
    .exec((err, element) => {
        if(err) res.status(505).send(err);
        res.status(200).json(element);
    })
}
module.exports.get_a_product = (express, req, res) => {
    model_product.aggregate(
        [{
            $match: {
                _id: objectid(req.params.product_id)
            }
        }],
        (err, result) => {
            if (err) res.status(400).send(err);
            res.status(200).json(result);
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

