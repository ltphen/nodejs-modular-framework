var Controller = function(module) {
	this.model = require("./../models/model");
	this.modulesFolder = "./../../modules/";
	this.helper = require("./../../others/helpers/string");
	this.currentModule =  module == null ? "core" : module ;
	this.success = "success";
	this.error = "error";
}

/**
* @params controllerName String the name of the controller (example : ControllerFoo => foo)
*/
Controller.prototype.getInstanceOf = function(controllerName) {
	var classController = require(this.modulesFolder+this.currentModule+"/controllers/controller"+this.helper.capitalize(controllerName));
	return new classController(this);
};

/**
* @role get the views file to link model to views in non-API model
*/
Controller.prototype.getViewsFile = function() {
	
};

/**
* @params method Function The function to execute before promise
* @params fn Funtion The function to excetute after promise
* @params attributes Array eventually the attributes of the databse request
*/
Controller.prototype.addStatus = function(result, fn) {
		if (result != null && result.length != 0) {
			var result = new Object({
				status : this.success,
				data : result
			});
			fn(result);
		}else{
			result = new Object({
				status : this.error
			});
			fn(result);
		}
};

/**
* @params fn Funtion The function to excetute after promise
*/
Controller.prototype.badStatus = function(fn) {
	result = new Object({
		status : this.error
	});
	fn(result);
};

/**
* @params fn Funtion The function to excetute after promise
*/
Controller.prototype.goodStatus = function(result, fn) {
	var result = new Object({
		status : this.success,
		data : result
	});
	fn(result);
};
module.exports = Controller;