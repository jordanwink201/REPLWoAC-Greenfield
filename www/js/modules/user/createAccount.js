angular.module('crash.createAccount', [])


.controller('CreateController', function(LoadingService, PopupService, UserService, $state, $window, ngFB){


  var self = this;
  // ngModel
  self.user = {};
  self.user.profileImgUrl = '../img/crashProfile2.jpg';
  // Reset Input Fields
  self.userMaster = {
    username : '',
    password : '',
    fname : '',
    lname : '',
    dob : '',
    phone : '',
    email : '',
    license : '',
    licenseState : '',
    insurance : '',
    policy : '',
    agent : '',
    agentEmail : ''
  };

  self.facebookLogin;

  /***
    send the new user to the server to be stored in the database
    get a session token back to be stored into window localStorage
    response will be an {token:token, user:user}
  ***/

  self.create = function(){

    // Console Log
    console.log('create account for new user : ', self.user);

    // Show Loader
    LoadingService.showLoader();
    // Factory Function
    UserService.createAccount(self.user)
      .then(function(data){
        // Console Log
        console.log('createded account and token :', data.token);
        // Set Local Storage
        $window.localStorage.setItem('com.crash', data.token);
        // Show Success
        PopupService.showSuccess();
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
    Redirect to signin page
  ***/
  self.signin = function(){

    self.facebookLogin = false;

    // Reset Input Fields
    self.user = angular.copy(self.userMaster);
    // Navigation
    $state.go('signin');
  };

  self.getUser = function(){
    var self = this;
      ngFB.api({
          path: '/me',
          params: {fields: 'id,name,first_name,last_name,email'}
      }).then(
          function (user) {
            self.facebookLogin = true;
            self.user.username = user.id;
            self.user.password = user.id;
            self.user.fname = user.first_name;
            self.user.lname = user.last_name;
            self.user.email = user.email;
            self.user.profileImgUrl = "http://graph.facebook.com/" + user.id + "/picture?width=270&height=270";

            console.log('user', user);
          },
          function (error) {
            self.facebookLogin = false;
            console.log('Facebook error: ' + error.error_description);
          });
  };
});
