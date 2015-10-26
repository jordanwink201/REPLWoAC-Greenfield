/***

  Crash Event Controller

***/

var CrashEvent = require('./eventModel.js');
var Utils = require('../config/utility.js');
var Q = require('q');

module.exports = {
  
  /*** GET ***/

  /***
    controller : (username to lookup by future: get this info from window.localStorage)
    factory/service : url = 'api/event/read' ($http send current user object)
    return from server : all crash events related to the current user
  ***/
  readCrashEvent :  function (req, res, next) {

    console.log('read all crash events... for user ', req.user.username);
    var usernameToLookUp = req.user.username;

    // this binding must take place in order to access the eventSchema.methods
    var findCrashEvents = Q.nbind(CrashEvent.find, CrashEvent);

    findCrashEvents({ 'user' : usernameToLookUp })
      .then(function (crashEvents) {
        if(!crashEvents) {
          throw(new Error('No crash events could be found'));
        } else {

          console.log('CRASH EVENTS : ', crashEvents);
          res.send(crashEvents);

        }
      })
      .catch(function(err){
        console.log('error finding the crash events in...', err);
        res.status(404).send({error : err.message});
      });
    
      
  },

  /*** POST ***/

  /***
    controller : (crash obj)
    factory/service : url = 'api/event/create' ($http send crash obj and user obj)
    return from server : success or failure
  ***/
  createCrashEvent : function (req, res, next) {

    console.log('create a crash event... :', req.body);
    
    var create = Q.nbind(CrashEvent.create, CrashEvent);

    var newCrashEvent = {

      user : req.user.username,

      witness : req.body.witnessArr,

      accidentPhotoUrls : [],

      otherPartyInfo : {
        firstName : req.body.crashDriver.firstName,
        lastName : req.body.crashDriver.lastName,
        username : req.body.crashDriver.username, 

        phoneNumber : req.body.crashDriver.phoneNumber,
        dob : req.body.crashDriver.dob,
        email : req.body.crashDriver.email,
        driverLicenseNum : req.body.crashDriver.driverLicenseNum,
        driverLicenseState : req.body.crashDriver.driverLicenseState,
        insuranceCompany : req.body.crashDriver.insuranceCompany,
        policyNum : req.body.crashDriver.policyNum,
        agentName : req.body.crashDriver.agentName,
        agentEmail : req.body.crashDriver.agentEmail,

        licensePhotoUrl : '',
        insuranceCardPhotoUrl : '',
      }

    };

    create(newCrashEvent)
      .then(function(crashEvent){
        console.log('new user successfully stored in database : ', crashEvent);
      })
      .catch(function(err){
        console.log('error created the crash event...', err);
        res.status(404).send({error : err.message});
      });


  }

};
