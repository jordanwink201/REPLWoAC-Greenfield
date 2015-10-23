angular.module('crash', [
  'crash.home',
  'crash.crashWitness',
  'crash.crashWitnessInfo',
  'crash.crashPhoto',
  'crash.crashDriverSearch',
  'crash.crashDriverInfo',
  'crash.crashEmail',
  'crash.crashFinalInfo',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
	$routeProvider
    .when('/home', {
     templateUrl: 'scripts/modules/home/home.html',
     controller: 'HomeController'
   })
    .when('/crashWitness', {
     templateUrl: 'scripts/modules/crash/crashWitness/crashWitness.html',
     controller: 'CrashWitnessController',
     controllerAs: 'crashWitnessCtrl'
   })
    .when('/crashWitnessInfo', {
      templateUrl: 'scripts/modules/crash/crashWitnessInfo/crashWitnessInfo.html',
      controller: 'CrashWitnessInfoController',
     controllerAs: 'crashWitnessInfoCtrl'
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
