angular.module('crash.event', [])

.controller('EventController', function($state, CrashEventObj) {

  var self = this;
  var index = 0;

  // Global controller eventCl
  self.slideChanged = function(index){
    self.index = index;
  };

});
