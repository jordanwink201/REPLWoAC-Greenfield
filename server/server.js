/***

  Server Configuration File

***/

var express = require('express');
var mongoose = require('mongoose');

var app = express();

// mongoose.connect('mongodb://localhost/dbname'); // connect to mongo database

// Call the middleware function and pass the app and express as parameters
require('./config/middleware.js')(app, express);

console.log('listening on port 3001');
app.listen(3001);

module.exports = app;