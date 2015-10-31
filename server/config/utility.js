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

    if (req.method === 'OPTIONS') {
      res.status(202).send();
    }

    var token = req.headers['x-access-token'];

    if (!token) {
      return res.status(403).send(); // send forbidden response since there is no token provided
    }

    try{ // decode

      var user = jwt.decode(token, 'secret');
      // attach user object to request object
      console.log('DECODING....\n');
      console.log('user decoded from token : ', user);
      req.user = user;
      next();
    } catch(err){
      console.log('ERROR DECODING : ', err);
      return next(err);
    }

  }

};
