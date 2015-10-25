angular.module('crash.signIn', [])

.controller('SignInController', function(UserService){
  
  var self = this;

  self.user = {};

  /***
    Pass the user object to the signin function which holds the username and password
    Sign the User In and get a session back from the server
  ***/
  self.signIn = function(){
    console.log('sign user in...');
    UserService.signin(self.user)
      .then(function(session){
        console.log('session : ', session);
      })
      .catch(function(err){
        console.log('Error signing in...', err);
      });
  };
  
});
