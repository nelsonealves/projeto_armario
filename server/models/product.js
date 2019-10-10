'use strict';

let mongoose = require('../database');
let Schema = mongoose.Schema;
let objectid = require('mongodb').ObjectID;

let product_schema = new mongoose.Schema ({
    marca: String,
    model: String,
    emprestado: Boolean,
    who: {type: Schema.ObjectId, ref: 'users'},
    where: {type: Schema.ObjectId, ref: 'users'},

    },{collection: 'product'}
);

module.exports = product_schema;