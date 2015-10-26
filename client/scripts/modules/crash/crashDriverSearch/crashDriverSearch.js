angular.module('crash.crashDriverSearch', [])

.controller('CrashDriverSearchController', function(UserService, CrashEventObj) {
  
  var self = this;
  self.errorMessage = '';
  self.crashDriver = {};

  /***
    retreive the user's information by their username
    save the crash driver obj into the CrashEventObj.crashEvent object
  ***/
  self.getUser = function(){
    var inputUsername = self.username;
    UserService.getAccountByUsername(inputUsername)
      .then(function(user){
        self.crashDriver = user.data;
        CrashEventObj.crashEvent.crashDriver = self.crashDriver;
      })
      .catch(function(err){
        console.log('user not received...', err.data);
        self.errorMessage = err.data.error;
      });
  };

});
