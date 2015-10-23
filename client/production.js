angular.module('crash', [
  'ngRoute'])
.config(function($routeProvider, $httpProvider) {
	$routeProvider
    .when('/home', {
     templateUrl: 'scripts/modules/home/home.html'
   })
    .when('/crashWitness', {
     templateUrl: 'scripts/modules/crash/crashWitness/crashWitness.html'
   })
    .when('/crashWitnessInfo', {
      templateUrl: 'scripts/modules/crash/crashWitnessInfo/crashWitnessInfo.html'
    })
    .when('/crashPhoto', {
      templateUrl: 'scripts/modules/crash/crashPhoto/crashPhoto.html'
    })
    .when('/crashDriverSearch', {
      templateUrl: 'scripts/modules/crash/crashDriverSearch/crashDriverSearch.html'
    })
    .when('/crashDriverInfo', {
      templateUrl: 'scripts/modules/crash/crashDriverInfo/crashDriverInfo.html'
    })
    .when('/crashEmail', {
      templateUrl: 'scripts/modules/crash/crashEmail/crashEmail.html'
    })
    .otherwise( {
     redirectTo: '/'
   });
});




