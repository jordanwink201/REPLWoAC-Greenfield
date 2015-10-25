angular.module('crash', [
  'crash.eventService',
  'crash.userService',
  'crash.crashEventObj',
  'crash.profile',
  'crash.createAccount',
  'crash.signIn',
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
      controllerAs: 'crashWitnessCtrl',
      data : {
        authenticate : true  
      }
    })
    .when('/profile', {
      templateUrl: 'scripts/modules/user/profile/profile.html',
      controller: 'ProfileController',
      controllerAs : 'profileCtrl',
      data : {
        authenticate : true  
      }
    })
    .when('/signin', {
      templateUrl: 'scripts/modules/user/signIn/signIn.html',
      controller: 'SignInController',
      controllerAs : 'signInCtrl',
      data : {
        authenticate : false  
      }
    })
    .when('/createAccount', {
      templateUrl: 'scripts/modules/user/createAccount/createAccount.html',
      controller: 'CreateAccountController',
      controllerAs : 'createAccountCtrl',
      data : {
        authenticate : false  
      }
    })
    .when('/history', {
      templateUrl: 'scripts/modules/history/history.html',
      controller: 'HistoryController',
      controllerAs : 'historyCtrl',
      data : {
        authenticate : true  
      }
    })
    .when('/crashPhoto', {
      templateUrl: 'scripts/modules/crash/crashPhoto/crashPhoto.html',
      controller: 'CrashPhotoController',
      controllerAs: 'crashPhotoCtrl',
      data : {
        authenticate : true  
      }
    })
    .when('/crashDriverSearch', {
      templateUrl: 'scripts/modules/crash/crashDriverSearch/crashDriverSearch.html',
      controller: 'CrashDriverSearchController',
      controllerAs: 'crashDriverSearchCtrl',
      data : {
        authenticate : true  
      }
    })
    .when('/crashDriverInfo', {
      templateUrl: 'scripts/modules/crash/crashDriverInfo/crashDriverInfo.html',
      controller: 'CrashDriverInfoController',
      controllerAs: 'crashDriverInfoCtrl',
      data : {
        authenticate : true  
      }
    })
    .when('/crashEmail', {
      templateUrl: 'scripts/modules/crash/crashEmail/crashEmail.html',
      controller: 'CrashEmailController',
      controllerAs: 'crashEmailCtrl',
      data : {
        authenticate : true  
      }
    })
    .when('/crashFinalInfo', {
      templateUrl: 'scripts/modules/crash/crashFinalInfo/crashFinalInfo.html',
      controller: 'CrashFinalInfoController',
      controllerAs: 'crashFinalInfoCtrl',
      data : {
        authenticate : true  
      }
    })
    .otherwise( {
      redirectTo: '/'
    });

  /***
    On every single call to the server, the httpProvider intercepts the call and attaches the current token to the header
  ***/
  $httpProvider.interceptors.push('AttachToken');

})

