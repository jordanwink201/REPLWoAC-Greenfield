angular.module('crash', [
  'crash.home',
  'crash.crashWitness',
  'crash.crashWitnessInfo',
  'crash.crashPhoto',
  'crash.crashDriverSearch',
  'crash.crashDriverInfo',
  'crash.crashEmail',
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
     controller: 'CrashWitnessController'
   })
    .when('/crashWitnessInfo', {
      templateUrl: 'scripts/modules/crash/crashWitnessInfo/crashWitnessInfo.html',
      controller: 'CrashWitnessInfoController'
    })
    .when('/crashPhoto', {
      templateUrl: 'scripts/modules/crash/crashPhoto/crashPhoto.html',
      controller: 'CrashPhotoController'
    })
    .when('/crashDriverSearch', {
      templateUrl: 'scripts/modules/crash/crashDriverSearch/crashDriverSearch.html',
      controller: 'CrashDriverSearchController'
    })
    .when('/crashDriverInfo', {
      templateUrl: 'scripts/modules/crash/crashDriverInfo/crashDriverInfo.html',
      controller: 'CrashDriverInfoController'
    })
    .when('/crashEmail', {
      templateUrl: 'scripts/modules/crash/crashEmail/crashEmail.html',
      controller: 'CrashEmailController'
    })
    .otherwise( {
     redirectTo: '/'
   });
});
