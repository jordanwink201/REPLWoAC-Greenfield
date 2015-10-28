angular.module('crash.event', [])

.controller('EventController', function($state) {

  var self = this;

  self.witnessArr = [];

  self.person = {};

  self.personMaster = {
    fname : '',
    lname : '',
    phone : '',
    email : '',
    comments : ''
  };

  /***
    store the person object into the witness array
    clear the input text fields after adding the person, so the user can easily add another witness
    angular.copy(self.master) clears ubinds the person object
  ***/
  self.addWitness = function(){
    self.witnessArr.push(self.person);
    self.person = angular.copy(self.master);
  };

  /***
    save the witness array into the CrashEventObj.crashEvent object
  ***/
  self.next = function(){
    console.log('swipped left');
    $state.go('tab.eventPhoto');
    // CrashEventObj.crashEvent.witnessArr = self.witnessArr;
  };

});
