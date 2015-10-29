/***

  User Model

***/

var mongoose = require('mongoose');
    bcrypt = require('bcrypt-nodejs');
    Q = require('q');
    Schema = mongoose.Schema;
    SALT_WORK_FACTOR = 10;

var userSchema = new Schema({

  fnam : String,
  lname : String,
  username : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  },
  phone : String,
  dob : Date,
  email : String,
  license : String,
  licenseState : String,
  insurance : String,
  policy : String,
  agent : String,
  agentEmail : String,

  createdAt : {
    type: Date,
    default: Date.now
  },

  //add a documentPhoto feature after MVP is acheived

});

/***
  Compare the password from the database associated to the user with the password that is attached to the request object
***/
userSchema.methods.comparePasswords = function(requestObjPassword){

  var defer = Q.defer();
  var databasePassword = this.password;

  // Create a promise
  bcrypt.compare(requestObjPassword, databasePassword, function(err, isMatch){
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(isMatch);
    }
  });

  return defer.promise;
};

/***
  Before the user gets saved into the database, the password that was provided to create the account needs to be encrypted...
***/
userSchema.pre('save', function(next){
  var user = this;

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
    if (err) {
      console.log('could not generate salt...', err);
    }

    // generate hash for the password using the generated salt and user password
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if (err) {
        console.log('could not generate hash...', err);
      }

      user.password = hash; // store the new password
      user.salt = salt; // add the salt property to the user object
      next();
    });

  });

});

/***
  Export the User model based on the user schema
***/
module.exports = mongoose.model("User", userSchema);


