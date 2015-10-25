angular.module('crash.profile', [])

.controller('ProfileController', function($scope, UserService){

  // Get the current user's information either from window.localStorage or using GET request

  // Be able to update the user's information (everything just be able to be updated except for their username, if they want to change their password then they'll be signed out and have to sign back in with their new password)

  var self = this;

  self.user = {};

  self.getUser = function(){
    // get the username from somewhere
    UserService.readAccount('jordanw16')
      .then(function(user){
        console.log('user received : ', user);
        self.userObj = user.data;
        console.log('self.userObj : ', self.userObj);

      })
      .catch(function(err){
        console.log('user not received...', err);
      });
  };

});
