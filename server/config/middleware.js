/***

  Node Middleware

***/

var Utils = require('./utility.js'),
    bodyParser = require('body-parser'),
    cors = require('cors');

module.exports = function(app, express){

  // Define Routers
  var userRouter = express.Router();
  var userActionRouter = express.Router();
  var eventRouter = express.Router();
  var s3Router = express.Router();
  var sendGridRouter = express.Router();
  app.use(cors());

  // Define Middleware
  app.use(bodyParser.json({ limit : '50mb' }));
  app.use(bodyParser.urlencoded({ extended : true , limit : '50mb' }));
  app.use(express.static(__dirname + '/../../www'));

  // Define URL's
  app.use('/api/s3', s3Router);
  app.use('/api/user', userRouter);

  // Decode Token
  app.use('/api/userAction', Utils.decode);
  app.use('/api/userAction', userActionRouter);

  app.use('/api/sendGrid', Utils.decode); //decode user token
  app.use('/api/sendGrid', sendGridRouter);

  app.use('/api/event', Utils.decode); // decode user token before proceeding any further
  app.use('/api/event', eventRouter); // use the eventRouter for all crash event requests, note the '/api/event'

  // Map Routers
  require('../s3/s3Route.js')(s3Router);
  require('../sendGrid/sendGridRoute.js')(sendGridRouter);
  require('../user/userRoute.js')(userRouter);
  require('../userAction/userActionRoute.js')(userActionRouter);
  require('../event/eventRoute.js')(eventRouter);

};
