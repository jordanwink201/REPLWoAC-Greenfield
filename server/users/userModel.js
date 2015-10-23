/***



  User Model

***/



//connect:

// var db = mongoose.connect('mongodb://localhost/URL', function(error){
//   if(!error){
//       console.log("mongo is a-ok");
//   }
// });

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var userSchema = new Schema({

  firstName : String,
  lastName : String,
  username : { type : String, required : true, unique : true },
  password : { type : String, required : true },
  phoneNumber : String,
  dob : Date,//need to parse this when we fetch
  email : String,
  driverLicenseNum : String,
  insuranceCompany : String,
  policyNum : String,
  agentName : String,
  agentEmail : String,

  //add a documentPhoto feature after MVP is acheived

});

var User = mongoose.model("User", userSchema);

module.exports = User;



<<<<<<< HEAD

=======
>>>>>>> 0350e61654924cf762fa14a03bdd3d907b8e5108
