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

      createdAt : new Date().toLocaleString(),

      otherPartyInfo : {
        fname : req.body.crashDriver.fname,
        lname : req.body.crashDriver.lname,
        username : req.body.crashDriver.username,

        phone : req.body.crashDriver.phone,
        dob : req.body.crashDriver.dob.toLocaleString(),
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

    create(newCrashEvent)
      .then(function(crashEvent){
        console.log('NEW USER successfully stored in database : ', crashEvent);
        res.status(200);
        res.end();
      })
      .catch(function(err){
        console.log('error created the crash event...', err);
        res.status(404).send({error : err.message});
      });


  }

};
