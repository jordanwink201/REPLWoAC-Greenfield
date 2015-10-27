angular.module('crash.crashPhoto', [])

.controller('CrashPhotoController', function($scope, CrashEventObj, S3Service) {
  var self = this;
  self.eventImages = [];

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
          self.eventImages.push(imgUrl);
        })
        .catch(function(err){
          console.log('error saving image...', err);
        });

    }
  }

  $scope.takePhoto = function(){
    takepicture();
  };

  /***
    save the images into the CrashEventObj.crashEvent object
  ***/
  self.save = function(){
    CrashEventObj.crashEvent.eventImages = self.eventImages;
    console.log('CrashEventObj.crashEvent.images : ', CrashEventObj.crashEvent.eventImages);
  };

});
