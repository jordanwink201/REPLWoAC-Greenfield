/***

  User Routes

***/

var userController = require('./userController.js');

module.exports = function(app){

  // app is equal to userRouter from the middleware.js

  // GET
  app.get('/signin', userController.signin);
  app.get('/signout', userController.signout);
  app.get('/read', userController.readAccount);

  // POST 
  app.post('/create', userController.createAccount);
  app.post('/updateuser', userController.updateUser);  //TODO: after MVP

};
