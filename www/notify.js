var gcm = require('node-gcm');
var message = new gcm.Message();
 
//API Server Key
var sender = new gcm.Sender('AIzaSyCP9-IQQx3tagRl8TYFArso_UUbav_JAho');
var registrationIds = [];
 
// Value the payload data to send...
message.addData('message',"super ekstra wiadomość..;) \u2764");
message.addData('title','Halo dagmara:)' );
message.addData('msgcnt','1'); // Shows up in the notification in the status bar
message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
//message.collapseKey = 'demo';
//message.delayWhileIdle = true; //Default is false
message.timeToLive = 10000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.
 
// At least one reg id required
// device unique.. samsung s4 m
registrationIds.push('APA91bHo1uACzHGK1HDFvAAMpdRsR2wENIZJOmwDjRJP_CvqHZ0xlXpTOV_MTvzSMNVAsuLtgtfPdeo_6mCZAh3A16_N9FraBuAU9NqVyggBGznL5XM07_oaTkaZw5iOOJut-kIFzczna4LuFJ0ixU5xSCI-afj1Prjuns-YNBxjf1f1kq4VkeI');
// tab
registrationIds.push('APA91bF5CJPAXlbmMh7xF52xhlnB45SDXXp30qcjGozmW4T2Ycw71k5_RjVPqyM1ASjcwEZsgJBVQmfMaN74NliMBe3Qkujmo9wmtcSwjoBushTtTckIVSbBRGaTon35E08KPsANBc1By6rV59gJMWr8Q5zG_l0Xt8AY3zJ_3sWYmyz9eN79TAs');


/**
 * Parameters: message-literal, registrationIds-array, No. of retries, callback-function
 */
sender.send(message, registrationIds, 4, function (result) {
    console.log(result);
});