angular.module('crash', [
  'crash.eventService',
  'crash.userService',
  'crash.profile',
  'crash.history',
  'crash.home',
  'crash.crashWitness',
  'crash.crashPhoto',
  'crash.crashDriverSearch',
  'crash.crashDriverInfo',
  'crash.crashEmail',
  'crash.crashFinalInfo',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
	$routeProvider
    .when('/', {
      templateUrl: 'scripts/modules/home/home.html',
      controller: 'HomeController'
    })
    .when('/profile', {
      templateUrl: 'scripts/modules/profile/profile.html',
      controller: 'ProfileController',
      controllerAs : 'profileCtrl'
    })
    .when('/history', {
      templateUrl: 'scripts/modules/history/history.html',
      controller: 'HistoryController',
      controllerAs : 'historyCtrl'
    })
    .when('/crashWitness', {
      templateUrl: 'scripts/modules/crash/crashWitness/crashWitness.html',
      controller: 'CrashWitnessController',
      controllerAs: 'crashWitnessCtrl'
    })
    .when('/crashPhoto', {
      templateUrl: 'scripts/modules/crash/crashPhoto/crashPhoto.html',
      controller: 'CrashPhotoController',
      controllerAs: 'crashPhotoCtrl'
    })
    .when('/crashDriverSearch', {
      templateUrl: 'scripts/modules/crash/crashDriverSearch/crashDriverSearch.html',
      controller: 'CrashDriverSearchController',
      controllerAs: 'crashDriverSearchCtrl'
    })
    .when('/crashDriverInfo', {
      templateUrl: 'scripts/modules/crash/crashDriverInfo/crashDriverInfo.html',
      controller: 'CrashDriverInfoController',
      controllerAs: 'crashDriverInfoCtrl'
    })
    .when('/crashEmail', {
      templateUrl: 'scripts/modules/crash/crashEmail/crashEmail.html',
      controller: 'CrashEmailController',
      controllerAs: 'crashEmailCtrl'
    })
    .when('/crashFinalInfo', {
      templateUrl: 'scripts/modules/crash/crashFinalInfo/crashFinalInfo.html',
      controller: 'CrashFinalInfoController',
      controllerAs: 'crashFinalInfoCtrl'
    })
    .otherwise( {
      redirectTo: '/'
    });
});

angular.module('crash.eventService', [])

.factory('EventService', function($http){ 

  /***
    url = 'api/event/create' ($http send crash obj and user obj)
    return from server
      success or failure
  ***/
  var createCrashEvent = function(crashObj){
    $http({
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
  var readCrashEventByUser = function(username){
    $http({
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
    readCrashEventByUser : readCrashEventByUser
  };

});

angular.module('crash.userService', [])

.factory('UserService', function($http){ 

  /***
    url = 'api/user/signin' ($http send user obj) 
    return from server
      success or failure
  ***/
  var signin = function(userObj){
    $http({
      method : 'GET',
      url : 'api/user/signin',
      data : userObj
    })
    .then(function(res){
      return res.data;
    });
  };

  /***
    url = 'api/user/create' ($http send user obj)
    return from server : 
      success or failure 
      (future : get the user object and store the user info into window.localStorage)
  ***/
  var createAccount = function(userObj){
    $http({
      method : 'POST',
      url : 'api/user/create',
      data : userObj
    })
    .then(function(res){
      return res.data;
    });
  };

  /***
    url = 'api/user/read' ($http send user name)
    return from server
      success and response with the user object asked to retreive or failure if that user doesn't exist
  ***/
  var readAccount = function(username){
    $http({
      method : 'GET',
      url : 'api/user/read',
      data : username
    })
    .then(function(res){
      return res.data;
    });
  };

  return {
    signin : signin,
    createAccount : createAccount,
    readAccount : readAccount
  };

});

angular.module('crash.crashDriverInfo', [])

.controller('CrashDriverInfoController', function () {
  var self = this;
});

angular.module('crash.crashDriverSearch', [])

.controller('CrashDriverSearchController', function() {
  var self = this;
});
angular.module('crash.crashEmail', [])

.controller('CrashEmailController', function() {
  var self = this;
});
angular.module('crash.crashFinalInfo', [])

.controller('CrashFinalInfoController', function () {
  var self = this;
});
angular.module('crash.crashPhoto', [])

.controller('CrashPhotoController', function() {
  var self = this;
});
angular.module('crash.crashWitness', [])

.controller('CrashWitnessController', function() {
  var self = this;
});
angular.module('crash.crashWitnessInfo', [])

.controller('CrashWitnessInfoController', function() {

});
angular.module('crash.history', [])

.controller('HistoryController', function(EventService){

  // user the event service to retreive crash events by the curret user name 

});

angular.module('crash.home', [])

.controller('HomeController', function() {

});

angular.module('crash.profile', [])

.controller('ProfileController', function(UserService){

  // Get the current user's information either from window.localStorage or using GET request

  // Be able to update the user's information (everything just be able to be updated except for their username, if they want to change their password then they'll be signed out and have to sign back in with their new password)

});
