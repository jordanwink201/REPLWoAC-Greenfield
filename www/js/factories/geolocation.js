/***

  Geolocation

***/

angular.module('crash.geolocation', [])

.service('GeoLcation', ['$q', '$http', '$cordovaGeolocation', '$ionicPopup', function ($q, $http, $cordovaGeolocation, $ionicPopup) {
  
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
                self.lat = position.coords.latitude;
                self.lon = position.coords.longitude;

                var params = {
                  lat: this.self.lat,
                  lon: this.self.lon
                };

            }, function (err) {
              console.error("Error getting position");
              console.error(err);
              $ionicPopup.alert({
                'title':'Please switch on geolocation',
                'template': "It seems like you've switched off geolocation for CrashNinja, please switch it on by going to you application settings."
              });
            });
        });

        return deferred.promise;
      };

    self.load();

    return self;
}]);