angular.module('crash.Testing', [])

.controller("TestingController", function($scope, $http) {

  $scope.shrink = function(longurl) {
    $http({
      method: "GET",
      url: "http://tinyurl.com/api-create.php",
      params: {url: longurl}
    })
    .success(function(result) {
      alert(result);
    })
    .error(function(error) {
      console.log("ERROR: " + error);
    });
  };

});
