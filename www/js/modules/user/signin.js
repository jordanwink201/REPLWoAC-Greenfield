angular.module('crash.signin', ['ngOpenFB'])

.controller('SigninController', function(UserService, PopupService, $window, $state, ngFB){

  var self = this;
  self.user = {};
  self.userMaster = {
    username : '',
    password : ''
  };

  /***
    Pass the user object to the signin function which holds the username and password
    Sign the User In and get a session back from the server
  ***/
  self.signin = function(){
    console.log('sign user in...');
    UserService.signin(self.user)
      .then(function(data){
        console.log('token : ', data);
        $window.localStorage.setItem('com.crash', data.token);
        $state.go('tab.event');
        self.user = angular.copy(self.userMaster);
      })
      /***
        Tell the user the error, ex: the username or password provided didn't match the DB
        Reset the input so the user can enter the information again
      ***/
      .catch(function(err){
        console.log('Error signing in the user ...', err.data);
        PopupService.showAlert(err.data.error);
        self.user.username = '';
        self.user.password = '';
      });
  };

  // Redirect to create account page
  self.signup = function(){
    $state.go('createAccount');
  };

  self.fbLogin = function () {
      ngFB.login({scope: 'email,publish_actions'}).then(
          function (response) {
              if (response.status === 'connected') {
                $state.go('createAccount');
                console.log('Facebook login succeeded');
              } else {
                  alert('Facebook login failed');
              }
          });
  };

});
