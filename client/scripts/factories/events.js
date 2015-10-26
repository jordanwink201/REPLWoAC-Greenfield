angular.module('crash.eventService', [])

.factory('EventService', function($http){ 

  /***
    url = 'api/event/create' ($http send crash obj and user obj)
    return from server
      success or failure
  ***/
  var createCrashEvent = function(crashObj){
    return $http({
      method : 'POST',
      url : 'api/event/create',
      data : crashObj
    })
    .then(function(res){
      return res.data;
    });
  };

  /***
    url = 'api/event/read' ($http send current user object)
    return from server
      all crash events related to the current user
  ***/
  var readCrashEvent = function(username){
    return $http({
      method : 'GET',
      url : 'api/event/read',
      data : username
    })
    .then(function(res){
      return res.data;
    });
  };

  return {  
    createCrashEvent : createCrashEvent,
    readCrashEvent : readCrashEvent
  };

});
