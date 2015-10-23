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
//test 123
angular.module('crash.crashDriverInfo', [])

.controller('CrashDriverInfoController', function () {

});
angular.module('crash.crashDriverSearch', [])

.controller('crashDriverSearch', function() {

});
angular.module('crash.crashEmail', [])

.controller('CrashEmailController', function() {

});
angular.module('crash.crashPhoto', [])

.controller('CrashPhotoController', function() {

});
angular.module('crash.crashWitness', [])

.controller('CrashWitnessController', function() {

});
angular.module('crash.crashWitnessInfo', [])

.controller('CrashWitnessInfoController', function() {

});

angular.module('crash.home', [])

.controller('HomeController', function() {

});