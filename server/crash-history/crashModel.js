/***


  Crash Model

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





