var Routing = function () {
	this.app = 	require('express').Router()
	this.module = require('./../main/main');
	this.controller = this.module.controller.getInstanceOf("account"); 
	this.boostrap();
}


/**
* this part is for the application routes 
* App refer to express module
* the real module routing
*/
Routing.prototype.boostrap = function() {

	var self = this;

	var self = this;
	
	var bodyParser = require('body-parser');  

	this.app.use(bodyParser.json()); 
	this.app.use(bodyParser.urlencoded({ extended: true }));

	this.app.get("/profile/:id_user", function(request, response){
		self.controller.profile(request.params.id_user, function(result){
			response.send(result);
		});
	});

	this.app.post("/signIn", function(request, response){
		self.controller.signIn(request.body.emailOrPseudo, request.body.password, function(result){
			response.send(result);
		});
	});

	this.app.post("/signUp", function(request, response){
		self.controller.signUp( request.body.name, request.body.mail, request.body.sex, request.body.pseudo, request.body.profession, request.body.image, request.body.password, function(result){
			response.send(result);
		});
	});

	this.app.post("/updateProfile", function(request, response){
		self.controller.updateProfile(request.body.name, request.body.mail, request.body.sex, request.body.pseudo, request.body.profession, request.body.image, request.body.password, request.body.id_user, function(result){
			response.send(result);
		});
	});

	this.app.get("/search/:nameOrPseudo", function(request, response){
		self.controller.search(request.params.nameOrPseudo, function(result){
			response.send(result);
		});
	});

	this.app.get("/verifyAccount/:token", function(request, response){
		self.controller.verifyAccount(request.params.token, function(result){
			response.send(result);
		});
	});

	// not avaliable outside (still thinking)

	this.app.post("/upgradeToPathmaster", function(request, response){
		self.controller.upgradeToPathmaster(request.params.id_user, function(result){
			response.send(result);
		});
	});

	return this.app;
};


Routing.prototype.express = function() {

	return this.app;

};

module.exports = Routing;