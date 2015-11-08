angular.module('crash.eventPhoto', [])

// Depending on how you request the data back from the Camera and use it in your Angular markup, you may have to whitelist image URLs so Angular allows file:// URLs (for example, if you are using ng-src for an <img> tag):
.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.controller('EventPhotoController', function(S3Service, CrashEventObj, LoadingService, PopupService, Camera, $rootScope) {

  var self = this;

  /***
    Camera Icon on screen fires the take picture function
  ***/
  $rootScope.takePhoto = function(){
    // Mobile take photo function
    self.getPhoto();
  };

  /***
    MOBILE GET PHOTO
  ***/
  self.getPhoto = function() {

    var cameraOptions = {
      quality: 100,
      destinationType: 0, // Camera.DestinationType.DATA_URL
      encodingType: 1, // Camera.EncodingType.PNG
      sourceType: 1, // Camera.PictureSourceType.CAMERA
      targetWidth : 320,
      targetHeight : 320,
    };

    Camera.getPicture(cameraOptions).then(function(imageURI) {
      // Show Loader
      LoadingService.showLoader();
      // Factory Function
      S3Service.uploadImage(imageURI, 'scene')
        .then(function(imgUrl){
          // Console Log
          console.log('successfully saved to S3...');
          // Set Service Object
          CrashEventObj.crashEvent.eventImages.push(imgUrl);
          // Show Success
          PopupService.showSuccess();
          // Hide Loader
          LoadingService.hideLoader();
        })
        .catch(function(err){
          // Show Alert
          PopupService.showAlert();
          // Hide Loader
          LoadingService.hideLoader();
        });
    }, function(err) {
      console.err(err);
    });

  };

});
