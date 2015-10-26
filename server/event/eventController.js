/***

  Crash Event Controller

***/

var CrashEvent = require('./eventModel.js');
var Utils = require('../config/utility.js');
var Q = require('q');

  // readCrashEvent : 
  // - controller : (username to lookup by future: get this info from window.localStorage)
  // - factory/service : url = 'api/event/read' ($http send current user object)
  // - return from server : all crash events related to the current user

  // createCrashEvent :
  // - controller : (crash obj)
  // - factory/service : url = 'api/event/create' ($http send crash obj and user obj)
  // - return from server : success or failure

module.exports = {
  
  // GET
  readCrashEvent :  function (req, res, next) {

    console.log('read all crash events... for user ', req.user.username);

    
      
  },

  // POST
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
