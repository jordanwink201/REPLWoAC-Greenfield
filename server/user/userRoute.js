/***

  User Routes

***/

var userController = require('./userController.js');

module.exports = function(app){

  // app is equal to userRouter from the middleware.js

  // GET
  app.get('/read', userController.readAccount);

  // POST 
  app.post('/signin', userController.signin);
  app.post('/create', userController.createAccount);
  app.post('/updateuser', userController.updateUser);  //TODO: after MVP

};
