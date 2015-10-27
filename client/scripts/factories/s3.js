angular.module('crash.s3', [])

.factory('S3Service', function($http){ 

  /***
    
  ***/
  var uploadImage = function(imageData){

    console.log('Upload Image...');
    
    return $http({
      method : 'POST',
      url : 'api/s3/create',
      contentType : 'application/x-www-form-urlencoded',
      data : { imageData : imageData }
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
