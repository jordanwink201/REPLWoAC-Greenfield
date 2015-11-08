angular.module('crash.profile', [])

// Get the current user's information either from window.localStorage or using GET request

// Be able to update the user's information (everything just be able to be updated except for their username, if they want to change their password then they'll be signed out and have to sign back in with their new password)

// Depending on how you request the data back from the Camera and use it in your Angular markup, you may have to whitelist image URLs so Angular allows file:// URLs (for example, if you are using ng-src for an <img> tag):
// module.config(function($compileProvider){
//   $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
// })

.controller('ProfileController', function(S3Service, CrashEventObj, PopupService, LoadingService, UserService, $state, $window, $ionicActionSheet, Camera){

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
    console.log('loading current user...');
    // Show Loader
    LoadingService.showLoader();
    // Factory Function
    UserService.readAccount()
      .then(function(user){
        // Console Log
        console.log('current user : ', user.data);
        // Set ngModel
        self.userObj = user.data;
        // Hide Loader
        self.userObj.dob = new Date(user.data.dob);
        LoadingService.hideLoader();
      })
      .catch(function(err){
        // Alert Error
        PopupService.showAlert(err);
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
    console.log('update user info...');
    // Get Local Storage
    var currentToken = $window.localStorage.getItem('com.crash');
    // Show Loader
    LoadingService.showLoader();
    // Factory Function
    UserService.updateUserAccount(self.userObj)
      .then(function(data){
        // Console Log
        console.log('new users token : ', data.token);
        // Set Local Storage
        $window.localStorage.setItem('com.crash', data.token);
        // Set ngModel Flag
        self.editMode = false;
        // Show Success
        PopupService.showSuccess();
        // Hide Loader
        LoadingService.hideLoader();
        // Navigation
        $state.go('tab.history');
      })
      .catch(function(err){
        // Reset Input Fields
        self.user.username = '';
        // Set ngModel Flag
        self.editMode = false;
        // Alert Error
        PopupService.showAlert(err);
        // Hide Loader
        LoadingService.hideLoader();
      });
  };

  /***
    sign the user out by destroying the window.localStorage token and info
  ***/
  self.signOut = function(){
    // Clear Service Object
    CrashEventObj.crashEvent = {};
    // Factory Function
    UserService.signout();
  };

  /***
    choose image from action sheet or take a photo to set as the profile picture
  ***/
  self.changeProfileImg = function(){
    var hideSheet = $ionicActionSheet.show({
      buttons : [
        { text : 'Take Photo' },
        { text : 'Photo From Library' }
      ],
      cancelText: 'Cancel',
      titleText : 'Choose Profile Image',
      buttonClicked : function(index){
        // Take Photo
        if (index === 0) {

          var cameraOptions = {
            quality: 100,
            destinationType: 0, // Camera.DestinationType.DATA_URL
            encodingType: 1, // Camera.EncodingType.PNG
            sourceType: 1, // Camera.PictureSourceType.CAMERA
            targetWidth : 120,
            targetHeight : 120,
          };

          Camera.getPicture(cameraOptions).then(function(imageURI) {
            // Show Loader
            LoadingService.showLoader();
            // Factory Function
            S3Service.uploadImage(imageURI, 'profile')
              .then(function(imgUrl){
                // Console Log
                console.log('successfully saved to S3...');
                // Set Profile image
                self.userObj.profileImgUrl = imgUrl;
                // Show Success
                PopupService.showSuccess();
                // Hide Loader
                LoadingService.hideLoader();
                // Update User Profile Image
                self.updateUser();
              })
              .catch(function(err){
                console.log('error saving image...', err);
                // Hide Loader
                LoadingService.hideLoader();
                // Show Alert
                PopupService.showAlert();
              });
          }, function(err) {
            console.err(err);
          });

        }
        // Get Photo From Library
        if (index === 1) {

          var cameraOptions2 = {
            quality: 100,
            destinationType: 0, // Camera.DestinationType.DATA_URL
            encodingType: 1, // Camera.EncodingType.PNG
            sourceType: 0, // Camera.PictureSourceType.PHOTOLIBRARY
            targetWidth : 120,
            targetHeight : 120,
          };

          Camera.getPicture(cameraOptions2).then(function(imageURI) {
            // Show Loader
            LoadingService.showLoader();
            // Factory Function
            S3Service.uploadImage(imageURI, 'profile')
              .then(function(imgUrl){
                // Console Log
                console.log('successfully saved to S3...');
                // Set Profile image
                self.userObj.profileImgUrl = imgUrl;
                // Show Success
                PopupService.showSuccess();
                // Hide Loader
                LoadingService.hideLoader();
                // Update User Profile Image
                self.updateUser();
              })
              .catch(function(err){
                console.log('error saving image...', err);
                // Hide Loader
                LoadingService.hideLoader();
                // Show Alert
                PopupService.showAlert();
              });

          }, function(err) {
            console.err(err);
          });

        }

      }
    });
  };


});
