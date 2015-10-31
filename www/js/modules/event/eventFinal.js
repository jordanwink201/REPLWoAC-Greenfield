angular.module('crash.eventFinal', [])

.controller('EventFinalController', function(PopupService, CrashEventObj, EventService, $state){

  var self = this;

  self.finalCrashObj = {};

  self.witnessArr = [];
  self.crashDriver = {};
  self.eventImages = [];

  /***
    load the crash obj that's been being built over the past screens, allow the user to change any details before sending the entire object to the database
  ***/
  self.load = function(){

    var crashObj = CrashEventObj.crashEvent;

    // Load witnesses information
    if (crashObj.witnessArr) {
      self.witnessArr = crashObj.witnessArr;
    }

    // Load images
    self.eventImages = crashObj.eventImages;

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
    console.log('\nsave final information...');
    console.log('final crash object : ', self.finalCrashObj);

    EventService.createCrashEvent(self.finalCrashObj)
      .then(function(data){
        console.log('success data : ', data);
        // show success popup
        PopupService.showSuccess();

        $state.go('tab.history');

        console.log('should have went to the history.....');
      })
      .catch(function(err){
        console.log('error saving crash object...', err);

      });

  };

});
