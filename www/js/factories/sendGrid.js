angular.module('crash.sendGrid', [])
  .factory('SendGridService', function($http){

    var sendEmail = function(crashObj){
      console.log('in sendGrid service!');
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