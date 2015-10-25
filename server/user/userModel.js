/***

  User Model

***/

var mongoose = require('mongoose');
    bcrypt = require('bcrypt-nodejs');
    Q = require('q');
    Schema = mongoose.Schema;
    SALT_WORK_FACTOR = 10;

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
  dob : Date,
  email : String,
  driverLicenseNum : String,
  driverLicenseState : String,
  insuranceCompany : String,
  policyNum : String,
  agentName : String,
  agentEmail : String,

  createdAt : { 
    type: Date, 
    default: Date.now 
  }, 

  
  //add a documentPhoto feature after MVP is acheived

});

var User = mongoose.model("User", userSchema);

module.exports = User;

/***
  Before the user gets saved into the database, the password that was provided to create the account needs to be encrypted...
***/
userSchema.pre('save', function(next){
  console.log('pre saving a user schema...');
  var user = this;

  if (!user.isModified('password')) {

  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
    if (err) {
      console.log('could not generate salt...', err);
    }

    console.log('salt generated : ', salt);

    // generate hash for the password using the generated salt and user password
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if (err) {
        console.log('could not generate hash...', err);
      }

      console.log('hash generated : ', hash);

      user.password = hash; // store the new password
      user.salt = salt; // add the salt property to the user object
      next();
    });


  });
  
});


