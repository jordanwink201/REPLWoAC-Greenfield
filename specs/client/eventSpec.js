describe('profile controller testing', function(){

  beforeEach(module('crash.profile'));

  var ctrl, $loc;

  beforeEach(inject(function($controller, $location){
    ctrl = $controller('ProfileController');
    $loc = $location;
  }));

  it('should navigate away from the current page', function(){
    $loc.path('/somePath');
    ctrl.navigate(); // call the function
    expect($loc.path()).toEqual('/home');
  });

});
