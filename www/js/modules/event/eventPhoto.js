angular.module('crash.eventPhoto', [])

// Depending on how you request the data back from the Camera and use it in your Angular markup, you may have to whitelist image URLs so Angular allows file:// URLs (for example, if you are using ng-src for an <img> tag):
.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.controller('EventPhotoController', function(S3Service, Camera, $state) {

  var self = this;

  self.eventImages = [];

  // MOBILE GET PHOTO
  self.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
      // Add to event images array
      self.eventImages.push(imageURI);

      self.lastPhoto = imageURI;
    }, function(err) {
      console.err(err);
    }, {
      quality: 75,
      targetWidth: 50,
      targetHeight: 50,
      saveToPhotoAlbum: false
    });
  };

  // S3Service.uploadImage(imageData, 'scene')
  //   .then(function(imgUrl){
  //     self.eventImages.push(imgUrl);
  //   })
  //   .catch(function(err){
  //     console.log('error saving image...', err);
  //   });

});
