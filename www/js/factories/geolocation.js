/***

  Geolocation

***/

angular.module('crash.location', [])

.service('Location', ['$q', '$http', '$cordovaGeolocation', '$ionicPopup', function ($q, $http, $cordovaGeolocation, $ionicPopup) {

  var self = this;

  self = {
    'isLoading': false,
    'hasMore': true,
    'results': [],
    'lat': 51.544440,
    'lon': -0.022974,
  };

  self.load = function () {
    self.isLoading = true;

    var deferred = $q.defer();

    ionic.Platform.ready(function () {
      $cordovaGeolocation
        .getCurrentPosition({enableHighAccuracy: true})
        .then(function (position) {
          // Console Log
          console.log('Current Position : ', position);
          // Set Local
          self.lat = position.coords.latitude;
          self.lon = position.coords.longitude;
        })
        .catch(function(err){
          // Show Alert
          $ionicPopup.alert({
            'title' : 'Please switch on geolocation',
            'template' : "It seems like you've switched off geolocation, please switch it on by going to you application settings."
          });
        });
    });

    return deferred.promise;
  };

  self.load();

  // You shouldn't have to do this if the above is a service, it's only necessary to return an object if it was a factory
  return {
    self: self
  };

}]);
