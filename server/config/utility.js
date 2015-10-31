/***

  Utility Functions

***/

// External Resources
var jwt = require('jwt-simple');

module.exports = {
  /***
    Add this to the middleware that requires a token to retreive the data from the DB
    Decode the token that was attached to the call's headers as 'x-access-token',
    then attach the decoded user object to the request object
  ***/
  decode : function(req, res, next){
    // Console Log
    console.log('Decoding token...');
    // Check for OPTIONS
    if (req.method === 'OPTIONS') {
      // Propogate Success to Client
      res.status(202).send();
    }
    // Get Token
    var token = req.headers['x-access-token'];
    if (!token) {
      // Propogate Error to Client
      return res.status(403).send();
    }
    try{
      // Decode Token
      var user = jwt.decode(token, 'secret');
      // Attach Decoded Token to Request Object
      req.user = user;
      // Continue
      next();
    } catch(err){
      // Console Log
      console.log('Error Decoding Token : ', err);
      // Propogate Error to Client
      return next(err);
    }
  }
};
