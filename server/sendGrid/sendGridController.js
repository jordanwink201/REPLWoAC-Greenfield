/***

sendEmail() sends an email (or emails) containing crashObj data via SendGrid API
todo: make the template in handlebars.js so the image and witness sections can be more dynamic

***/
var sendgrid = require('sendgrid')('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');
//this should be in a separate template file:
var template = "<table style=\"border: solid 1px #000; background-color: #666; font-family: verdana, tahoma, sans-serif; color: #fff;\"> <tr> <td><h3 style='text-align: center;'>CrashNinja Accident Report</h3><div><hr/><div style='text-align:right;'></div><div></div><div></div></div><p>ATTN: %user-agent%,</p><p>%user-insurance% agent</p><p>%user-agentEmail%</p><br><br><div><p>My name is %user-fname% %user-lname% and I was recently involved in an auto accident with %otherDriver-fname% %otherDriver-lname% on %accident-date%.<br>Please contact me immediately at %user-phone% for details.</p><h4>My Information: </h4><hr><p>Driver License ID: %user-license%</p><p>Driver License State: %user-licenseState%</p><p>Policy Number: %user-policy%</p><br><h4>%otherDriver-fname% %otherDriver-lname%'s Information: </h4><hr><p>Driver License ID: %otherDriver-license%</p><p>Driver License State: %otherDriver-licenseState%</p><p>Phone: %otherDriver-phone%</p><p>Insurance: %otherDriver-insurance%</p><p>Agent: %otherDriver-agent%</p><p>Policy Number: %otherDriver-policy%</p></div><div><h4>Crash Photos</h4><hr><img src='%-imageURL0-%'><img src='%-imageURL1-%'><img src='%-imageURL2-%'><h4>Witness information:</h4><hr/><p>Full Name: %-witness-fname% %-witness-lname%</p><p>Phone Number: %-witness-phone%</p><p>Email: %-witness-email%</p></div></td></tr></table>";

//default email values:
var params = {
  subject: 'I\'ve been in an accident',
  html : template
};
//creates a new email object:
var email = new sendgrid.Email(params);

module.exports = {

  sendEmail : function(req, res, next){
  console.log('req.user----------->', req.user);
  console.log(req.body);

  var userInfo = req.user;
  var otherDriver = req.body.crashDriver;

  //this is janky, refactor with moment.js:
  var accidentDate = new Date(req.body.crashDriver.createdAt).toDateString();

  var userSubs = {

    '%user-agent%'        : '',
    '%user-insurance%'    : '',
    '%user-agentEmail%'   : '',
    '%user-fname%'        : '',
    '%user-lname%'        : '',
    '%user-insurance%'    : '',
    '%user-phone%'        : '',
    '%user-license%'      : '',
    '%user-licenseState%' : '',
    '%user-policy%'       : ''
  };

  var otherDriverSubs = {

    '%otherDriver-fname%'        : '',
    '%otherDriver-lname%'        : '',
    '%otherDriver-license%'      : '',            
    '%otherDriver-licenseState%' : '',                 
    '%otherDriver-policy%'       : '',          
    'otherDriver-phone'          : '',
    '%otherDriver-insurance%'    : '',
    'otherDriver-agent'          : ''
  }

  var witnessSubs = {

    '%-witness-fname%' : 'none',
    '%-witness-lname%' : 'none',
    '%-witness-phone%' : 'none',
    '%-witness-email%' : 'none'        
  };

  var imageSubs = {

    '%-imageURL0-%' : '',
    '%-imageURL1-%' : '',
    '%-imageURL2-%' : ''
  }


  //adds crash data to email:
  email.addSubstitution('%accident-date%', accidentDate);

  for (var key in userInfo){
    userSubs['%user-' + key + '%'] = userInfo[key];
  }

  for (var tag in userSubs) {
    email.addSubstitution(tag, userSubs[tag]);
  }

  for (var key in otherDriver){
    otherDriverSubs['%otherDriver-' + key + '%'] = otherDriver[key];
  }

  for (var tag in otherDriverSubs) {
    email.addSubstitution(tag, otherDriverSubs[tag]);
  }

  //adds witness data to email:
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
  //adds images from s3
  var imageArr = req.body.eventImages;
  console.log('imageArr------------>', imageArr);

  imageArr.forEach(function(image, index){
    for(var key in image){
      imageSubs['%-' + key + index + '-%'] = image[key];
    }
  });
  // for(var i=0; i < imageArr.length; i++){
  //   imageSubs['%-image' + i + '-%'] = imageArr[i];
  // }

  for(var tag in imageSubs){
    email.addSubstitution(tag, imageSubs[tag]);
  }

  //multiple emails is not functional currently:

  // var emailArr = req.body.userEmailAddresses;

  // for (var address in emailArr){
  //   // email.addTo(emailArr[address]);
  //   email.bcc.push(emailArr[address]);//blind carbon copy
  // }
  
  email.to = req.user.agentEmail;
  email.from = req.user.email;
console.log('email------->', email);
  // sends the email to sendGrid (uncomment to go live):  
    sendgrid.send(email, function(err, json) {
      if (err) { return console.error(err); }
      console.log('', json);
    });
  }

}