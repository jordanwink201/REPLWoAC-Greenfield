/***

  S3 Routes

***/

// External Resources
var s3Controller = require('./s3Controller.js');

/***
  Export Routes
  app is equal to s3Router from the middleware.js
***/
module.exports = function(app){
  /***
    POST Routes
  ***/
  app.post('/upload', s3Controller.upload);
};
