angular.module('crash.errorService', [])

.service('ErrorService', function($ionicPopup){

  /***
    An alert popup dialog
  ***/
  this.showAlert = function(errMsg) {
    var alertPopup = $ionicPopup.alert({
      title: 'Oops!',
      template: errMsg
    });
    alertPopup.then(function(res) {
      console.log('error popup resolved');
    });
  };

});
