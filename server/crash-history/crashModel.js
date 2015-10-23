/***



  Crash Model

***/

  
var mongoose = require("mongoose");

var Schema = mongoose.Schema;


//credentials
//mongodb://<dbuser>:<dbpassword>@ds041934.mongolab.com:41934/crashdata

//create connection


var crashSchema = new Schema({

  timeStamp: Date, //need to parse this when fetch

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




