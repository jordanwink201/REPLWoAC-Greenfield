angular.module('crash', [
  'crash.eventService',
  'crash.userService',
  'crash.S3Service',
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




