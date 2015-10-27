angular.module('crash.crashPhoto', [])

.controller('CrashPhotoController', function($scope, CrashEventObj, S3Service) {
  var self = this;
  self.images = [];
  var takenImgsCounter = 0;

  var streaming = false;
  var width = 320;    // We will scale the photo width to this
  var height = 0;     // This will be computed based on the input stream

  video = document.getElementById('video');
  canvas = document.getElementById('canvas');
  photo = document.getElementById('photo');

  // Get the Media Stream
  navigator.getMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);
  // Fetch and start the stream
  navigator.getMedia(
    {
      video: true,
      audio: false
    },
    // Success Callback
    function(stream) {
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
      }
      video.play();
    },
    // Error Callback
    function(err) {
      console.log("An error occured! " + err);
    }
  );

  video.addEventListener('canplay', function(ev){
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth/width);

      // Firefox currently has a bug where the height can't be read from
      // the video, so we will make assumptions if this happens.

      if (isNaN(height)) {
        height = width / (4/3);
      }

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
        send the current user's username
        send the image description 'scene'
        update the image taken counter
      ***/
      S3Service.uploadImage(imageData, 'jordanw16', 'scene', takenImgsCounter)
        .then(function(imgUrl){
          console.log('Image URL received : ', imgUrl);
          
          takenImgsCounter++;
          // save the image to an array of images
          self.images.push(imgUrl);
        })
        .catch(function(err){
          console.log('error saving image...', err);
        });

    } else { 
      clearphoto();
    }
  }

  $scope.takePhoto = function(){
    console.log('take photo...');
    takepicture();
    // clearphoto();
  };

  /***
    save the images into the CrashEventObj.crashEvent object
  ***/
  self.save = function(){
    console.log('saving...');
    CrashEventObj.crashEvent.images = self.images;
    console.log('CrashEventObj.crashEvent.images : ', CrashEventObj.crashEvent.images);
  };

});
