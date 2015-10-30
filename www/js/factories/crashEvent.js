angular.module('crash.crashEventObj', [])

.service('CrashEventObj', function(){

  this.crashEvent = {
    eventImages : ['https://s3-us-west-1.amazonaws.com/crashninja/sceneTue+Oct+27+2015+22%3A43%3A01+GMT-0700+(PDT).png', 'https://s3-us-west-1.amazonaws.com/crashninja/sceneTue+Oct+27+2015+13%3A16%3A42+GMT-0700+(PDT).png', 'https://s3-us-west-1.amazonaws.com/crashninja/sceneTue+Oct+27+2015+13%3A16%3A39+GMT-0700+(PDT).png']
  };

});
