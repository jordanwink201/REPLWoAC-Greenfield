angular.module('crash.profile', [])

.controller('ProfileController', function(PopupService, LoadingService, UserService, $state, $window, $ionicActionSheet){

  // Get the current user's information either from window.localStorage or using GET request

  // Be able to update the user's information (everything just be able to be updated except for their username, if they want to change their password then they'll be signed out and have to sign back in with their new password)

  var self = this;
  // ngModel
  self.userObj = {};
  // ngModel Flag
  self.editMode = false;

  /***
    get the username from window.localStorage
  ***/
  self.load = function(){
    // Console Log
    console.log('create account for user : ', self.user);
    // Show Loader
    LoadingService.showLoader();
    // Factory Function
    UserService.readAccount()
      .then(function(user){
        // Console Log
        console.log('User : ', user);
        // Set ngModel
        self.userObj = user.data;
        // Hide Loader
        LoadingService.hideLoader();
      })
      .catch(function(err){
        // Alert Error
        PopupService.showAlert(err.data.error);
        // Hide Loader
        LoadingService.hideLoader();
      });
  };

  /***
    update the user's profile
    response will be an {token:token, user:user}
  ***/
  self.updateUser = function() {
    // Console Log
    console.log('update user : ');
    // Get Local Storage
    var currentToken = $window.localStorage.getItem('com.crash');
    // Show Loader
    LoadingService.showLoader();
    // Factory Function
    UserService.updateUserAccount(self.userObj)
      .then(function(data){
        // Console Log
        console.log('NEW TOKEN :', data.token);
        // Set Local Storage
        $window.localStorage.setItem('com.crash', data.token);
        // Set ngModel Flag
        self.editMode = false;
        // Show Success
        PopupService.showSuccess();
        // Hide Loader
        LoadingService.hideLoader();
        // Navigation
        // $state.go('tab.profile');
      })
      .catch(function(err){
        // Reset Input Fields
        self.user.username = '';
        // Set ngModel Flag
        self.editMode = false;
        // Alert Error
        PopupService.showAlert(err.data.error);
        // Hide Loader
        LoadingService.hideLoader();
      });
  };

  /***
    sign the user out by destroying the window.localStorage token and info
  ***/
  self.signOut = function(){
    // Factory Function
    UserService.signout();
  };

  /***
    choose image from action sheet or take a photo to set as the profile picture
  ***/
  self.changProfileImg = function(){
    var hideSheet = $ionicActionSheet.show({
      buttons : [
        { text : 'Take Photo' },
        { text : 'Photo From Library' }
      ],
      cancelText: 'Cancel',
      titleText : 'Choose Profile Image',
      buttonClicked : function(index){
        // index : 0 is take photo
        if (index === 0) {
          // take photo
        }
        // index : 1 is choose photo from library
        if (index === 1) {
          // choose photo from library

        }
      }
    });
  };


});