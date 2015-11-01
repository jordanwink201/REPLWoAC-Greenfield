/***

  User Action Routes

***/

// External Resources
var userActionController = require('./userActionController.js');

/***
  Export Routes
  app is equal to userActionRouter from the middleware.js
***/
module.exports = function(app){
  /***
    GET Routes
  ***/
  app.get('/read', userActionController.readAccount);
  app.get('/readAll', userActionController.readAll);
};
