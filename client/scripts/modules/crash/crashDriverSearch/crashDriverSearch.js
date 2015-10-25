angular.module('crash.crashDriverSearch', [])

.controller('CrashDriverSearchController', function(UserService, CrashEventObj) {
  
  var self = this;

  self.crashDriver = {};

  /***
    retreive the user's information by their username
    save the crash driver obj into the CrashEventObj.crashEvent object
  ***/
  self.getUser = function(){
    var inputUsername = self.username;
    UserService.readAccount('')
      .then(function(user){
        self.crashDriver = user.data;
        CrashEventObj.crashEvent.crashDriver = self.crashDriver;
      })
      .catch(function(err){
        console.log('user not received...', err);
      });
  };

});
