var Routing = function () {
	this.app = 	require('express').Router()
	this.module = require('./../main/main');
	this.boostrap();
}


/**
* this part is for the application routes 
* App refer to express module
* the real module routing
*/
Routing.prototype.boostrap = function() {

	var self = this;

	this.app.get("/", function(request, response){

		// code here

	});

	return this.app;
};


Routing.prototype.express = function() {

	return this.app;

};

module.exports = Routing;