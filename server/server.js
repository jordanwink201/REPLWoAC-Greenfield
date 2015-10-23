/***

  Server Configuration File

***/

var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://jordanw16:jordanw16@ds041934.mongolab.com:41934/crashdata'); // connect to mongo database

// Call the middleware function and pass the app and express as parameters
require('./config/middleware.js')(app, express);

var port = process.env.PORT || 3001;
console.log('listening on port:', port);
app.listen(port);

module.exports = app;