let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://intelbras:lockinet@0.0.0.0:27017/test', {useNewUrlParser: true});

module.exports = mongoose;
