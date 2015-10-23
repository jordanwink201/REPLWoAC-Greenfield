/***

  Node Middleware

***/

var Utils = require('./utility.js');
var bodyParser = require('body-parser'); // for parsing the req body

module.exports = function(app, express){

  // Define Routers
  var userRouter = express.Router();
  var crashRouter = express.Router();

  // Define Middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended : true}));
  app.use(express.static(__dirname + '/../../client'));

  // Define URL
  app.use('/api/user', userRouter); // use the userRouter for all user requests, note the '/api/user'
  app.use('/api/event', crashRouter); //use the crashRouter for all crash requests, note the 'api/event'
  
  // Pass the userRouter to the function in userRouters
  require('../user/userRoute.js')(userRouter);
  //Pass the userRouter to the function in crashRouters
  require('../user/crashRoute.js')(crashRouter);

};