angular.module('crash.event', [])

.controller('EventController', function($ionicSlideBoxDelegate, PopupService, $state, CrashEventObj) {

  var self = this;
  var index = 0;
  self.currentStep = 1;

  // Global controller eventCl
  self.slideChanged = function(index){
    self.index = index;
    self.currentStep = index + 1;
  };

  // Delegate function to control the next slide of the slide box
  self.nextSlide = function(){
    $ionicSlideBoxDelegate.next();
  };

  // Call Police
  self.callEmergency = function(){
    PopupService.confirmation();
  };

});
