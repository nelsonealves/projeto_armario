'use strict';

let mongoose = require('../database');
let Schema = mongoose.Schema;
let objectid = require('mongodb').ObjectID;

let model_schema = new Schema ({
    name: String,
    obs: String,
    products: [{type: Schema.ObjectId, ref: 'product'}]
    },{collection: 'model'}
);

module.exports = model_schema;