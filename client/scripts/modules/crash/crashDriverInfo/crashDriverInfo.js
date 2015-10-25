angular.module('crash.crashDriverInfo', [])

.controller('CrashDriverInfoController', function(CrashEventObj){

  // Things to think about... maybe there's more than one other drive info that you want to enter...
  // Maybe by you entering their info since they don't have an account, this actually creates one for them and sends them the info to signup and everything...
  
  var self = this;
  self.person = {};
  self.personMaster = {
    firstname : '',
    lastname : '',
    dob : '',
    phoneNumber : '',
    email : '',
    driverLicenseNum : '',
    insuranceCompany : '',
    policyNum : '',
    agentName : '',
    agentEmail : ''
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
