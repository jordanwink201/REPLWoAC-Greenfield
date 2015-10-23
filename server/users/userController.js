/***

  User Controller

  Save or retreive the existing user to/from the database

***/

var User = require('./userModel.js');
var Utils = require('../config/utility.js');
var Q = require('q');

module.exports = {

  // GET
  signin : function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    //find user in DB
    User.findOne({username: username})
      .then(function (user) {
        if(!user) {
          next(new Error('User does not exist'));
        } else {
          //TODO: authenication(Password)
          //TODO: create session
        }
      });
  },

  signout : function(){
    //TODO: terminate session
  },

  // POST
  createAccount : function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var newUser;

    //checking if username already exits
    User.findOne.({ username: username })
      .then(function (user) {
        if(user) {
          next(new Error('Username already exist'));
        } else {

          //create a new user
          var newUser = new User({username: username, password: password});
          //debugging
          console.log(newUser);

          //saving user to Database
          newUser.save(function (err, newUser) {
            if(err) {
              console.error(err);
            }else {
              //debugging
              console.dir(newUser);
              res.send(newUser.JSON());
            }
          });
        }
    });

  },
  //updating the user i.e Address, Phone Number, Email, Insurance Data..etc
  updateUser : function(req, res, next) {

  }
  
};
