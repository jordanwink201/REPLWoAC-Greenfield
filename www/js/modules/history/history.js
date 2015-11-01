angular.module('crash.history', [])

.controller('HistoryController', function(LoadingService, EventService){

  var self = this;
  // ngModel
  self.crashEvents = [];

  /***
    Retreive all crash events that are in the database associated to the current user
  ***/
  self.load = function(){
    // Console Log
    console.log('LOAD HISTORY...');
    // Show Loader
    LoadingService.showLoader();
    // Factory Function
    EventService.readCrashEvent()
      .then(function(data){
        // Console Log
        console.log('events : ', data);
        // Set ngModel
        self.crashEvents = data;
        // Hide Loader
        LoadingService.hideLoader();
      })
      .catch(function(err){
        // Hide Loader
        LoadingService.hideLoader();
      });
  };

});
