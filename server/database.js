let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/armario', {useNewUrlParser: true});

module.exports = mongoose;
