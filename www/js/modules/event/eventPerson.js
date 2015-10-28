angular.module('crash.eventPerson', [])

.controller('EventPersonController', function($state) {

  var self = this;
  self.errorMessage = '';
  self.crashDriver = {};

  /***
    retreive the user's information by their username
    save the crash driver obj into the CrashEventObj.crashEvent object
    (Future: only be able to retreive non personal data of the other user)
  ***/
  self.getUser = function(){
    console.log('get user...');
    // var inputUsername = self.username;
    // UserService.getAccountByUsername(inputUsername)
    //   .then(function(user){
    //     self.crashDriver = user;
    //     CrashEventObj.crashEvent.crashDriver = self.crashDriver;
    //     console.log('crash event object : ', CrashEventObj.crashEvent);
    //   })
    //   .catch(function(err){
    //     console.log('user not received...', err.data);
    //     self.errorMessage = err.data.error;
    //   });
  };

  self.prev = function(){
    console.log('swipped right');
    $state.go('tab.eventPhoto');
  };

  self.next = function(){
    console.log('swipped left');
    $state.go('tab.eventPersonManual');
  };

});
