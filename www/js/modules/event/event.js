angular.module('crash.event', [])

.controller('EventController', function($ionicSlideBoxDelegate, PopupService, $state, CrashEventObj) {

  var self = this;
  // ngModel
  self.currentStep = 1;
  self.index = 0;

  /***
    Global controller eventCl
  ***/
  self.slideChanged = function(index){
    // Console Log
    console.log('changing index to : ', index);
    // Set ngModel
    self.currentStep = index + 1;
    self.index = index;
  };

  /***
    Delegate function to control the next slide of the slide box
  ***/
  self.nextSlide = function(){
    // Delegate Function
    $ionicSlideBoxDelegate.next();
  };

  /***
    Call Police
  ***/
  self.callEmergency = function(){
    // Show Confirmation
    PopupService.confirmation();
  };

});
