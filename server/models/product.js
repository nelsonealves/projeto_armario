'use strict';

let mongoose = require('../database');
let Schema = mongoose.Schema;
let objectid = require('mongodb').ObjectID;

let product_schema = new mongoose.Schema ({
    model: {type: Schema.ObjectId, ref: 'model'},
    cabinet: {type: Schema.ObjectId, ref: 'cabinet'},
    loan: {
        type: Boolean,
        default: false
    }
    },{collection: 'product'}
);

module.exports = product_schema;