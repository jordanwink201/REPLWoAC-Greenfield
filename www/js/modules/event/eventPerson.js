angular.module('crash.eventPerson', [])

.controller('EventPersonController', function($state, UserService, CrashEventObj) {

  var self = this;

  self.enterManual = false;

  self.errorMessage = '';

  self.crashDriver = {};

  self.allUsers = []; // all of the user's USERNAMES in the database

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

  /***
    get all of the users USERNAMES that exist so that you can search through and filter the one you are looking for
  ***/
  self.getAllUsers = function(){
    console.log('getting all users');
    UserService.readAllUsers()
      .then(function(allUsers){
        console.log('all users in db : ', allUsers);
        self.allUsers = allUsers.data;
      })
      .catch(function(err){
        console.log('error getting all users...');
      });
  };


});
