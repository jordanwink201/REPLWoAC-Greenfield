/***

  Node Middleware

***/

var Utils = require('./utility.js');
var bodyParser = require('body-parser'); // for parsing the req body

module.exports = function(app, express){

  // Define Routers
  var userRouter = express.Router();

  // Define Middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended : true}));
  app.use(express.static(__dirname + '/../../client'));

  // Define URL
  app.use('/api/users', userRouter); // use the userRouter for all user requests, note the '/api/users'

  // Pass the userRouter to the function in userRouters
  require('../users/userRoutes.js')(userRouter);

};