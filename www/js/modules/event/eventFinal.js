angular.module('crash.eventFinal', [])

.controller('EventFinalController', function(PopupService, CrashEventObj, SendGridService, LoadingService, EventService, $state, Location){

  var self = this;
  // ngModel
  self.witnessArr = [];
  self.crashDriver = {};
  self.eventImages = [];
  // Local to be saved in DB
  var finalCrashObj = {};

  /***
    load the crash obj that's been being built over the past screens, allow the user to change any details before sending the entire object to the database
  ***/
  self.load = function(){
    // Console Log
    console.log('loading Service Object CrashEventObj : ', CrashEventObj);
    // Set Local from Service Object
    var crashObj = CrashEventObj.crashEvent;

    // Set ngModel
    self.witnessArr = crashObj.witnessArr;

    self.eventImages = crashObj.eventImages;
    self.crashDriver = crashObj.crashDriver;

    console.log('self.witnessArr : ', self.witnessArr);
    console.log('self.eventImages : ', self.eventImages);
    console.log('self.crashDriver : ', self.crashDriver);

    // Set Geolocation
    crashObj.locate = [Location.self.lat, Location.self.lon];

    // Set local
    finalCrashObj = crashObj;
  };

  /***
    save the final crash object into the database, which will be added to the driver's crash history
    sends email to the insurance agent via sendGrid API
  ***/
  self.save = function(){
    // Console Log
    console.log('Save Crash Object : ', finalCrashObj);

    // Send Email
    SendGridService.sendEmail(finalCrashObj)
      .then(function(data){
        // Console Log
        console.log('Successfully Sent Email: ', data);
      })
      .catch(function(err){
        // Alert Error
        PopupService.showAlert(err.data.error);
      });

    // Create Crash Event
    EventService.createCrashEvent(finalCrashObj)
      .then(function(data){
        // Show Success
        PopupService.showSuccess();
        // Hide Loader
        LoadingService.hideLoader();
        // Clear Service Object
        CrashEventObj.crashEvent = {};
        // Clear Local Object
        finalCrashObj = {};
        console.log('CLEAR : ', CrashEventObj.crashEvent, finalCrashObj);
        // Navigation
        $state.go('tab.history');
      })
      .catch(function(err){
        // Alert Error
        PopupService.showAlert(err.data.error);
        // Hide Loader
        LoadingService.hideLoader();
      });
  };

});
