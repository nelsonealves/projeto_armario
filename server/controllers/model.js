let mongoose = require('../database.js');
let model_schema = require('../models/model');
let model_model = mongoose.model('model', model_schema);
let objectid = require('mongodb').ObjectID;

module.exports.add_model = (req, res) => {
    let model = new model_model(req.body);
    model.save((err, result) => {
        if(err) res.send(err);
        res.status(200).json(result);
    });
}

module.exports.get_model = (req, res) => {
    model_model.aggregate(
        [{
            $match: {
                _id: objectid(req.params.provider_id)
            }
        }],
        (err, result) => {
            if (err) res.send(err);
            res.status(200).json(result);
        }
    );
}

module.exports.get_model_by_provider = (req, res) => {

    model_model.aggregate(
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


module.exports.get_all_model = (req, res) => {
    model_model.find({},
        (err, msg) => {
            if(err) res.send(err);
            res.status(200).json(msg);
    });
}

module.exports.update_model = (req, res) => {
    model_model.findOneAndUpdate(
        objectid(req.params.model_id), 
        req.body, {new: true},
        (err, result) =>{
            if(err) res.send(err);
            res.status(200).json(result);
        });
}

module.exports.remove_model = (req, res) => {
    model_model.remove({ 
        _id: objectid(req.params.model_id) 
    }, (err, result) => {
            if(err) res.send(err);
            res.status(200).json(result);
        })
}