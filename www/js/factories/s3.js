angular.module('crash.S3', [])

.factory('S3Service', function($http){

  /***
    Upload Image to S3
    description 'scene'
    the date/time is stored as the name with the description
  ***/
  var uploadImage = function(imageData, description){

    return $http({
      method : 'POST',
      url : 'api/s3/upload',
      data : ({imgName : description, imageData: imageData}),
    })
    .then(function(res){
      return res.data;
    });
  };

  return {
    uploadImage : uploadImage
  };

});
