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
      
  },

  // POST
  createCrashEvent : function (req, res, next) {
    var newCrashEvent = new Crash(req.body);
    newCrashEvent.save(function (argument) {
      // body...
    });
    //create new instance of Crash Model
    //store geo-location
    //save

  }

};
