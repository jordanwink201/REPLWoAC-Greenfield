angular.module('crash.crashPhoto', [])

.controller('CrashPhotoController', function(CrashEventObj) {
  var self = this;
  self.images = [];

  // self = {
  //   video : null
  // };

  // var width = 320; // We will scale the photo width to this
  // var height = 0; // This will be computed based on the input stream

  // var streaming = false;

  // function startup() {
  //   video = document.getElementById('video');
  //   canvas = document.getElementById('canvas');
  //   photo = document.getElementById('photo');
  //   startbutton = document.getElementById('startbutton');
  // }

  // console.log('self : ', self.video);

  // navigator.getMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

  // navigator.getMedia( { video: true, audio: false },
  //   function(stream) {
  //     console.log('stream : ', stream);
  //     console.log('navigator.mozGetUserMedia : ', navigator.mozGetUserMedia);
  //     if (navigator.mozGetUserMedia) {
  //       video.mozSrcObject = stream;
  //     } else {
  //       var vendorURL = window.URL || window.webkitURL;
  //       console.log('vendorURL : ', vendorURL);
  //       console.log('video : ', video);
  //       video.src = vendorURL.createObjectURL(stream);
  //     }
  //     video.play();
  //   },
  //   function(err) {
  //     console.log("An error occured! " + err);
  //   }
  // );

  /***
    save the images into the CrashEventObj.crashEvent object
  ***/
  self.save = function(){
    console.log('saving...');
    CrashEventObj.crashEvent.images = self.images;
  };

});
