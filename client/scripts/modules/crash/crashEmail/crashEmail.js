angular.module('crash.crashEmail', [])

.controller('CrashEmailController', function(UserService) {
  
  // Possibly in the future connect to any insurance API's...

  var self = this;
  self.person = {};
  /***
    get the username from window.localStorage
  ***/
  self.getUser = function(){
    UserService.readAccount()
      .then(function(user){
        console.log('user : ', user);
        self.person = user.data;
      })
      .catch(function(err){
        console.log('user not received...', err);
      });
  };

  /***
    send email to insurance company
  ***/
  self.sendEmail = function(){
    
  };

});
