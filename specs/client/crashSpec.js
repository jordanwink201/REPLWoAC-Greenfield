describe('Protractor Demo App', function(){

  // browser is a global created by Protractor, which is used for browser-level commands such as navigation with browser.get

  // it('should have a title', function(){
  //   browser.get('http://localhost:3001/#/');

  //   expect(browser.getTitle()).toEqual('Super Calculator');
  // });

  it('should add one and two', function(){
    browser.get('http://juliemr.github.io/protractor-demo/');

    element(by.css('.myclass')).sendKeys(1);
    element(by.model('second')).sendKeys(2);
  })

});
