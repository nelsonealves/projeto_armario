'use strict';

let mongoose = require('../database');
let Schema = mongoose.Schema;
let objectid = require('mongodb').ObjectID;

let emprestimo_schema = new Schema ({
    emprestado:  Boolean,
    who: {type: Schema.ObjectId, ref: 'users'},
    products: [{type: Schema.ObjectId, ref: 'product'}],
    observation: String
    },{collection: 'emprestimo'}
);

module.exports = emprestimo_schema; 