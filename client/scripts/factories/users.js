angular.module('crash.userService', [])

.factory('UserService', function($http){ 

  /***
    url = 'api/user/signin' ($http send user obj) 
    return from server
      success or failure
  ***/
  var signin = function(userObj){
    $http({
      method : 'GET',
      url : 'api/user/signin',
      data : userObj
    })
    .then(function(res){
      return res.data;
    });
  };

  /***
    url = 'api/user/create' ($http send user obj)
    return from server : 
      success or failure 
      (future : get the user object and store the user info into window.localStorage)
  ***/
  var createAccount = function(userObj){
    $http({
      method : 'POST',
      url : 'api/user/create',
      data : userObj
    })
    .then(function(res){
      return res.data;
    });
  };

  /***
    url = 'api/user/read' ($http send user name)
    return from server
      success and response with the user object asked to retreive or failure if that user doesn't exist
  ***/
  var readAccount = function(username){
    $http({
      method : 'GET',
      url : 'api/user/read',
      data : username
    })
    .then(function(res){
      return res.data;
    });
  };

  return {
    signin : signin,
    createAccount : createAccount,
    readAccount : readAccount
  };

});
