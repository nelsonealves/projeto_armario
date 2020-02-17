'use strict';

let mongoose = require('../database');
let Schema = mongoose.Schema;
let objectid = require('mongodb').ObjectID;

let loan_schema = new mongoose.Schema ({
    product: [{
        type: Schema.ObjectId, 
        ref:'products'  
    }],
    user: {
        type: Schema.ObjectId, 
        ref:'user'
    },
    date: Date,
    return: Boolean,
    obs: String
    },{
        collection: 'loan'
    }
);

module.exports = loan_schema;