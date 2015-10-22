angular.module('crash', [
  'ngRoute'])
.config(function($routeProvider, $httpProvider) {
	$routeProvider
<<<<<<< 75ff45e5c5fc49103db49d038ff9b865c389e4fd
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
=======
		.when('/crashWitness', {
			templateUrl: 'modules/crash/crashWitness.html'
		})
		.when('/home', {
			templateUrl: 'modules/home/home.html'
		})
		.otherwise( {
			redirectTo: '/'
		});
>>>>>>> added .editor config file for overral text editor settings"
});
//test 123



