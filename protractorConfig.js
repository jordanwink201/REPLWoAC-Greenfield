exports.config = {

  framework : 'jasmine2',

  seleniumAddress : 'http://localhost:4444/wd/hub',

  // The URL where the server we are testing is running
  baseUrl: 'http://localhost:3001/#/',

  specs : ['specs/client/crashSpec.js'],
//enables testing with multiple browsers
  multiCapabilities : [
      {'browserName' : 'chrome'},
      {'browserName' : 'firefox'}
    ]
};
