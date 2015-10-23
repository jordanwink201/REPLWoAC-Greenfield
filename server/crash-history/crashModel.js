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

  location : Schema.Types.Mixed,//investigate format google api returns

  witness: { 
    firstname : String,
    lastName : String,
    phone: String
  },

  accidentPhotoUrls : Array,

  otherPartyInfo: {
    otherUser : Schema.Types.Mixed,
    licensePhotoUrl : String,
    insuranceCardPhotoUrl : String,
    licensePlatePhotoUrl : String
  }


});

var Crash = mongoose.model("Crash", crashSchema);

module.exports = Crash;




