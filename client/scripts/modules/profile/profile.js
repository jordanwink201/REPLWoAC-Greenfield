angular.module('crash.profile', [])

.controller('ProfileController', function(UserService){

  // Get the current user's information either from window.localStorage or using GET request

  // Be able to update the user's information (everything just be able to be updated except for their username, if they want to change their password then they'll be signed out and have to sign back in with their new password)

  var self = this;

  self.navigate = function(){
    $location.path('/home');
  };

});
