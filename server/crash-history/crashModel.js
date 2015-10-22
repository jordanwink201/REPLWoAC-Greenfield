/***

  CRASH MODELS


***/

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//create connection

var db = mongoose.connection("url", function (error) {
  if(!error) {
    console.log("Everything is 200");
  }
})

var crashSchema = new Schema({

  timeStamp: Date, //need to parse this when fetch
  witness: { 
    firstname : String,
    lastName : String,
    phone: String
  },
  otherPartyInfo: {
    firstname: String,
    lastName: String,
    phoneNum: String,
    email: String,
    driverLicenseNum: String,
    insuranceCompany: String,
    insurancePolicyNum: String, 
  }


});

var Crash = mongoose.model("Crash", crashSchema);

module.exports = Crash;


/***
features to research:
include geo location data in the model?

example syntax : 
var locationSchema = new Schema({
  name : String,
  loc : {
    type : [Number],  //this is [lon, lat]
    index : '2d'
  }
})

