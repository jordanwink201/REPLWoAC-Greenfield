/***

  User Routes

***/

var userController = require('./userController.js');

/***
  app is equal to userRouter from the middleware.js
***/
module.exports = function(app){

  // POST 
  app.post('/signin', userController.signin);
  app.post('/create', userController.createAccount);

};
