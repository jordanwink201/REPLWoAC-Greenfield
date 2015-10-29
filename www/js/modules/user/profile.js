angular.module('crash.profile', [])

.controller('ProfileController', function(LoadingService, UserService, $state, $window){

  // Get the current user's information either from window.localStorage or using GET request

  // Be able to update the user's information (everything just be able to be updated except for their username, if they want to change their password then they'll be signed out and have to sign back in with their new password)

  var self = this;

  self.userObj = {};

  self.editMode = false;

  /***
    get the username from window.localStorage
  ***/
  self.load = function(){

    LoadingService.showLoader();

    UserService.readAccount()
      .then(function(user){
        console.log('user : ', user);
        self.userObj = user.data;
        LoadingService.hideLoader();
      })
      .catch(function(err){
        console.log('user not received...', err);
        LoadingService.hideLoader();
      });
  };

  /***
    update the user's profile
    response will be an {token:token, user:user}
  ***/
  self.updateUser = function() {

    LoadingService.showLoader();

    UserService.updateUserAccount(self.userObj)
      .then(function(data){
        console.log('updated account, session :', data.token);
        $window.localStorage.setItem('com.crash', data.token);
        // $state.go('tab.profile');
        LoadingService.hideLoader();
      })
      .catch(function(err){
        console.log('Error updating account...', err.data);
        self.errorMessage = err.data.error;
        self.user.username = '';
        LoadingService.hideLoader();
      });
  };

  /***
    sign the user out by destroying the window.localStorage token and info
  ***/
  self.signOut = function(){
    UserService.signout();
  };

});
