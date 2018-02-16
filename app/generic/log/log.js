var Log = function() {
	console.log("Initialized");
	this.fs = require("fs"); 
	this.config = require("./../../main/config/config");
	this.logArray = this.config.get("log.folders");
	this.logFolder = this.config.get("log.great");
}

/**
* @params logType String the name of the folder we have to write in (example : commom)
* @params data the data to write in the log
*/

Log.prototype.write = function(logType, data) {
	var self = this;
	if (this.logArray.indexOf(logType) != -1 ){
		this.fs.writeFile(self.logFolder+logType+'/log.txt', data, (error) => {
			if (error){
		    	console.log("[ERROR !] An error occur !")
		    	console.log(error); 
		    	return; 	
		    } 
		});
	}else{
		console.log("[ERROR !] The log folder must be specifie into the config file !")
	}

};

module.exports = new Log();