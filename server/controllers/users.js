let mongoose = require('../database.js');
let usuario_schema = require('../models/users');
let model_usuario = mongoose.model('users', usuario_schema);
let objectid = require('mongodb').ObjectID;

module.exports.add_user = (req, res) => {
    let usuario = new model_usuario(req.body);
    usuario.save((err, usuario) => {
        if(err) res.send(err);
        res.status(200).json(usuario);
    });
}

module.exports.get_user = (req, res) => {
    model_usuario.aggregate(
        [{
            $match: {
                _id: objectid(req.params.user_id)
            }
        }], 
        (err, result) => {
            if (err) res.send(err);
            res.status(200).json(result);
        }
    );
}

module.exports.get_by_matricula = (req, res) => {
    model_usuario.aggregate(
        [{
            $match: {
                matricula: { $regex: req.params.matricula, $options: 'i' } 
            }
        }],
        (err, result) => {
            if (err) res.send(err);
            res.status(200).json(result);
        }
    );
}

module.exports.get_all_user = (req, res) => {
    model_usuario.find({})
    .exec(
        (err, msg) => {
            if(err) res.send(err);
            res.status(200).json(msg);
    });
}

module.exports.user_pagination = (req, res) => {
    model_usuario.find({})
    .limit(parseInt(req.params.limit))
    .skip(parseInt(req.params.skip) * parseInt(req.params.limit))
    .exec(
        (err, msg) => {
            if(err) res.send(err);
            res.status(200).json(msg);
    });
}

module.exports.user_count = (req, res) => {
    model_usuario.find({})
    .exec(
        (err, msg) => {
            if(err) res.send(err);
            res.status(200).json(msg.length);
    });
}

module.exports.update_user = (req, res) => {
    model_usuario.findOneAndUpdate(
        objectid(req.params.user_id), 
        req.body, {new: true},
        (err, result) =>{
            if(err) res.send(err);
            res.status(200).json(result);
        });
}

module.exports.remove_user = (req, res) => {
    model_usuario.remove({ 
        _id: objectid(req.params.user_id) 
    }, (err, result) => {
            if(err) res.send(err);
            res.status(200).json(result);
        })
}


module.exports.add_user_product = (req, res) => {
    model_usuario.update(
        {
            _id: objectid(req.params.user_id)
        },{
            $push: {products: req.params.product_id}
        }, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
}

module.exports.get_user_products = (req, res) => {
    model_usuario.findOne({
        _id: objectid(req.params.user_id)
    })
    .populate('products')
    .exec((err, result) => {
        if(err) res.status(505).send(err);
        var options = {
            path: 'products.model',
            model: 'model'
      };
        model_usuario.populate(result, options, (err, resp)=>{
            res.status(200).json(resp.products);
        })
        
    });
}

module.exports.remove_user_product = (req, res) => {
    model_usuario.findOne(
        {
            _id: objectid(req.params.user_id)
        },{
            $pull: {products: req.params.product_id}
        }, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
}


module.exports.remove_user_all_product = (req, res) => {
    model_usuario.update(
        {
            _id: objectid(req.params.user_id)
        },{
            $set: {products: []}
        }, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
}
