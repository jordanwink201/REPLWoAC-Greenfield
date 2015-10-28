angular.module('crash.eventFinal', [])

.controller('EventFinalController', function($state){

  var self = this;

  self.prev = function(){
    console.log('swipped right');
    $state.go('tab.eventPersonManual');
  };



});
