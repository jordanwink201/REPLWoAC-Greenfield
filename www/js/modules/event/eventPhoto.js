angular.module('crash.eventPhoto', [])

.controller('EventPhotoController', function($state) {

  var self = this;


  self.prev = function(){
    console.log('swipped right');
    $state.go('tab.event');
  };

  self.next = function(){
    console.log('swipped left');
    $state.go('tab.eventPerson');
  };

});