/***
  Attach the user's token to the header of the server call
***/
.factory('AttachToken', function($window){
  return {
    request : function(object){
      var jwt = $window.localStorage.getItem('com.crash');
      if (jwt) {
        object.headers['x-access-token'] = jwt; // store the token into the header
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
})

/***
  Everytime the route changes, check if the url data.authenticate property is true, check if a session token exists, otherwise redirect the user back to the sign in page
***/
.run(function($rootScope, $location, UserService){

  $rootScope.$on('$routeChangeStart', function(evt, next, current){
    if (next.$$route && next.data.authenticate && !UserService.isAuthorized()) {
      $location.path('/signin');
    }
  });

});





angular.module('crash.crashEventObj', [])

.service('CrashEventObj', function(){ 

  this.crashEvent = {};

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

.factory('UserService', function($http, $window, $location){ 

  /***
    url = 'api/user/signin' ($http send user obj) 
    return from server
      success or failure
  ***/
  var signin = function(userObj){
    console.log('userObj : ', userObj);
    return $http({
      method : 'POST',
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
      return res.data;
    });
  };

  /***
    url = 'api/user/read' ($http send user token)
    return from server
      success and response with the user object asked to retreive or failure if that user doesn't exist
  ***/
  var readAccount = function(){
    return $http({
      method : 'GET',
      url : 'api/userAction/read'
    })
    .then(function(res){
      return res.data;
    });
  };

  /***
    return a boolean value if there is a token in the window local storage
  ***/
  var isAuthorized = function(){
    return !!$window.localStorage.getItem('com.crash');
  };

  /***
    clear all information in local storage and send the user to the signin page
  ***/
  var signout = function(){
    $window.localStorage.clear();
    $location.path('/signin');
  };

  return {
    signin : signin,
    createAccount : createAccount,
    readAccount : readAccount,
    signout : signout,
    isAuthorized : isAuthorized
  };

});

angular.module('crash.crashDriverInfo', [])

.controller('CrashDriverInfoController', function(CrashEventObj){

  // Things to think about... maybe there's more than one other drive info that you want to enter...
  // Maybe by you entering their info since they don't have an account, this actually creates one for them and sends them the info to signup and everything...
  
  var self = this;
  self.person = {};
  self.personMaster = {
    firstname : '',
    lastname : '',
    dob : '',
    phoneNumber : '',
    email : '',
    driverLicenseNum : '',
    insuranceCompany : '',
    policyNum : '',
    agentName : '',
    agentEmail : ''
  };

  /***
    save the crash user obj into the CrashEventObj.crashEvent object
  ***/
  self.save = function(){
    console.log('saving...');
    CrashEventObj.crashEvent.crashDriver = self.person;
    self.person = self.personMaster;
  };

});

angular.module('crash.crashDriverSearch', [])

.controller('CrashDriverSearchController', function(UserService, CrashEventObj) {
  
  var self = this;

  self.crashDriver = {};

  /***
    retreive the user's information by their username
    save the crash driver obj into the CrashEventObj.crashEvent object
  ***/
  self.getUser = function(){
    var inputUsername = self.username;
    UserService.readAccount('')
      .then(function(user){
        self.crashDriver = user.data;
        CrashEventObj.crashEvent.crashDriver = self.crashDriver;
      })
      .catch(function(err){
        console.log('user not received...', err);
      });
  };

});

angular.module('crash.crashEmail', [])

.controller('CrashEmailController', function() {
  
  // Possibly in the future connect to any insurance API's...

  var self = this;

  /***
    send email to insurance company
  ***/
  self.sendEmail = function(){
    
  };

});

angular.module('crash.crashFinalInfo', [])

.controller('CrashFinalInfoController', function(CrashEventObj){
  
  var self = this;

  /***
    load the crash obj that's been being built over the past screens, allow the user to change any details before sending the entire object to the database
  ***/
  self.loadCrashObj = function(){
    console.log('CrashEventObj : ', CrashEventObj);
  };

});

angular.module('crash.crashPhoto', [])

.controller('CrashPhotoController', function(CrashEventObj) {
  var self = this;
  self.images = [];

  // self = {
  //   video : null
  // };

  // var width = 320; // We will scale the photo width to this
  // var height = 0; // This will be computed based on the input stream

  // var streaming = false;

  // function startup() {
  //   video = document.getElementById('video');
  //   canvas = document.getElementById('canvas');
  //   photo = document.getElementById('photo');
  //   startbutton = document.getElementById('startbutton');
  // }

  // console.log('self : ', self.video);

  // navigator.getMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

  // navigator.getMedia( { video: true, audio: false },
  //   function(stream) {
  //     console.log('stream : ', stream);
  //     console.log('navigator.mozGetUserMedia : ', navigator.mozGetUserMedia);
  //     if (navigator.mozGetUserMedia) {
  //       video.mozSrcObject = stream;
  //     } else {
  //       var vendorURL = window.URL || window.webkitURL;
  //       console.log('vendorURL : ', vendorURL);
  //       console.log('video : ', video);
  //       video.src = vendorURL.createObjectURL(stream);
  //     }
  //     video.play();
  //   },
  //   function(err) {
  //     console.log("An error occured! " + err);
  //   }
  // );

  /***
    save the images into the CrashEventObj.crashEvent object
  ***/
  self.save = function(){
    console.log('saving...');
    CrashEventObj.crashEvent.images = self.images;
  };

});

angular.module('crash.crashWitness', [])

.controller('CrashWitnessController', function(CrashEventObj) {
  
  var self = this;
  self.witnessArr = [];
  self.person = {};
  self.personMaster = {
    firstname : '',
    lastname : '',
    phoneNumber : '',
    email : ''
  };

  /***
    store the person object into the witness array
    clear the input text fields after adding the person, so the user can easily add another witness
  ***/
  self.addWitness = function(){
    console.log('add witness...');
    self.witnessArr.push(self.person);
    self.person = angular.copy(self.master);
  };

  /***
    save the witness array into the CrashEventObj.crashEvent object
  ***/
  self.save = function(){
    console.log('saving...');
    CrashEventObj.crashEvent.witnessArr = self.witnessArr;
  };

});

angular.module('crash.history', [])

.controller('HistoryController', function(EventService){

  // user the event service to retreive crash events by the curret user name 
  var self = this;

  

});

angular.module('crash.createAccount', [])

.controller('CreateAccountController', function(UserService, $window, $location){

  var self = this;
  self.user = {};
  self.errorMessage = '';

  /***
    send the new user to the server to be stored in the database
    get a session token back to be stored into window localStorage
  ***/
  self.createAccount = function(){
    console.log('create account for user : ', self.user);
    UserService.createAccount(self.user)
      /***
        response will be an {token:token, user:user}
      ***/
      .then(function(data){
        console.log('created account, session :', data.token);

        $window.localStorage.setItem('com.crash', data.token);

        $location.path('/');
      })
      /***
        Tell the user the error, ex: username already exists, allow them to enter in a different username...
      ***/
      .catch(function(err){
        console.log('Error creating account...', err.data);
        self.errorMessage = err.data.error;
        self.user.username = '';
      });
  };

});

angular.module('crash.profile', [])

.controller('ProfileController', function(UserService){

  // Get the current user's information either from window.localStorage or using GET request

  // Be able to update the user's information (everything just be able to be updated except for their username, if they want to change their password then they'll be signed out and have to sign back in with their new password)

  var self = this;

  self.userObj = {};

  /***
    get the username from window.localStorage
  ***/
  self.getUser = function(){
    UserService.readAccount()
      .then(function(user){
        console.log('user : ', user);
        self.userObj = user.data;
      })
      .catch(function(err){
        console.log('user not received...', err);
      });
  };

  /***
    sign the user out by destroying the window.localStorage token and info
  ***/
  self.signOut = function(){
    UserService.signout();
  };

});

angular.module('crash.signIn', [])

.controller('SignInController', function(UserService, $window, $location){
  
  var self = this;
  self.errorMessage = '';
  self.user = {};

  /***
    Pass the user object to the signin function which holds the username and password
    Sign the User In and get a session back from the server
  ***/
  self.signIn = function(){
    console.log('sign user in...');
    UserService.signin(self.user)
      .then(function(data){
        console.log('token : ', data);
        $window.localStorage.setItem('com.crash', data.token);
        $location.path('/');
      })
      /***
        Tell the user the error, ex: the username or password provided didn't match the DB
        Reset the input so the user can enter the information again
      ***/
      .catch(function(err){
        console.log('Error signing in the user ...', err.data);
        self.errorMessage = err.data.error;
        self.user.username = '';
        self.user.password = '';
      });
  };
  
});
