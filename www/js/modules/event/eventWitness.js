angular.module('crash.eventWitness', [])

.controller('EventWitnessController', function($state, CrashEventObj) {

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
    save the witness array into the CrashEventObj.crashEvent object
    clear the input text fields after adding the person, so the user can easily add another witness
    angular.copy(self.master) clears ubinds the person object
  ***/
  self.addWitness = function(){
    self.witnessArr.push(self.person);
    CrashEventObj.crashEvent.witnessArr = self.witnessArr;
    self.person = angular.copy(self.master);
  };

});
