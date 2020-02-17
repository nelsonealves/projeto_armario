let mongoose = require('../database.js');
let cabinet_schema = require('../models/cabinet');
let model_cabinet = mongoose.model('cabinet', cabinet_schema);
let objectid = require('mongodb').ObjectID;

    module.exports.add_cabinet = (req, res) => {
        let cabinet = new model_cabinet(req.body);
        cabinet.save((err, response) => {
            if(err) res.send(err);
            res.status(200).json(response);
        });
    }  

    module.exports.get_cabinet = (req, res) => {
        model_cabinet.aggregate(
            [{
                $match: {
                    _id: objectid(req.params.cabinet_id)
                }
            }],
            (err, result) => {
                if (err) res.send(err);
                res.status(200).json(result);
            }
        );
    }  

    // module.exports.get_by_matricula = (req, res) => {
        
    // }  

    module.exports.get_all_cabinet = (req, res) => {
        model_cabinet.find({},
            (err, msg) => {
                if(err) res.send(err);
                res.status(200).json(msg);
        });
    }  

    module.exports.update_cabinet = (req, res) => {
        model_cabinet.findOneAndUpdate(
            objectid(req.params.cabinet_id), 
            req.body, {new: true},
            (err, result) =>{
                if(err) res.send(err);
                res.status(200).json(result);
            });
    }  

    module.exports.remove_cabinet = (req, res) => {
        model_cabinet.remove({ 
            _id: objectid(req.params.cabinet_id) 
        }, (err, result) => {
                if(err) res.send(err);
                res.status(200).json(result);
            })
    }  

    module.exports.remove_all_cabinet = (req, res) => {
        
    }  

    module.exports.add_cabinet_product = (req, res) => {
        model_cabinet.update(
            {
                _id: objectid(req.params.cabinet_id)
            },{
                $push: {products: req.params.product_id}
            }, (err, result) => {
                if(err) res.send(err);
                res.send(result);
            });
    }  

    module.exports.get_cabinet_products = (req, res) => {
        model_cabinet.findOne({
            _id: objectid(req.params.cabinet_id)
        })
        .populate('products')
        .exec((err, result) => {
            if(err) res.status(505).send(err);
            res.status(200).json(result.products);
        });
    }  

    module.exports.remove_cabinet_product = (req, res) => {
        model_cabinet.findOne(
            {
                _id: objectid(req.params.cabinet_id)
            },{
                $pull: {products: req.params.product_id}
            }, (err, result) => {
                if(err) res.send(err);
                res.send(result);
            });
    }  

    module.exports.remove_cabinet_all_product = (req, res) => {
        model_cabinet.update(
            {
                _id: objectid(req.params.cabinet_id)
            },{
                $set: {products: []}
            }, (err, result) => {
                if(err) res.send(err);
                res.send(result);
            });
    }  


