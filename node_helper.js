var NodeHelper = require("node_helper");
module.exports = NodeHelper.create({
  socketNotificationReceived: function(notification, payload) {
    this.lights;
    console.log("MMM-lights notification ="+notification.toString());
    if(notification =="LIGHTS_START"){
	console.log("MMM-lights starting");
	let DEBUG = payload["debug"];
	let blankTime = payload["blankTime"];
	this.lights = require("child_process").spawn("sudo", [
	                       "python3",
	                        __dirname + "/lights.py",

	]);
	lights.stdin.setEncoding('utf-8');
	lights.stdin.write("0\n");
    	child.stdout.on("exit", function(exitCode) {
    	  lights.stdin.write("q\n");
    	  console.log(exitCode);
    	});
    }else if(notification == "LIGHTS_SET"){
		if(payload==1){
	    		this.lights.stdin.write("1\n");
		}else if(payload==0){
	    		this.lights.stdin.write("0\n");
		}
	}
  },

});
