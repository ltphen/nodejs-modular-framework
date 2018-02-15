var Model = function() {
	this.database = require("./../database/database");
	this.helper = require("./../others/helpers/string");
}

/**
* @params modelName String the name of the model (example : ModelFoo=> foo)
*/
Model.prototype.getModel = function(modelName) {
	return require("./model"+this.helper.capitalize(modelName));
};


module.exports = new Model();