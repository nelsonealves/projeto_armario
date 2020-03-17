let mongoose = require('../database.js');
let provider_schema = require('../models/provider');
let provider_model = mongoose.model('provider', provider_schema);
let objectid = require('mongodb').ObjectID;

module.exports.add_provider = (req, res) => {
    let provider = new provider_model(req.body);
    provider.save((err, result) => {
        if(err) res.send(err);
        res.status(200).json(result);
    });
}

module.exports.get_provider = (req, res) => {
    provider_model.aggregate(
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

module.exports.get_all_provider = (req, res) => {
    provider_model.find({},
        (err, msg) => {
            if(err) res.send(err);
            res.status(200).json(msg);
    });
}

module.exports.update_provider = (req, res) => {
    provider_model.findOneAndUpdate(
        objectid(req.params.provider_id), 
        req.body, {new: true},
        (err, result) =>{
            if(err) res.send(err);
            res.status(200).json(result);
        });
}

module.exports.remove_provider = (req, res) => {
    provider_model.remove({ 
        _id: objectid(req.params.provider_id) 
    }, (err, result) => {
            if(err) res.send(err);
            res.status(200).json(result);
        })
}