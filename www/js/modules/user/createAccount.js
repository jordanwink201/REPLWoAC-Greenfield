angular.module('crash.createAccount', [])

.controller('CreateController', function(UserService, $state, $window, ngFB){

  var self = this;
  self.user = {};

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

  self.errorMessage = '';
  self.facebookLogin;
  /***
    send the new user to the server to be stored in the database
    get a session token back to be stored into window localStorage
  ***/
  self.create = function(){
    self.facebookLogin = false;  
    console.log('create account for user : ', self.user);
    UserService.createAccount(self.user)
      /***
        response will be an {token:token, user:user}
      ***/
      .then(function(data){
        console.log('created account, session :', data.token);
        $window.localStorage.setItem('com.crash', data.token);
        $state.go('tab.event');
        self.user = angular.copy(self.userMaster);
      })
      /***
        Tell the user the error, ex: username already exists, allow them to enter in a different username...
      ***/
      .catch(function(err){
        console.log('Error creating account...', err.data);
        self.errorMessage = err.data.error;
        self.user.username = '';
      });
  };

  // Redirect to signin page
  self.signin = function(){
    self.facebookLogin = false;  
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
