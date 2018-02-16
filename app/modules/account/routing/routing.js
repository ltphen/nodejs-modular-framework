var Routing = function () {
	this.app = 	require('express').Router()
	this.module = require('./../main/main');
	this.boostrap();
}


/**
* this part is for the application routes 
* App refer to express module
* the real application component
*/
Routing.prototype.boostrap = function() {
	var self = this;
	this.app.get("/account", function(request, response){
		response.send(" call /");
	});

	return this.app;
};


Routing.prototype.express = function() {
	return this.app;
};

module.exports = Routing;