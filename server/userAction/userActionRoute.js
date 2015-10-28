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

  // POST 
  // app.post('/updateuser', userActionController.updateUser);  // TODO: after MVP

};
