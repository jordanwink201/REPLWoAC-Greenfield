/***

  User Model

***/

// External Resources
var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Q = require('q'),
    Schema = mongoose.Schema,
    SALT_WORK_FACTOR = 10;
// Create Mongoose Schema
var userSchema = new Schema({
  fname : String,
  lname : String,
  username : { type : String, required : true, unique : true },
  password : { type : String, required : true },
  phone : String,
  dob : String,
  email : String,
  profileImgUrl: { type : String, default : 'img/crashProfile2.jpg' },
  license : String,
  licenseState : String,
  insurance : String,
  policy : String,
  agent : String,
  agentEmail : String,
  createdAt : { type: Date, default: Date.now }
});

/***
  Compare the password from the database associated to the user with the password that is attached to the request object
***/
userSchema.methods.comparePasswords = function(requestObjPassword){
  // Console Log
  console.log('Compare passwords, this.password : ', this.password, ' : requestObjPassword : ', requestObjPassword);
  // Define Promise
  var defer = Q.defer();
  // Set Local
  var databasePassword = this.password;
  // Create Promise
  bcrypt.compare(requestObjPassword, databasePassword, function(err, isMatch){
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(isMatch);
    }
  });
  // Return Promise
  return defer.promise;
};

/***
  Before the user gets saved into the database, the password that was provided to create the account needs to be encrypted...
***/
userSchema.pre('save', function(next){
  // Console Log
  console.log('hash password before saving a new user...');
  // Define Context
  var user = this;
  // Generate Salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
    if (err) {
      console.log('could not generate salt...', err);
    }
    // Generate Hash
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if (err) {
        console.log('could not generate hash...', err);
      }
      // Set User Object Properties
      user.password = hash;
      user.salt = salt;
      // Continue
      next();
    });
  });
});

// Export Mongoose Model
module.exports = mongoose.model("User", userSchema);


