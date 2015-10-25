angular.module('crash', [
  'crash.eventService',
  'crash.userService',
  'crash.profile',
  'crash.history',
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
      templateUrl: 'scripts/modules/crash/crashWitness/crashWitness.html',
      controller: 'CrashWitnessController',
      controllerAs: 'crashWitnessCtrl'
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
    return $http({
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
    return $http({
      method : 'POST',
      url : 'api/user/create',
      data : userObj
    })
    .then(function(res){
      return res;
    });
  };

  /***
    url = 'api/user/read' ($http send user name)
    return from server
      success and response with the user object asked to retreive or failure if that user doesn't exist
  ***/
  var readAccount = function(username){
    console.log('username : ', username);
    return $http({
      method : 'GET',
      url : 'api/user/read',
      params: { username: username }
    })
    .then(function(res){
      console.log('response : ', res.data);
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

  self = {
    video : null
  };

  var width = 320; // We will scale the photo width to this
  var height = 0; // This will be computed based on the input stream

  var streaming = false;

  function startup() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');
  }

  console.log('self : ', self.video);

  navigator.getMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

  navigator.getMedia( { video: true, audio: false },
    function(stream) {
      console.log('stream : ', stream);
      console.log('navigator.mozGetUserMedia : ', navigator.mozGetUserMedia);
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        console.log('vendorURL : ', vendorURL);
        console.log('video : ', video);
        video.src = vendorURL.createObjectURL(stream);
      }
      video.play();
    },
    function(err) {
      console.log("An error occured! " + err);
    }
  );

});

angular.module('crash.crashWitness', [])

.controller('CrashWitnessController', function() {
  var self = this;
});
angular.module('crash.history', [])

.controller('HistoryController', function(EventService){

  // user the event service to retreive crash events by the curret user name 

});

angular.module('crash.profile', [])

.controller('ProfileController', function($scope, UserService){

  // Get the current user's information either from window.localStorage or using GET request

  // Be able to update the user's information (everything just be able to be updated except for their username, if they want to change their password then they'll be signed out and have to sign back in with their new password)

  var self = this;

  self.user = {};

  self.getUser = function(){
    // get the username from somewhere
    UserService.readAccount('jordanw16')
      .then(function(user){
        console.log('user received : ', user);
        self.userObj = user.data;
        console.log('self.userObj : ', self.userObj);

      })
      .catch(function(err){
        console.log('user not received...', err);
      });
  };

});
