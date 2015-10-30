angular.module('crash.history', [])

.controller('HistoryController', function(LoadingService, EventService){

  // user the event service to retreive crash events by the curret user name
  var self = this;

  self.crashEvents = [];

  /***
    Retreive all crash events that are in the database associated to the current user
  ***/
  self.load = function(){

    console.log('LOAD HISTORY...');

    LoadingService.showLoader();

    EventService.readCrashEvent()
      .then(function(data){
        console.log('events : ', data);
        self.crashEvents = data;
        LoadingService.hideLoader();
      })
      .catch(function(err){
        console.log('ERror getting events...', err);
        LoadingService.hideLoader();
      });
  };

});
