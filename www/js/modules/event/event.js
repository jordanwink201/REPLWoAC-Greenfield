angular.module('crash.event', [])

.controller('EventController', function($state, CrashEventObj) {

  var self = this;

  var index = 0;

  self.slideChanged = function(index){
    console.log('SLIDE INDEX : ', index);
    self.index = index;
  };

});
