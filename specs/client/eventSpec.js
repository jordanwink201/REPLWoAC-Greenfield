describe('ProfileController', function(){

  var $scope, $rootScope, createController, UserService, $httpBackend;

  beforeEach(module('crash'));
  beforeEach(inject(function($injector){

    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    UserService = $injector.get('UserService');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function(){
      return $controller('ProfileController', {
        $scope : $scope,
        UserService : UserService
      });
    };

  }));

  // it('should have a ')

});
