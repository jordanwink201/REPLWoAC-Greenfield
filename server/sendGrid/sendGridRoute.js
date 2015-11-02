/***

SendGrid Routes

***/

var sendGrid = require('./sendGridController.js');

/***
  app is equal to sendGridRouter from the middleware.js
***/
module.exports = function(app){

  // GET

  // POST 
  app.post('/sendEmail', sendGrid.sendEmail);

};

