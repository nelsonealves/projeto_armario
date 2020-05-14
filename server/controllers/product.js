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
    console.log(req.body);
    let id_products= [];
    model_product.insertMany(req.body,(err, result1) => {
        if(err) console.log(err);
    	res.status(200).send({status: "ok"});	                
    });
                
}
        //console.log(res);
module.exports.get_by_cabinet = (req, res) => {
    model_product.aggregate(
        [{
            $match: {
                cabinet: objectid(req.params.cabinet_id)
            }
        }],
        (err, result) => {
            if (err) res.status(400).send(err);
            
            model_product.populate(result, {path: 'cabinet', model: 'cabinet'}, (err, result1) => {
                if(err) res.send(err);
                
                model_product.populate(result1, {path: 'model',model: 'model'}, (err, resp)=>{
                    if(err) res.send(err);
                    
                    model_product.populate(resp, {path: 'model.provider', model: 'provider'}, (err, resp)=>{
                        if(err) res.send(err)  
                        res.status(200).send(resp)
                    })
                })
            })
        }
    )
}

module.exports.get_by_model = (req, res) => {
    model_product.aggregate(
        [{
            $match: {
                model: objectid(req.params.model_id)
            }
        }],
        (err, result) => {
            if (err) res.status(400).send(err);
            
            model_product.populate(result, {path: 'cabinet', model: 'cabinet'}, (err, result1) => {
                if(err) res.send(err);
                
                model_product.populate(result1, {path: 'model',model: 'model'}, (err, resp)=>{
                    if(err) res.send(err);
                    
                    model_product.populate(resp, {path: 'model.provider', model: 'provider'}, (err, resp)=>{
                        if(err) res.send(err)  
                        res.status(200).send(resp)
                    })
                })
            })
        }
    )
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

