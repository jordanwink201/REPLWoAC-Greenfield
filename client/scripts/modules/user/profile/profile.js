angular.module('crash.profile', [])

.controller('ProfileController', function(UserService, $window, $location){

  // Get the current user's information either from window.localStorage or using GET request

  // Be able to update the user's information (everything just be able to be updated except for their username, if they want to change their password then they'll be signed out and have to sign back in with their new password)

  var self = this;

  self.userObj = {};

  /***
    get the username from window.localStorage
  ***/
  self.getUser = function(){
    UserService.readAccount()
      .then(function(user){
        console.log('user : ', user);
        self.userObj = user.data;
      })
      .catch(function(err){
        console.log('user not received...', err);
      });
  };

  /***
    update the user's profile
  ***/
  self.updateUser = function() {
    UserService.updateUserAccount(self.userObj)
      /***
        response will be an {token:token, user:user}
      ***/
      .then(function(data){
        console.log('updated account, session :', data.token);

        $window.localStorage.setItem('com.crash', data.token);

        $location.path('/profile');
      })
      .catch(function(err){
        console.log('Error updating account...', err.data);
        self.errorMessage = err.data.error;
        self.user.username = '';
      });
  };
  
  /***
    sign the user out by destroying the window.localStorage token and info
  ***/
  self.signOut = function(){
    UserService.signout();
  };

});
