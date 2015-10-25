angular.module('crash', [
  'crash.eventService',
  'crash.userService',
  'crash.crashEventObj',
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
