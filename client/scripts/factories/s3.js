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
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: $.param({imgName : description + Date.now, imageData: imageData}),
    })
    .then(function(res){
      console.log('RESPONSE : ', res.data);
      return res.data;
    });
  };

  return {  
    uploadImage : uploadImage
  };

});
