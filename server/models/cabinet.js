'use strict';

let mongoose = require('../database');
let Schema = mongoose.Schema;
let objectid = require('mongodb').ObjectID;

let cabinet_schema = new mongoose.Schema ({
    number: String,
    name: String,
    },{collection: 'cabinet'}
);

module.exports = cabinet_schema;