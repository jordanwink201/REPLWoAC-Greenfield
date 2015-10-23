/***

  User Model

***/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

  firstName : String,
  lastName : String,
  username : { 
    type : String, 
    required : true, 
    unique : true
  },
  password : { 
    type : String,
    required : true
  },
  phoneNumber : String,
  dob : { 
    type: Date, 
    default: Date.now 
  }, 
  email : String,
  driverLicenseNum : String,
  driverLicenseState : String,
  insuranceCompany : String,
  policyNum : String,
  agentName : String,
  agentEmail : String,

  // add a documentPhoto feature after MVP is acheived

});

var User = mongoose.model("User", userSchema);

module.exports = User;



