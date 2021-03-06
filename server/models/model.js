'use strict';

let mongoose = require('../database');
let Schema = mongoose.Schema;
let objectid = require('mongodb').ObjectID;

let model_schema = new Schema ({
    name: String,
    obs: String,
    provider: {
        type: Schema.ObjectId, 
        ref: 'provider'
    }
    },{collection: 'model'}
);

module.exports = model_schema;