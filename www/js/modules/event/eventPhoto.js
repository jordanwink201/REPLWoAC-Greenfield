angular.module('crash.eventPhoto', [])

// Depending on how you request the data back from the Camera and use it in your Angular markup, you may have to whitelist image URLs so Angular allows file:// URLs (for example, if you are using ng-src for an <img> tag):
.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.controller('EventPhotoController', function(S3Service, CrashEventObj, Camera, $state, $scope, $rootScope) {

  var self = this;
  // ngModel
  self.eventImages = [];

  /***
    BROWSER GET PHOTO
  ***/

  var streaming = false;
  var width = 320; // We will scale the photo width to this
  var height = 0;

  video = document.getElementById('video');
  canvas = document.getElementById('canvas');
  photo = document.getElementById('photo');

  /***
    Get the Media Stream
    Fetch and start the stream
  ***/
  navigator.getMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

  navigator.getMedia( { video: true, audio: false },
    function(stream) {
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
      }
      video.play();
    },
    function(err) {
      console.log("An error occured! " + err);
    }
  );

  video.addEventListener('canplay', function(ev){
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth/width);
      if (isNaN(height)) { height = width / (4/3);}

      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false);

  function takepicture() {
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      var imageData = canvas.toDataURL('image/png');
      photo.setAttribute('src', imageData);
      /***
        Send the buffer to the server
        send the image description 'scene'
      ***/
      S3Service.uploadImage(imageData, 'scene')
        .then(function(imgUrl){
          // Console Log
          console.log('successfully saved to S3...');
          // Add Image URL to Crash Event Object
          self.eventImages.push(imgUrl);
          // Add to Service Object
          CrashEventObj.crashEvent.eventImages = self.eventImages;
          //
          console.log(CrashEventObj.crashEvent);
        })
        .catch(function(err){
          console.log('error saving image...', err);
        });

    }
  }

  $rootScope.takePhoto = function(){
    takepicture();
  };

  /***
    save the images into the CrashEventObj.crashEvent object
  ***/
  self.save = function(){

    console.log('CrashEventObj.crashEvent.images : ', CrashEventObj.crashEvent.eventImages);
  };

  /***
    MOBILE GET PHOTO
  ***/
  // self.getPhoto = function() {
  //   Camera.getPicture().then(function(imageURI) {
  //     // Console Log
  //     console.log(imageURI);
  //     // Set ngModel
  //     self.eventImages.push(imageURI);
  //     // Set ngModel
  //     self.lastPhoto = imageURI;
  //   }, function(err) {
  //     PopupService.showAlert(err);
  //   }, {
  //     quality: 75,
  //     targetWidth: 50,
  //     targetHeight: 50,
  //     saveToPhotoAlbum: false
  //   });
  // };

  // S3Service.uploadImage(imageData, 'scene')
  //   .then(function(imgUrl){
  //     self.eventImages.push(imgUrl);
  //   })
  //   .catch(function(err){
  //     console.log('error saving image...', err);
  //   });

});
