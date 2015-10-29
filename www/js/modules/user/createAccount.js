angular.module('crash.createAccount', [])

.controller('CreateController', function(UserService, $state, $window){

  var self = this;
  self.user = {};
  self.errorMessage = '';

  /***
    send the new user to the server to be stored in the database
    get a session token back to be stored into window localStorage
  ***/
  self.create = function(){
    console.log('create account for user : ', self.user);
    UserService.createAccount(self.user)
      /***
        response will be an {token:token, user:user}
      ***/
      .then(function(data){
        console.log('created account, session :', data.token);

        $window.localStorage.setItem('com.crash', data.token);

        $state.go('tab.event');
      })
      /***
        Tell the user the error, ex: username already exists, allow them to enter in a different username...
      ***/
      .catch(function(err){
        console.log('Error creating account...', err.data);
        self.errorMessage = err.data.error;
        self.user.username = '';
      });
  };

});
