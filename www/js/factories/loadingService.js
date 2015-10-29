angular.module('crash.loadingService', [])

.service('LoadingService', function($ionicLoading){

  /***
    An alert popup dialog
  ***/
  this.showLoader = function(){
    // Load the Loader...
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple" class="spinner-energized"></ion-spinner>',
      animation : 'fade-in',
      showBackDrop : false,
      maxWidth : 200,
      showDelay: 0
    });
  };

  this.hideLoader = function(){
    $ionicLoading.hide();
  };


});
