/***

  Crash Routes

***/

// External Resources
var eventController = require('./eventController.js');

/***
  Export Routes
  app is equal to eventRouter from the middleware.js
***/
module.exports = function(app){
  /***
    GET Routes
  ***/
  app.get('/read', eventController.readCrashEvent);
  /***
    POST Routes
  ***/
  app.post('/create', eventController.createCrashEvent);
};
