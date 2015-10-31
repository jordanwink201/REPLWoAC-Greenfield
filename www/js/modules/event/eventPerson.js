angular.module('crash.eventPerson', [])

.controller('EventPersonController', function($ionicSlideBoxDelegate, LoadingService, PopupService, UserService, CrashEventObj, $state) {

  var self = this;
  self.enterManual = false;

  self.crashDriver = {};

  self.allUsers = []; // all of the user's USERNAMES , fnames & lnames in the database

  // In the future, this should create a new account for the user you enter and then send them an email telling them to confirm their account

  // From Add Personal Manually
  self.crashDriverMaster = {
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
    // RUNS when the user clicks on a user to save into the crash event object
    retreive the user's information by their username
    save the crash driver obj into the CrashEventObj.crashEvent object
    (Future: only be able to retreive non personal data of the other user)
    Retreive the rest of the user's information
  ***/
  self.getUser = function(username){
    console.log('get ', username, ' information and store into the crash event object as the crash driver');

    LoadingService.showLoader();

    UserService.getAccountByUsername(username)
      .then(function(user){
        console.log('crash driver returned from DB : ', user);
        self.crashDriver = user;
        CrashEventObj.crashEvent.crashDriver = self.crashDriver;
        console.log('crash event object : ', CrashEventObj.crashEvent);

        // show success popup
        PopupService.showSuccess();

        LoadingService.hideLoader();

      })
      .catch(function(err){
        console.log('user not received...', err.data);
        PopupService.showAlert(err.data.error);
        LoadingService.hideLoader();
      });
  };

  /***
    After manually entering the crash driver's information
    save the crash user obj into the CrashEventObj.crashEvent object
  ***/
  self.save = function(){

    LoadingService.showLoader();

    CrashEventObj.crashEvent.crashDriver = self.crashDriver;

    console.log('CRASH EVENT : ', CrashEventObj.crashEvent);

    // Reset inputs
    self.crashDriver = self.crashDriverMaster;

    // show success popup
    PopupService.showSuccess();
    LoadingService.hideLoader();

    // trigger go to the next screen
    $ionicSlideBoxDelegate.next();
  };

  /***
    // RUNS AT THE BEGINNING
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
