// describe('Protractor Demo App', function(){

//   // browser is a global created by Protractor, which is used for browser-level commands such as navigation with browser.get

//   var firstName = element(by.model('person.firstname'));
//   var lastName = element(by.model('person.lastname'));

//   it('should add one and two', function(){
//     browser.get('http://localhost:3001/#/');

//     firstName.sendKeys('Jordan');
//     lastName.sendKeys('Winkelman');

//     expect(firstName.getAttribute('value')).toEqual('Jordan');
//     expect(lastName.getAttribute('value')).toEqual('Winkelman');    

//   });

// });

/***
  browser is a global created by Protractor, which is used for browser-level commands such as navigation with browser.get

  browser.pause() is similar to debugger;
***/

describe('crashApp basic test', function(){
  var signinButton = element(by.css('.btn-success'));
  var username = element(by.model('signInCtrl.user.username'));
  var password = element(by.model('signInCtrl.user.password'));
  var itemInStorage;

  beforeEach(function(){
    browser.get('http://localhost:3001/#/signin');
    browser.executeScript('window.sessionStorage.clear();');

  });
  afterEach(function(){
    itemInStorage = browser.executeScript("return window.localStorage.getItem('com.crash');");
  });
  it('should sign in a valid user', function(){
    username.sendKeys('falconater');
    password.sendKeys('falconater');
    
    signinButton.click();
    //browser.pause();
    //this checks if the redirect works with a valid user
    expect(browser.getCurrentUrl()).toContain('/');
    
    // expect(username.getAttribute('value')).toEqual('falconater');
    // expect(password.getAttribute('value')).toEqual('falconater');

  });
  
  it('should have a token in localStorage', function(){
     
    expect(itemInStorage).toBeTruthy();
  });
  // write a test that queries the db here:
  
});