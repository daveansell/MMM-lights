"use strict";

Module.register("MMM-lights", {
  // value must be given for each of the parameters
  defaults: {
    debug: false, // if true, the raw data is printed to stdout
  },

  start: function() {
    this.sendSocketNotification("LIGHTS_START", this.config);
  },
  notificationReceived: function(notification, payload, sender){
	  Log.log("MMM-lights notification="+(notification.toString())+" ");
	  if(notification == "LIGHTS_SET"){
		  this.sendSocketNotification(notification, payload);
	  }
  },
  socketNotificationReceived: function(notification, payload) {
   console.log("MMM-lights "+notification+" "+payload.toString());
    this.sendNotification(notification, payload);
  },
});
//# sourceURL=MMM-Simple-Swiper.js
