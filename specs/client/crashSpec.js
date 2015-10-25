describe('Protractor Demo App', function(){

  // browser is a global created by Protractor, which is used for browser-level commands such as navigation with browser.get

  var firstName = element(by.model('person.firstname'));
  var lastName = element(by.model('person.lastname'));

  it('should add one and two', function(){
    browser.get('http://localhost:3001/#/');

    firstName.sendKeys('Jordan');
    lastName.sendKeys('Winkelman');

    expect(firstName.getAttribute('value')).toEqual('Jordan');
    expect(lastName.getAttribute('value')).toEqual('Winkelman');    

  });

});
