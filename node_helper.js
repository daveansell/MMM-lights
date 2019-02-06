var NodeHelper = require("node_helper");
var doneSetup = false;
module.exports = NodeHelper.create({
  socketNotificationReceived: function(notification, payload) {
    this.lights;
    var thethis=this;
    console.log("MMM-lights notification ="+notification.toString());
    if(notification =="LIGHTS_START"){
	console.log("MMM-lights starting");
	let DEBUG = payload["debug"];
	let blankTime = payload["blankTime"];
	this.lights = require("child_process").spawn("sudo", [
	                       "python3",
	                        __dirname + "/lights.py",

	]);
	this.lights.stdin.setEncoding('utf-8');
	this.lights.stdin.write("0\n");
    	this.lights.stdout.on("exit", function(exitCode) {
    	  thethis.lights.stdin.write("q\n");
    	  console.log(exitCode);
    	});
	doneSetup = true;
    }else if(notification == "LIGHTS_SET" && doneSetup){
		if(payload==1){
	    		this.lights.stdin.write("1\n");
			console.log("lights on");
		}else if(payload==0){
	    		this.lights.stdin.write("0\n");
			console.log("lights off");
		}
	}
  },

});
