angular.module('crash.signin', ['ngOpenFB'])

.controller('SigninController', function(LoadingService, UserService, PopupService, $window, $state, ngFB){

  var self = this;
  // ngModel
  self.user = {};
  // Reset Input Fields
  self.userMaster = {
    username : '',
    password : ''
  };

  /***
    Pass the user object to the signin function which holds the username and password
    Sign the User In and get a session back from the server
  ***/
  self.signin = function(){
    // Console Log
    console.log('sign user in...');
    // Show Loader
    LoadingService.showLoader();
    // Factory Function
    UserService.signin(self.user)
      .then(function(data){
        // Console Log
        console.log('token : ', data);
        // Set Local Storage
        $window.localStorage.setItem('com.crash', data.token);
        // Hide Loader
        LoadingService.hideLoader();
        // Reset Input Fields
        self.user = angular.copy(self.userMaster);
        // Navigation
        $state.go('tab.event');
      })
      .catch(function(err){
        // Reset Input Fields
        self.user.username = '';
        self.user.password = '';
        // Alert Error
        PopupService.showAlert(err.data.error);
        // Hide Loader
        LoadingService.hideLoader();
      });
  };

  /***
    Redirect to create account page
  ***/
  self.signup = function(){
    // Reset Input Fields
    self.user = angular.copy(self.userMaster);
    // Navigation
    $state.go('createAccount');
  };

  self.fbLogin = function () {
    ngFB.login({scope: 'email,publish_actions'})
      .then(function (response) {
        if (response.status === 'connected') {
          /***
            Try to sign in first. If successfully sign in, redirect to tab.event page.
            else, redirect to createAccount page.
          ***/
          ngFB.api({
            path: '/me',
            params: {fields: 'id'}
          })
          .then(
            function (user) {
              UserService.signin({username: user.id, password: user.id})
                .then(function(data){
                  console.log('token : ', data);
                  $window.localStorage.setItem('com.crash', data.token);
                  $state.go('tab.event');
                })
                /***
                  Tell the user the error, ex: the username or password provided didn't match the DB
                  Reset the input so the user can enter the information again
                ***/
                .catch(function(err){
                  $state.go('createAccount');
                });
            },
            function (error) {
                alert('Facebook error: ' + error.error_description);
            });

          console.log('Facebook login succeeded');
        } else {
          console.log('Facebook login failed');
        }
    });
  };

});
