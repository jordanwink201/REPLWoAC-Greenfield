/***

  Crash Event Controller

***/

// External Resources
var CrashEvent = require('./eventModel.js'),
    Utils = require('../config/utility.js'),
    Q = require('q');

module.exports = {
/***
  GET
***/

  /***
    controller : (username to lookup by future: get this info from window.localStorage)
    factory/service : url = 'api/event/read' ($http send current user object)
    return from server : all crash events related to the current user
  ***/
  readCrashEvent :  function (req, res, next) {
    // Console Log
    console.log('Get All Crash Events in Relation to user : ', req.user.username);
    // Create Promise
    var findCrashEvents = Q.nbind(CrashEvent.find, CrashEvent);
    // Mongoose Query
    findCrashEvents({ 'user' : req.user.username })
      .then(function (crashEvents) {
        if(!crashEvents) {
          // Propogate Error to Client
          throw(new Error('No crash events could be found'));
        } else {
          // Console Log
          console.log('All Crash Events from DB : ', crashEvents);
          // Propogate Data to Client
          res.send(crashEvents);
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
    controller : (crash obj)
    factory/service : url = 'api/event/create' ($http send crash obj and user obj)
    return from server : success or failure
  ***/
  createCrashEvent : function (req, res, next) {
    // Console Log
    console.log('Store Crash Event : ', req.body);
    // Create Promise
    var create = Q.nbind(CrashEvent.create, CrashEvent);
    // Create Object
    var newCrashEvent = {
      user : req.user.username,
      witness : req.body.witnessArr,
      accidentPhotoUrls : req.body.eventImages,
      location: req.body.locate,
      createdAt : new Date(),
      otherPartyInfo : {
        fname : req.body.crashDriver.fname,
        lname : req.body.crashDriver.lname,
        username : req.body.crashDriver.username,
        phone : req.body.crashDriver.phone,
        dob : req.body.crashDriver.dob,
        email : req.body.crashDriver.email,
        license : req.body.crashDriver.license,
        licenseState : req.body.crashDriver.licenseState,
        insurance : req.body.crashDriver.insurance,
        policy : req.body.crashDriver.policy,
        agent : req.body.crashDriver.agent,
        agentEmail : req.body.crashDriver.agentEmail,
        licensePhoto : '',
        insuranceCardPhoto : '',
      }
    };
    // Mongoose Query
    create(newCrashEvent)
      .then(function(crashEvent){
        // Console Log
        console.log('New User stored in DB : ', crashEvent);
        // Propogate Success to Client
        res.status(200).send();
      })
      .catch(function(err){
        // Propogate Error to Client
        res.status(404).send({error : err.message});
      });
  }

};
