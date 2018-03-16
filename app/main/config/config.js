var config = require("./../../../config/config.js");

var Config = function(){
	this.config = config;
}

/**
* @params key String the key we have to get the value
* @return any 
*/

Config.prototype.get = function(key) {
	if (key.indexOf('.') != -1) {
		return this.getMultiple(key);
	}else{
		return this.getSingle(key);
	}
};

/**
* @params key String the key we have to get the value
* @return any 
*/

Config.prototype.getSingle = function(key) {
	for(item in this.config){
		var current = this.config[item]
		if (typeof(current) == "object") {
			if (item == key) {
				return current;
			}else if (current.hasOwnProperty(key)) {
				return current[key];
			}
		}else{
			return (current == key) ? current : null;
		}
	}
	return null;
};


/**
* @params key String the key we have to get the value
* @return any 
*/

Config.prototype.getDirect = function(key) {
	
	if(this.config.hasOwnProperty(key)) {
		return this.config[key];
	}
	return null;
};

/**
* @params key String the key we have to get the value
* @return any 
*/

Config.prototype.getMultiple = function(content) {
	var parts = content.split(".");
	var objectValue = this.config[parts[0]];
	for (var i = 1; i < parts.length; i++) {
		objectValue = objectValue[parts[i]];
	};
	return objectValue;
};

module.exports = new Config();