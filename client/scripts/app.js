angular.module('crash', [
'ngRoute'])
.config(function($routeProvider, $httpProvider) {
	$routeProvider
		.when('/crashWitness', {
			templateUrl: 'modules/crash/crashWitness.html'
		})
		.when('/home', {
			templateUrl: 'modules/home/home.html'
		})
		.otherwise( {
			redirectTo: '/home'
		})
})