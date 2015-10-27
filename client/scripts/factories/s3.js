angular.module('crash.S3', [])

.factory('S3Service', function($http){ 

  /***
    Upload Image to S3
  ***/
  var uploadImage = function(imageData, name, description, takenImgsCounter){

    return $http({
      method : 'POST',
      url : 'api/s3/upload',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: $.param({imgName : name + takenImgsCounter, imageData: imageData}),
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
