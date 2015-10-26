/***

  Crash Event Model

***/
  
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var crashSchema = new Schema({

  user : String, // username that created the crash event

  createdAt: { type: Date, default: Date.now }, //need to parse this when fetch

  // location : String, // investigate format google api returns

  witness : Array,

  accidentPhotoUrls : Array,

  otherPartyInfo: {
    firstName : String,
    lastName : String,
    username : String, 

    phoneNumber : String,
    dob : Date,
    email : String,
    driverLicenseNum : String,
    driverLicenseState : String,
    insuranceCompany : String,
    policyNum : String,
    agentName : String,
    agentEmail : String,

    licensePhotoUrl : String,
    insuranceCardPhotoUrl : String,
  }

});

var Crash = mongoose.model("Crash", crashSchema);

module.exports = Crash;


