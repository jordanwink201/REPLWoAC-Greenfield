angular.module('crash.profile', [])

// Get the current user's information either from window.localStorage or using GET request

// Be able to update the user's information (everything just be able to be updated except for their username, if they want to change their password then they'll be signed out and have to sign back in with their new password)

// Depending on how you request the data back from the Camera and use it in your Angular markup, you may have to whitelist image URLs so Angular allows file:// URLs (for example, if you are using ng-src for an <img> tag):
// module.config(function($compileProvider){
//   $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
// })

.controller('ProfileController', function(CrashEventObj, PopupService, LoadingService, UserService, $state, $window, $ionicActionSheet, Camera, $cordovaCamera){

  var self = this;
  // ngModel
  self.userObj = {};
  self.profileImg = '../img/crashProfile2.jpg';
  self.profileImgFile = '';
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
        // index : 0 is take photo
        if (index === 0) {

        }
        // index : 1 is choose photo from library
        if (index === 1) {
          var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            targetWidth: 200,
            targetHeight: 200
          };

          $cordovaCamera.getPicture(options).then(function(imageUri) {
            console.log('img', imageUri);
            self.profileImgFile = imageUri;
            // $scope.images.push(imageUri);

          }, function(err) {
          // error
          });
        }
      }
    });
  };


});
