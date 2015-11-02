describe('Protractor Demo App', function(){

  // browser is a global created by Protractor, which is used for browser-level commands such as navigation with browser.get

  var firstname = element(by.model('signinCl.user.username'));
  var password = element(by.model('signinCl.user.password'));

  it('should fucking work', function(){
    browser.get('http://localhost:8100/#/signin');

    firstname.sendKeys('jordan');
    password.sendKeys('jordan');

    expect(firstname.getAttribute('value')).toEqual('jordan');
    expect(password.getAttribute('value')).toEqual('jordan');    

  });

});

/***
  browser is a global created by Protractor, which is used for browser-level commands such as navigation with browser.get

  browser.pause() is similar to debugger;
***/

// describe('crashApp basic test', function(){
//   var signinButton = element(by.css('.btn-success'));
//   var username = element(by.model('signinCl.user.username'));
//   var password = element(by.model('signinCl.user.password'));
//   var itemInStorage;

//   beforeEach(function(){
//     browser.get('http://localhost:8100/#/signin');
//     browser.executeScript('window.sessionStorage.clear();');

//   });
//   afterEach(function(){
//     itemInStorage = browser.executeScript("return window.localStorage.getItem('com.crash');");
//   });
//   it('should sign in a valid user', function(){
//     username.sendKeys('test');
//     password.sendKeys('test');
    
//     signinButton.click();
//     //browser.pause();
//     //this checks if the redirect works with a valid user
//     expect(browser.getCurrentUrl()).toContain('/');
    
//     // expect(username.getAttribute('value')).toEqual('falconater');
//     // expect(password.getAttribute('value')).toEqual('falconater');

//   });
  
//   it('should have a token in localStorage', function(){
     
//     expect(itemInStorage).toBeTruthy();
//   });
//   // write a test that queries the db here:
  
// });