/***

  Crash Routes

***/

var eventController = require('./eventController.js');

/***
  app is equal to eventRouter from the middleware.js
***/
module.exports = function(app){

  // GET
  app.get('/read', eventController.readCrashEvent); 

  // POST 
  app.post('/create', eventController.createCrashEvent);

};
