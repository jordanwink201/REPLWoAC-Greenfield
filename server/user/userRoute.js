/***

  User Routes

***/

// External Resources
var userController = require('./userController.js');

/***
  Export Routes
  app is equal to userRouter from the middleware.js
***/
module.exports = function(app){
  /***
    GET Routes
  ***/
  app.get('/read', userController.getAccountByUserName);
  /***
    POST Routes
  ***/
  app.post('/signin', userController.signin);
  app.post('/create', userController.createAccount);
  app.post('/updateuser', userController.updateUser);
};
