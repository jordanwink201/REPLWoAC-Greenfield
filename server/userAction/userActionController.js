/***

  User Action Controller
  Save or retreive the existing user to/from the database
  The decode function is always run before any calls to /api/userAction to attach the user object decoded from the token to the request object

***/

// External Resources
var User = require('../user/userModel.js'),
    Utils = require('../config/utility.js'),
    Q = require('q'),
    jwt = require('jwt-simple');

module.exports = {
/***
  GET
***/

  /***
    get the user from the database and send back to the client
  ***/
  readAccount : function(req, res, next){
    // Console Log
    console.log('Read Account : ', req.user);
    // Create Promise
    var findUser = Q.nbind(User.findOne, User);
    // Mongoose Query
    findUser({ 'username' : req.user.username })
      .then(function (user) {
        if(!user) {
          // Propogate Error to Client
          next(new Error('User does not exist'));
        } else {
          // Propogate Data to Client
          res.json({data : user});
        }
      })
      .catch(function(err){
        // Propogate Error to Client
        res.status(404).send({error : err.message});
      });
  },

  /***
    get ALL the users from the database and send back to the client
  ***/
  readAll : function(req, res, next){
    // Console Log
    console.log('Retreive all of Users...');
    // Create Promise
    var findAllUsers = Q.nbind(User.find, User);
    // Mongoose Query
    findAllUsers({}, 'username fname lname profileImgUrl')
      .then(function(allUsers){
        // Console Log
        console.log('All users from DB : ', allUsers);
        // Propogate Data to Client
        res.json({ data : allUsers });
      })
      .catch(function(err){
        // Propogate Error to Client
        res.status(404).send({error : err.message});
      });
  }

};
