angular.module('crash.eventPerson', [])

.controller('EventPersonController', function($state, UserService, CrashEventObj) {

  var self = this;

  self.errorMessage = '';

  self.crashDriver = {};

  // From Add Personal Manually
  self.person = {};
  self.personMaster = {
    fname : '',
    lname : '',
    dob : '',
    phone : '',
    email : '',
    license : '',
    insurance : '',
    policy : '',
    agent : '',
    agentEmail : ''
  };

  /***
    retreive the user's information by their username
    save the crash driver obj into the CrashEventObj.crashEvent object
    (Future: only be able to retreive non personal data of the other user)
  ***/
  self.getUser = function(){
    var inputUsername = self.username;
    UserService.getAccountByUsername(inputUsername)
      .then(function(user){
        self.crashDriver = user;
        CrashEventObj.crashEvent.crashDriver = self.crashDriver;
        console.log('crash event object : ', CrashEventObj.crashEvent);
      })
      .catch(function(err){
        console.log('user not received...', err.data);
        self.errorMessage = err.data.error;
      });
  };

  /***
    save the crash user obj into the CrashEventObj.crashEvent object
  ***/
  self.save = function(){
    console.log('saving...');
    CrashEventObj.crashEvent.crashDriver = self.person;
    self.person = self.personMaster;
  };


});
