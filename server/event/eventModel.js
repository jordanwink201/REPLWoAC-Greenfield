/***

  Crash Event Model

***/

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var crashSchema = new Schema({

  user : String, // username that created the crash event

  timeStamp: { type: Date, default: Date.now }, //need to parse this when fetch

  createdAt: String,

  // location : String, // investigate format google api returns

  witness : Array,

  accidentPhotoUrls : Array,

  otherPartyInfo: {
    fname : String,
    lname : String,
    username : String,

    phone : String,
    dob : Date,
    email : String,
    licenseNum : String,
    licenseState : String,
    insurance : String,
    policy : String,
    agent : String,
    agentEmail : String,

    otherUser : String,
    licensePhoto : String,
    insuranceCardPhoto : String,
  }

});

var Crash = mongoose.model("Crash", crashSchema);

module.exports = Crash;


