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
  signout : function(){
    //TODO: terminate session
  },

  readAccount : function(req, res, next){
    console.log('read username account: ', username);
    var username = req.query.username;

    var findOne = Q.nbind(User.findOne, User);

    //find user in DB
    User.findOne(req.query.username)
      .then(function (user) {
        if(!user) {
          next(new Error('User does not exist'));
        } else {
          //TODO: authenication(Password)
          //TODO: create session
          console.log('user found', user);
          // send back the user
          res.json({data : user});
        }
      });

  },

  // POST
  signin : function(req, res, next){

    console.log('sign the user in by checking the database...', req.body);
    var username = req.body.username;
    var password = req.body.password;

    //find user in DB
    User.findOne({username: username})
      .then(function (user) {
        if(!user) {
          next(new Error('User does not exist'));
        } else {
          
          console.log('found the user : ', user, ' now check the password...');
          //TODO: authenication(Password)
          
          //TODO: create session

        }
      });
  },

  createAccount : function(req, res, next) {
    console.log('create an account... :', req.body);
    
    var username = req.body.username;
    
    var findOne = Q.nbind(User.findOne, User); // find user in DB
    var create = Q.nbind(User.create, User); // create new user in DB

    // checking if username already exits
    User.findOne({ username: username })
      .then(function (user) {
        if(user) {
          throw new Error('Username already exists');
        } else {
          console.log('creat a new user...');
          // create the new user to store in DB
          var newUser = {
            firstName : req.body.firstname,
            lastName : req.body.lastname,
            username : req.body.username,
            password : req.body.password,
            phoneNumber : req.body.phoneNumber,
            dob : req.body.dob, 
            email : req.body.email,
            driverLicenseNum : req.body.driverLicenseNum,
            driverLicenseState : req.body.driverLicenseState,
            insuranceCompany : req.body.insuranceCompany,
            policyNum : req.body.policyNum,
            agentName : req.body.agentName,
            agentEmail : req.body.agentEmail
          };
          return create(newUser);

        }
      })
      .then(function(newUserCreated){
        console.log('new user successfully stored in database : ', newUserCreated);
        // Create a session token for the user and send it back along with the newly created user object
        var token = jwt.encode(newUserCreated, 'secret');
        res.json({ token : token, user : newUserCreated });

      })
      .catch(function(err){
        console.log('error created the user...', err);
        res.status(404).send({error : err.message});
      });

  },
  //updating the user i.e Address, Phone Number, Email, Insurance Data..etc
  updateUser : function(req, res, next) {

  }
  
};
