/***

  User Action Routes

***/

var userActionController = require('./userActionController.js');

/***
  app is equal to userActionRouter from the middleware.js
***/
module.exports = function(app){

  // GET
  app.get('/read', userActionController.readAccount);
  app.get('/readAll', userActionController.readAll);

  // POST
  // app.post('/updateuser', userActionController.updateUser);  // TODO: after MVP

};
