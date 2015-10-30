angular.module('crash.event', [])

.controller('EventController', function($state, CrashEventObj) {

  var self = this;
  var index = 0;
  self.currentStep = 1;

  // Global controller eventCl
  self.slideChanged = function(index){
    self.index = index;
    self.currentStep++;
  };

});
