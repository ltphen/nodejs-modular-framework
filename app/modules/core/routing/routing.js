var Routing = function () {
	this.app = 	require('express')()
	this.modules = require('./../generic/modules/modules'),
	this.config = require('./../main/config/config');
}


/**
* this part is for the application routes 
* App refer to express module
* the real application component
*/
Routing.prototype.boostrap = function() {

	var that = this;

	this.app.set('port', (this.config.get("env.PORT") || 5000));

	// this.app.use(this.middleware.accessToken());

	// this.app.get('/notes', function(request, response) {
	// 	that.controller.getController('notes').all(function (result) {
	// 		response.send(result);
	// 	});
	// });

	// this.app.get('/notes/:id', function(request, response) {
	//  	that.controller.getController('notes').one(request.params.id, function (result) {
	// 		response.send(result);
	// 	})
	// });

	this.app.listen(this.app.get('port'), function() {
	  console.log('Node app is running on port', that.app.get('port'));
	});
};


Routing.prototype.express = function() {
	return this.app;
};

module.exports = new Routing();