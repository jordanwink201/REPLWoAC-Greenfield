/***

sendEmail() sends an email (or emails) containing crashObj data via SendGrid API

using sendGrid templates for images:

image base 64 does not work in gmail inline, we should use S3 and link the url to our email template(need to test this)

***bug : addTo() doesn't send to the original 'to' property in params***
   email.addTo('cyrus.gomeza@gmail.com');
   email.addTo('jordanwink201@gmail.com');

***bug : sends multiple emails via bcc***
   email.bcc = ['cyrus.gomeza@gmail.com',  '1276stella@gmail.com', 'jordanwink201@gmail.com',
  'royceleung@gmail.com'];

 (feat) add geolocation and date/time data
 
***/
var sendgrid = require('sendgrid')('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');
//this should be in a separate template file:
var html_body = "<table style=\"border: solid 1px #000; background-color: #666; font-family: verdana, tahoma, sans-serif; color: #fff;\"> <tr> <td><h3 style='text-align: center;'>CrashNinja Accident Report</h3><div><hr/><div style='text-align:right;'></div><div></div><div></div></div><p>ATTN: %user-agent%,</p><p>%user-insurance%</p><p>%user-agentEmail%</p><div><p>My name is %user-fname% %user-lname% and I was recently involved in an auto accident with %otherDriver-fname% %otherDriver-lname% on %accident-date%. <br> Please contact me immediatly at %user-phone% for details.</p><h4>My Information: </h4><hr><p>Driver License ID: %user-license%</p><p>Driver License State: %user-licenseState%</p><p>Policy Number: %user-policy%</p><br><h4>%otherDriver-fname% %otherDriver-lname%'s Information: </h4><hr><p>Driver License ID: %otherDriver-license%</p><p>Driver License State: %otherDriver-licenseState%</p><p>Policy Number: %otherDriver-policy%</p></div><div><h4>Crash Photos</h4><hr><h4>Witness information:</h4><hr/><p>Full Name: %-witness-firstname% %-witness-lastname%</p><p>Phone Number: %-witness-phoneNumber%</p><p>Email: %-witness-email%</p></div> </td> </tr> </table>";

//default email values:
var params = {
  to: '',
  from: '',
  subject: 'I\'ve been in an accident',
  html : html_body
};
//creates a new email object:
var email = new sendgrid.Email(params);

module.exports = {

  sendEmail : function(req, res, next){
    console.log(email.to);
    // console.log("user info------------>", req.user);
    console.log("other driver info------------>", req.body);
    
    
  var mainSubs = {
    "%user-agent%":[
      req.user.agent       
    ],
    "%user-insurance%":[
      req.user.insurance      
    ],
    "%user-agentEmail%": [
      req.user.agentEmail   
    ],
    "%user-fname%": [
      req.user.fname
    ],
    "%user-lname%": [
      req.user.lname
    ],
    "%user-insurance%": [
      req.user.insurance
    ],
    "%otherDriver-fname%": [
      req.body.crashDriver.fname           
    ],
    "%otherDriver-lname%": [
      req.body.crashDriver.lname
    ],
    "%accident-date%": [
      new Date(req.body.crashDriver.createdAt).toDateString()//this is soo janky 
      // req.body.crashDriver.createdAt
    ],
    "%user-phone%":[
      req.user.phone
    ],
    "%user-license%":[
      req.user.license
    ],
    "%user-licenseState%":[
      req.user.licenseState
    ],
    "%user-policy%":[
      req.user.policy
    ],
    "%otherDriver-license%": [
      req.body.crashDriver.license               
    ],
    "%otherDriver-licenseState%": [
      req.body.crashDriver.licenseState                    
    ],
    "%otherDriver-policy%": [
      req.body.crashDriver.policy           
    ]

  };

  var witnessSubs = {
    "%-witness-firstname%":
      'firstname',
    "%-witness-lastname%":
      'lastname',
    "%-witness-phoneNumber%":
      'phone',
    "%-witness-email%":
      'email'        
  };

  //adds main crash data to email:
  for (var tag in mainSubs) {
    email.addSubstitution(tag, mainSubs[tag]);
  }
  //adds witness crash data to email:
  //**beware, it only works for a single witness currently!
  var witnessArray = req.body.witnessArr;

  witnessArray.forEach(function(witness){
    for(var key in witness){
      witnessSubs['%-witness-' + key + '%'] = witness[key];
    }
  });

  for(var tag in witnessSubs){
    email.addSubstitution(tag, witnessSubs[tag]);
  }

  // var emailArr = req.body.userEmailAddresses;

  //iterates over req.body.userEmailAddresses array

  // for (var address in emailArr){
  //   // email.addTo(emailArr[address]);
  //   email.bcc.push(emailArr[address]);//blind carbon copy
  // }
  
  email.to = req.user.agentEmail;
  email.from = req.user.email;
 console.log('email------------->', email);
  // sends the email:
    sendgrid.send(email, function(err, json) {
      if (err) { return console.error(err); }
      console.log('', json);
    });
  }

}