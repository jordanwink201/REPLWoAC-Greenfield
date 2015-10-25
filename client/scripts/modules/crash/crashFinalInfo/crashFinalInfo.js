angular.module('crash.crashFinalInfo', [])

.controller('CrashFinalInfoController', function(CrashEventObj){
  
  var self = this;

  /***
    load the crash obj that's been being built over the past screens, allow the user to change any details before sending the entire object to the database
  ***/
  self.loadCrashObj = function(){
    console.log('CrashEventObj : ', CrashEventObj);
  };

});
