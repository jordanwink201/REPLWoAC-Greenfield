/***

  Server Configuration File

***/

// External Resources
var express = require('express');
var mongoose = require('mongoose');

// Define Express
var app = express();
// Mongoose DB Connection
mongoose.connect('mongodb://jordanw16:jordanw16@ds041934.mongolab.com:41934/crashdata');
// Call the middleware function and pass the app and express as parameters
require('./config/middleware.js')(app, express);
// Define Server Port
var port = process.env.PORT || 8100;
// Console Log
console.log('listening on port:', port);
// Define Express Listening Port
app.listen(port);

// Export Express
module.exports = app;
