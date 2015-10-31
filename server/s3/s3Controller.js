/***

  User Controller

  Save or retreive the existing user to/from the database

***/

var Utils = require('../config/utility.js');
    AWS = require('aws-sdk');

var BUCKET = 'crashninja';



module.exports = {

  // POST

  /***

  ***/
  upload : function(req, res, next){

    console.log('UPLOAD THE IMAGE IN THE SERVER...');

    AWS.config.update({accessKeyId: 'AKIAJ2WOCLBOOX4UQWBA', secretAccessKey: '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'});
    AWS.config.update({region: 'us-west-1'});

    var s3Bucket = new AWS.S3({params:{Bucket: BUCKET}});

    var imageBuffer = new Buffer(req.body.imageData.replace(/^data:image\/\w+;base64,/, ""),'base64');

    var data = {
      Key: req.body.imgName + new Date() + '.png',
      Body: imageBuffer,
      ContentEncoding: 'base64',
      ContentType: 'image/png'
    };

    // send back the url of the image that is stored in S3
    s3Bucket.upload(data, function(err, data){
      if (err) {
        res.status(404).send({error : err.message});
      } else {
        var imageS3URL = data.Location;
        res.json({imageURL : imageS3URL});
      }
    });
  }

};
