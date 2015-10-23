/***

  Crash Routes

***/

var crashController = require('./crashController.js');

module.exports = function (app) {

   // app is equal to crashRouter from the middleware.js


  // GET
  app.get('/read', crashController.readCrashEvent); 

  // POST 
  app.post('/create', crashController.createCrashEvent);
	
};