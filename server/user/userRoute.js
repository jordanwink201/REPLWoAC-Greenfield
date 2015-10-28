/***

  User Routes

***/

var userController = require('./userController.js');

/***
  app is equal to userRouter from the middleware.js
***/
module.exports = function(app){

  // GET
  app.get('/read', userController.getAccountByUserName);

  // POST 
  app.post('/signin', userController.signin);
  app.post('/create', userController.createAccount);

  app.post('/updateuser', userController.updateUser);  // TODO: after MVP
};
