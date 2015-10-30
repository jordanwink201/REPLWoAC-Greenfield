angular.module('crash.profile', [])

// .controller('ProfileController', function(LoadingService, UserService, $state, $window, $ionicActionSheet){

//   // Get the current user's information either from window.localStorage or using GET request

//   // Be able to update the user's information (everything just be able to be updated except for their username, if they want to change their password then they'll be signed out and have to sign back in with their new password)

//   var self = this;

//   self.userObj = {};

//   self.editMode = false;

//   /***
//     get the username from window.localStorage
//   ***/
//   self.load = function(){

//     LoadingService.showLoader();

//     UserService.readAccount()
//       .then(function(user){
//         console.log('User Loaded from server.... : ', user);
//         self.userObj = user.data;
//         LoadingService.hideLoader();
//       })
//       .catch(function(err){
//         console.log('user not received...', err);
//         LoadingService.hideLoader();
//       });
//   };

//   /***
//     update the user's profile
//     response will be an {token:token, user:user}
//   ***/
//   self.updateUser = function() {

//     LoadingService.showLoader();

//     UserService.updateUserAccount(self.userObj)
//       .then(function(data){
//         console.log('updated account, session :', data.token);
//         $window.localStorage.setItem('com.crash', data.token);
//         // $state.go('tab.profile');
//         LoadingService.hideLoader();
//         self.editMode = false;
//       })
//       .catch(function(err){
//         console.log('Error updating account...', err.data);
//         self.errorMessage = err.data.error;
//         self.user.username = '';
//         LoadingService.hideLoader();
//         self.editMode = false;
//       });
//   };

//   /***
//     sign the user out by destroying the window.localStorage token and info
//   ***/
//   self.signOut = function(){
//     UserService.signout();
//   };

//   /***
//     choose image from action sheet or take a photo to set as the profile picture
//   ***/
//   self.changProfileImg = function(){
//     var hideSheet = $ionicActionSheet.show({
//       buttons : [
//         { text : 'Take Photo' },
//         { text : 'Photo From Library' }
//       ],
//       cancelText: 'Cancel',
//       titleText : 'Choose Profile Image',
//       buttonClicked : function(index){
//         // index : 0 is take photo
//         if (index === 0) {
//           // take photo
//         }
//         // index : 1 is choose photo from library
//         if (index === 1) {
//           // choose photo from library
//         }
//       }
//     });
//   };

// });

.controller('ProfileController', function (LoadingService, UserService, $state, $window, $ionicActionSheet, $scope, ngFB) {
  var self = this;
    ngFB.api({
        path: '/me',
        params: {fields: 'id,name'}
    }).then(
        function (user) {
            self.user = user;
            console.log('user', user);
        },
        function (error) {
            alert('Facebook error: ' + error.error_description);
        });
});