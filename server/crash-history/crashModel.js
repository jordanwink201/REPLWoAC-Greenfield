/***

  Crash Model

***/
  
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var crashSchema = new Schema({

  timeStamp: { type: Date, default: Date.now }, //need to parse this when fetch

  location : String,//investigate format google api returns

  witness: { 
    firstname : String,
    lastName : String,
    phone: String
  },

  accidentPhotoUrls : Array,

  otherPartyInfo: {
    licensePhotoUrl : String,
    insuranceCardPhotoUrl : String,
  }

});

var Crash = mongoose.model("Crash", crashSchema);

module.exports = Crash;




