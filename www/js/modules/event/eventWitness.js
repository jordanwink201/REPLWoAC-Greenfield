angular.module('crash.eventWitness', [])

.controller('EventWitnessController', function(PopupService, $state, CrashEventObj) {

  var self = this;
  // ngModel
  self.witnessArr = [];
  // ngModel
  self.witness = {};
  // Reset Input Fields
  self.witnessMaster = {
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
    // Console Log
    console.log('add witness...');
    // Set ngModel
    self.witnessArr.push(self.witness);
    // Show Success
    PopupService.showSuccess();
    // Set Service Object
    CrashEventObj.crashEvent.witnessArr = self.witnessArr;
    // Reset Input Fields
    self.witness = angular.copy(self.witnessMaster);
    // Console Log Service Object
    console.log('CrashEventObj : ', CrashEventObj);
  };

});
