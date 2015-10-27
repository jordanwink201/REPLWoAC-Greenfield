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

    AWS.config.update({accessKeyId: 'AKIAJ2WOCLBOOX4UQWBA', secretAccessKey: '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'});  

    AWS.config.update({region: 'us-west-1'});

    console.log('UPLOAD THE IMAGE IN THE SERVER...');

    var s3Bucket = new AWS.S3({params:{Bucket: BUCKET}});

    var imageBuffer = new Buffer(req.body.imageData.replace(/^data:image\/\w+;base64,/, ""),'base64');

    var data = {
      Key: req.body.imgName + '.png', 
      Body: imageBuffer,
      ContentEncoding: 'base64',
      ContentType: 'image/png'
    };

    s3Bucket.upload(data, function(err, data){
      if (err) { 
        console.log('Error uploading image: ', err); 
      } else {
        console.log('succesfully uploaded the image!', data.Location);
        var imageS3URL = data.Location;
        // send back the url of the image that is stored in S3
        res.json({imageURL : imageS3URL});
      }
    });


  }
  
};
