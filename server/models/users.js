'use strict';

let mongoose = require('../database');
let Schema = mongoose.Schema;
let objectid = require('mongodb').ObjectID;

let users_schema = new mongoose.Schema ({
    name: String,
    matricula: String,
    products: [{type: Schema.ObjectId, ref: 'product'}]
    },{collection: 'users'}
);

module.exports = users_schema;