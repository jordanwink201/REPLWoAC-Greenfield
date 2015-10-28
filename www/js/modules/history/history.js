angular.module('crash.history', [])

.controller('HistoryController', function(EventService){

  // user the event service to retreive crash events by the curret user name
  var self = this;

  self.crashEvents = [];

  /***
    Retreive all crash events that are in the database associated to the current user
  ***/
  self.load = function(){
    EventService.readCrashEvent()
      .then(function(data){
        console.log('events : ', data);
        self.crashEvents = data;
      })
      .catch(function(err){
        console.log('ERror getting events...', err);
      });
  };

});
