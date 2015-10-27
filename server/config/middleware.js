/***

  Node Middleware

***/

var Utils = require('./utility.js');
    bodyParser = require('body-parser'); // for parsing the req body

module.exports = function(app, express){

  // Define Routers
  var userRouter = express.Router();
  var userActionRouter = express.Router();
  var eventRouter = express.Router();
  var s3Router = express.Router();

  // Define Middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended : true }));
  app.use(express.static(__dirname + '/../../client'));

  // Define URL's

  app.use('/api/s3', s3Router); // use the userRouter for all user requests, note 

  app.use('/api/user', userRouter); // use the userRouter for all user requests, note the '/api/user'
  
  app.use('/api/userAction', Utils.decode); // decode user token before proceeding any 
  app.use('/api/userAction', userActionRouter); // use the userRouter for all user requests, note the '/api/user'

  app.use('/api/event', Utils.decode); // decode user token before proceeding any further
  app.use('/api/event', eventRouter); // use the eventRouter for all crash event requests, note the '/api/event'

  // Pass the userRouter to the function in userRouters
  require('../s3/s3Route.js')(s3Router);
  require('../user/userRoute.js')(userRouter);
  require('../userAction/userActionRoute.js')(userActionRouter);
  require('../event/eventRoute.js')(eventRouter);

};
