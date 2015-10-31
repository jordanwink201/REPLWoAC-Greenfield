angular.module('crash.createAccount', [])

.controller('CreateController', function(LoadingService, PopupService, UserService, $state, $window, ngFB){

  var self = this;
  // ngModel
  self.user = {};
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

    self.facebookLogin = false;

    console.log('create account for user : ', self.user);
    // Show Loader
    LoadingService.showLoader();
    // Factory Function
    UserService.createAccount(self.user)
      .then(function(data){
        // Console Log
        console.log('created account, session :', data.token);
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
<<<<<<< 432f99f31542eeedc2fa8a9830e749fe82b26914
    self.facebookLogin = false;
=======
    // Navigation
>>>>>>> added scss file structure and refactoring client/server code
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

            console.log('user', user);
          },
          function (error) {
            self.facebookLogin = false;
            console.log('Facebook error: ' + error.error_description);
          });
  };
});
