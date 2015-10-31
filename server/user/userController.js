/***

  User Controller
  Save or retreive the existing user to/from the database

***/

// External Resources
var User = require('./userModel.js'),
    Utils = require('../config/utility.js'),
    Q = require('q'),
    jwt = require('jwt-simple');

module.exports = {
/***
  GET
***/

  /***
    Lookup account by username
  ***/
  getAccountByUserName : function(req, res, next){
    // Console Log
    console.log('Get Account by UserName : ', req.query.username);
    // Create Promise
    var findUser = Q.nbind(User.findOne, User);
    // Mongoose Query
    findUser({ 'username' : req.query.username })
      .then(function(user){
        if(!user) {
          // Propogate Error to Client
          throw(new Error('User could not be found'));
        } else {
          // Console Log
          console.log('user retreived from DB : ', user);
          // Propogate Data to Client
          res.send(user);
        }
      })
      .catch(function(err){
        // Propogate Error to Client
        res.status(404).send({error : err.message});
      });
  },

/***
  POST
***/

  /***
    Find the user based on the username in the DB
    then check the save password for that found user and see if it's the same as the one entered by the user attached to the request object
    if the passwords match, create a token for the user and send it back to the client
  ***/
  signin : function(req, res, next){
    // Console Log
    console.log('Sign In user...');
    // Create Promise
    var findUser = Q.nbind(User.findOne, User);
    // Mongoose Query
    findUser({ 'username' : req.body.username })
      .then(function (user) {
        if(!user) {
          // Propogate Error to Client
          throw(new Error('User could not be found'));
        } else {
          return user.comparePasswords(req.body.password)
            .then(function(doesMatch){
              if(!doesMatch){
                // Propogate Error to Client
                throw(new Error('Password does not match the username'));
              } else {
                // Console Log
                console.log('Found User...');
                // Create Token
                var token = jwt.encode(user, 'secret');
                // Propogate Token to Client
                res.json({ token : token });
              }
            });
        }
      })
      .catch(function(err){
        // Propogate Error to Client
        res.status(404).send({error : err.message});
      });
  },

  /***
    Create New User Account
  ***/
  createAccount : function(req, res, next) {
    // Console Log
    console.log('Create New Account...');
    // Create Promise
    var findOne = Q.nbind(User.findOne, User); // find user in DB
    var create = Q.nbind(User.create, User); // create new user in DB
    // Mongoose Query
    User.findOne({ 'username' : req.body.username })
      .then(function (user) {
        if(user) {
          // Propogate Error to Client
          throw new Error('Username already exists');
        } else {
          // Create Object
          var newUser = {
            fname : req.body.fname,
            lname : req.body.lname,
            username : req.body.username,
            password : req.body.password,
            phone : req.body.phone,
            dob : req.body.dob,
            email : req.body.email,
            license : req.body.license,
            licenseState : req.body.licenseState,
            insurance : req.body.insurance,
            policy : req.body.policy,
            agent : req.body.agent,
            agentEmail : req.body.agentEmail
          };
          return create(newUser);
        }
      })
      .then(function(newUserCreated){
        // Console Log
        console.log('New User Stored in DB : ', newUserCreated);
        // Create Token
        var token = jwt.encode(newUserCreated, 'secret');
        // Propogate Token to Client
        res.json({ token : token });
      })
      .catch(function(err){
        // Propogate Error to Client
        res.status(404).send({error : err.message});
      });
  },

  /***
    Update the user information, should be restricted to only change parts of the user's information
    updating the user i.e Address, Phone Number, Email, Insurance Data..etc
  ***/
  updateUser : function(req, res, next){
    // Console Log
    console.log('Update existing user...');
    // Create New Object
    var userUpdate = {
      fname : req.body.fname,
      lname : req.body.lname,
      dob : req.body.dob,
      phone : req.body.phone,
      email : req.body.email,
      license : req.body.license,
      licenseState : req.body.licenseState,
      insurance : req.body.insurance,
      policy : req.body.policy,
      agent : req.body.agent,
      agentEmail : req.body.agentEmail
    };
    // Create Promise
    var findUserUpdate = Q.nbind(User.findOneAndUpdate, User);
    // Mongoose Query
    findUserUpdate({'username' : req.body.username }, userUpdate )
      .then(function(data) {
        // Console Log
        console.log('Updated User in DB : ', req.body);
        // Create Token
        var token = jwt.encode(req.body, 'secret');
        // Propogate Token to Client
        res.json({ token : token });
      })
      .catch(function(err){
        // Propogate Error to Client
        res.status(404).send({error : err.message});
      });
  }

};
