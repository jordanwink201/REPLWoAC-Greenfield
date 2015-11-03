angular.module('crash.popupService', [])

.service('PopupService', function($ionicPopup, $timeout){

  /***
    An alert popup dialog
  ***/
  this.showAlert = function(errMsg) {
    var alertPopup = $ionicPopup.alert({
      title: 'Oops!',
      template: errMsg
    });
    alertPopup.then(function(res) {
      console.log('error popup resolved');
    });
  };

  //
  this.showSuccess = function(){
    // An elaborate, custom popup
    var successPopup = $ionicPopup.alert({
      title: 'Success!',
      template: '<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>',
      buttons : []

    });
    $timeout(function(){
      successPopup.close(); //close the popup after 3 seconds
    }, 1000);
   };

  // Confirmation Popup
  this.confirmation = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Emergency',
      template: 'Call 911?',
      buttons : [
        {text : 'Cancel', type: 'button-light'},
        {text : 'Call Now', type: 'button-assertive'}
      ]
    });
    confirmPopup.then(function(res) {
      if(res) {
        console.log('You are sure');
        // call the police
      } else {
        console.log('You are not sure');
        // close popup
      }
    });
  };

});
