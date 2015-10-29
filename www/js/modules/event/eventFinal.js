angular.module('crash.eventFinal', [])

.controller('EventFinalController', function(CrashEventObj, EventService, $state){

  var self = this;

  self.finalCrashObj = {};

  self.witnessArr = [];
  self.crashDriver = {};

  /***
    load the crash obj that's been being built over the past screens, allow the user to change any details before sending the entire object to the database
  ***/
  self.load = function(){

    var crashObj = CrashEventObj.crashEvent;

    // Load witnesses information
    if (crashObj.witnessArr) {
      self.witnessArr = crashObj.witnessArr;
    }

    // Load crash driver's information
    if (crashObj) {
      self.crashDriver = crashObj.crashDriver;
    }

    self.finalCrashObj = crashObj;

  };

  /***
    save the final crash object into the database, which will be added to the driver's crash history
  ***/
  self.save = function(){
    console.log('save final information...');
    console.log('final crash object : ', self.finalCrashObj);

    EventService.createCrashEvent(self.finalCrashObj)
      .then(function(data){
        console.log('success data : ', data);
        $state.go('tab.history');
      })
      .catch(function(err){
        console.log('error saving crash object...', err);
      });

  };

});
