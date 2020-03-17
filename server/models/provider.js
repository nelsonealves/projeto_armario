'use strict';

let mongoose = require('../database');
let Schema = mongoose.Schema;
let objectid = require('mongodb').ObjectID;

let provider_schema = new mongoose.Schema ({
    name: String,
    },{collection: 'provider'}
);

module.exports = provider_schema;