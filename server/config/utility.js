/***

  Utility Functions

***/

var jwt = require('jwt-simple');

/***
  Add this to the middleware that requires a token to retreive the data from the DB
  Decode the token that was attached to the call's headers as 'x-access-token',
  then attach the decoded user object to the request object
***/

module.exports = {

  decode : function(req, res, next){
    var token = req.headers['x-access-token'];

    if (!token) {
      return res.status(403).send(); // send forbidden response since there is no token provided
    }

    try{ // decode
      
      var user = jwt.decode(token, 'secret');
      // attach user object to request object
      req.user = user;
      next();
    } catch(err){
      return next(err);
    }

  }

};
