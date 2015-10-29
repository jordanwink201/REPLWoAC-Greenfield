angular.module('crash.userService', [])

.factory('UserService', function($http, $window, $state){

  /***
    url = 'api/user/signin' ($http send user obj)
    return from server
      success or failure
  ***/
  var signin = function(userObj){
    return $http({
      method : 'POST',
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
    return $http({
      method : 'POST',
      url : 'api/user/create',
      data : userObj
    })
    .then(function(res){
      return res.data;
    });
  };

  /***
    url = 'api/user/read' ($http send user token)
    return from server
      success and response with the user object asked to retreive or failure if that user doesn't exist
  ***/
  var readAccount = function(){
    return $http({
      method : 'GET',
      url : 'api/userAction/read'
    })
    .then(function(res){
      return res.data;
    });
  };

  /***
    url = 'api/user/updateuser' ($http send user token)
    return from server :
      success or failure
  ***/
  var updateUserAccount = function(userObj){
    return $http({
      method : 'POST',
      url : 'api/user/updateuser',
      data : userObj
    })
    .then(function(res){
      return res.data;
    });
  };

  /***
    url = 'api/user/read' ($http send user name via params)
    return from server
      success and response with the user object asked to retreive or failure if that user doesn't exist
  ***/
  var getAccountByUsername = function(username){
    return $http({
      method : 'GET',
      url : 'api/user/read',
      params : {username : username}
    })
    .then(function(res){
      return res.data;
    });
  };

  /***
    return a boolean value if there is a token in the window local storage
  ***/
  var isAuthorized = function(){
    return !!$window.localStorage.getItem('com.crash');
  };

  /***
    clear all information in local storage and send the user to the signin page
  ***/
  var signout = function(){
    $window.localStorage.clear();
    $state.go('signin');
  };

  return {
    signin : signin,
    createAccount : createAccount,
    updateUserAccount: updateUserAccount,
    readAccount : readAccount,
    signout : signout,
    isAuthorized : isAuthorized,
    getAccountByUsername : getAccountByUsername
  };

});
