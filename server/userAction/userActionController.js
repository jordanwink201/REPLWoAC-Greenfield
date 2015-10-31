/***

  User Action Controller

  Save or retreive the existing user to/from the database

***/

var User = require('../user/userModel.js');
    Utils = require('../config/utility.js');
    Q = require('q');
    jwt = require('jwt-simple');

module.exports = {

  /***
    The decode function is always run before any calls to /api/userAction to attach the user object decoded from the token to the request object
  ***/

  /*** GET ***/


  /***
    get the user from the database and send back to the client
  ***/
  readAccount : function(req, res, next){
    console.log('REQUESTsss : ', req.user);

    // this binding must take place in order to access the userSchema.methods
    var findUser = Q.nbind(User.findOne, User);

    //find user in DB
    findUser({ 'username' : req.user.username })
      .then(function (user) {
        if(!user) {
          next(new Error('User does not exist'));
        } else {
          res.json({data : user});
        }
      })
      .catch(function(err){
        res.status(404).send({error : err.message});
      });

  },

  /***
    get ALL the users from the database and send back to the client
  ***/
  readAll : function(req, res, next){
    console.log('getting all of the users in the database...');

    // this binding must take place in order to access the userSchema.methods
    var findAllUsers = Q.nbind(User.find, User);

    // get only the usernames
    findAllUsers({}, 'username fname lname')
      .then(function(allUsers){
        console.log('all users usernames in the database : ', allUsers);
        res.json({ data : allUsers });
      })
      .catch(function(err){
        res.status(404).send({error : err.message});
      });

  },

  // /***
  //   Update the user information, should be restricted to only change parts of the user's information
  //   updating the user i.e Address, Phone Number, Email, Insurance Data..etc
  // }
  // ***/
  // updateUser : function(req, res, next){
  //   console.log('AM I DOINT THIS RIGHT : ', req.user);
  //   var findUser = Q.nbind(User.findOneAndUpdate, User);
  //   findUser({'username' : req.user.username }, {'agentName' : 'BOBBBY'} )
  //     .then(function (user) {
  //       console.log('DID I DO IT????', user);
  //     });
  // }

};
