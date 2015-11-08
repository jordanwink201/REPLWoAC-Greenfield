angular.module('crash.sendGrid', [])

.factory('SendGridService', function($http){

  var sendEmail = function(crashObj){
    // Console Log
    console.log('Send Grid Service : ', crashObj);
    return $http({
      method : 'POST',
      url : 'api/sendGrid/sendEmail',
      data : crashObj
    })
    .then(function(res){
      return res.data;
    });
  };

  return {
    sendEmail : sendEmail
  }

});
