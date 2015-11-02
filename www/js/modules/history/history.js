angular.module('crash.history', [])

.controller('HistoryController', function(LoadingService, EventService){

  var self = this;
  // ngModel
  self.crashEvents = [];
  self.LongLat = "";


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
        for(var i = 0; i < self.crashEvents.length; i++){
          self.LongLat = self.crashEvents[i].location[0] + "," + self.crashEvents[i].location[1];
        }
        console.log(self.LongLat);

        // Hide Loader
        LoadingService.hideLoader();
      })
      .catch(function(err){
        // Hide Loader
        LoadingService.hideLoader();
      });
  };

});
