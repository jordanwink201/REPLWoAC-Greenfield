/***

  S3 Routes

***/

var s3Controller = require('./s3Controller.js');

/***
  app is equal to s3Router from the middleware.js
***/
module.exports = function(app){

  // GET
  

  // POST 
  app.post('/upload', s3Controller.upload);
  

};
