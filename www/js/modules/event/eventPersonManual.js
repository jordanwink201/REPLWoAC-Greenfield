angular.module('crash.eventPersonManual', [])

.controller('EventPersonManualController', function($state) {

  // Things to think about... maybe there's more than one other drive info that you want to enter...
  // Maybe by you entering their info since they don't have an account, this actually creates one for them and sends them the info to signup and everything...

  var self = this;

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
    save the crash user obj into the CrashEventObj.crashEvent object
  ***/
  self.save = function(){
    console.log('saving...');
    // CrashEventObj.crashEvent.crashDriver = self.person;
    self.person = self.personMaster;
  };

  self.prev = function(){
    console.log('swipped right');
    $state.go('tab.eventPerson');
  };

  self.next = function(){
    console.log('swipped left');
    $state.go('tab.eventFinal');
  };

});
