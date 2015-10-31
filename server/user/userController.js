/***

  User Controller

  Save or retreive the existing user to/from the database

***/

var User = require('./userModel.js');
    Utils = require('../config/utility.js');
    Q = require('q');
    jwt = require('jwt-simple');

module.exports = {

  // GET
  getAccountByUserName : function(req, res, next){

    var usernameToLookUp = req.query.username;

    var findUser = Q.nbind(User.findOne, User); // this binding must take place in order to access the userSchema.methods

    findUser({ 'username' : usernameToLookUp })
      .then(function (user) {
        if(!user) {
          throw(new Error('User could not be found'));
        } else {
          res.send(user);
        }
      })
      .catch(function(err){
        res.status(404).send({error : err.message});
      });
  },

  // POST
  signin : function(req, res, next){

    var usernameToLookUp = req.body.username;
    var password = req.body.password;

    var findUser = Q.nbind(User.findOne, User);

    /***
      Find the user based on the username in the DB
      then check the save password for that found user and see if it's the same as the one entered by the user attached to the request object
      if the passwords match, create a token for the user and send it back to the client
    ***/
    findUser({ 'username' : usernameToLookUp })
      .then(function (user) {
        if(!user) {
          throw(new Error('User could not be found'));
        } else {
          return user.comparePasswords(password)
            .then(function(doesMatch){
              if(!doesMatch){
                throw(new Error('Password does not match the username'));
              } else {
                // Create a session token for the user and send it back
                var token = jwt.encode(user, 'secret');
                res.json({ token : token });
              }
            });
        }
      })
      .catch(function(err){
        res.status(404).send({error : err.message});
      });
  },

  createAccount : function(req, res, next) {

    var usernameToLookUp = req.body.username;

    var findOne = Q.nbind(User.findOne, User); // find user in DB
    var create = Q.nbind(User.create, User); // create new user in DB

    // checking if username already exits
    User.findOne({ 'username' : usernameToLookUp })
      .then(function (user) {
        if(user) {
          throw new Error('Username already exists');
        } else {
          // create the new user to store in DB
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
        console.log('new user successfully stored in database : ', newUserCreated);
        // Create a session token for the user and send it back
        var token = jwt.encode(newUserCreated, 'secret');
        res.json({ token : token });

      })
      .catch(function(err){
        res.status(404).send({error : err.message});
      });

  },

  /***
    Update the user information, should be restricted to only change parts of the user's information
    updating the user i.e Address, Phone Number, Email, Insurance Data..etc
  ***/
  updateUser : function(req, res, next){
     var userUpdate = {
      phone : req.body.phone,
      email : req.body.email,
      license : req.body.license,
      licenseState : req.body.licenseState,
      insurance : req.body.insurance,
      policy : req.body.policy,
      agent : req.body.agent,
      agentEmail : req.body.agentEmail
    };
    var findUserUpdate = Q.nbind(User.findOneAndUpdate, User);

    /***********
    // Might be an error in the future
    *******/

    findUserUpdate({'username' : req.body.username }, userUpdate )
      .then(function(data) {
        console.log('Updated user successfully stored in database : ', req.body);
        // Create a session token for the user and send it back
        var token = jwt.encode(req.body, 'secret');
        res.json({ token : token });

      })
      .catch(function(err){
        res.status(404).send({error : err.message});
      });
  }

};
