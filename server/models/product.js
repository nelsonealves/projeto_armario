'use strict';

let mongoose = require('../database');
let Schema = mongoose.Schema;
let objectid = require('mongodb').ObjectID;

// status: {0: "Disponivel", 1: "Emprestado", 2: "Sem volta"};
let product_schema = new mongoose.Schema ({
    model: {type: Schema.ObjectId, ref: 'model'},
    cabinet: {type: Schema.ObjectId, ref: 'cabinet'},
    status: {type: String, default: "0"},
    loan: {
        type: Boolean,
        default: false
    }
    },{collection: 'product'}
);

module.exports = product_schema;