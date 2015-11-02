/***

  Crash Event Model

***/

// External Resources
var mongoose = require("mongoose");
// Define Mongoose Schema
var Schema = mongoose.Schema;
// Create Mongoose Schema
var crashSchema = new Schema({
  user : String,
  timeStamp: { type: Date, default: Date.now },
  createdAt: String,
  location : Array, 

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
// Export Mongoose Model
module.exports = mongoose.model("Crash", crashSchema);


