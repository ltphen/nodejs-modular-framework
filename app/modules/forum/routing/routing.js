var Routing = function () {
	this.app = 	require('express').Router();
	this.appProtected = require('express').Router();
	this.module = require('./../main/main');
	this.controller = this.module.controller.getInstanceOf("forum"); 
	this.middlewareFiles = this.module.middleware.getInstanceOf("files"); 
	this.authMiddleware = this.module.shared.middleware.getInstanceOf('auth');
	
	this.boostrap();
}


/**
* this part is for the application routes 
* App refer to express module
* the real module routing
*/
Routing.prototype.boostrap = function() {

	var self = this;
	
	var bodyParser = require('body-parser');  

	this.app.use(bodyParser.json()); 
	this.app.use(bodyParser.urlencoded({ extended: true }));

	this.appProtected.use(bodyParser.json()); 
	this.appProtected.use(bodyParser.urlencoded({ extended: true }));

	//this.appProtected.use(this.authMiddleware.authentificate());

	this.app.get("/subjects", function(request, response){
		self.controller.subjects(function(result){
			response.send(result);
		});
	});

	this.app.get("/categories", function(request, response){
		self.controller.categories(function(result){
			response.send(result);
		});
	});


	this.appProtected.post("/addCategorie", this.middlewareFiles.handleFiles(), this.authMiddleware.authentificate(),  function(request, response){
		self.controller.addCategorie(request.body.nom, request.body.description, request.body.back_img, request.body.color, request.body.state, request.body.id_createur, function(result){
			response.send(result);
		});
	});

	this.appProtected.post("/addSubCategorie", this.middlewareFiles.handleFiles(), this.authMiddleware.authentificate(), function(request, response){
		self.controller.addSubCategorie(request.body.nom, request.body.description, request.body.back_img, request.body.color, request.body.state, request.body.id_createur, request.body.id_categorie,  function(result){
			response.send(result);
		});
	});

	this.app.get("/categorieSubCategories/:id_categorie",  function(request, response){
		self.controller.categorieSubCategories(request.params.id_categorie, function(result){
			response.send(result);
		});
	});

	this.appProtected.post("/addForum", this.middlewareFiles.handleFiles(), this.authMiddleware.authentificate(), function(request, response){
		self.controller.addForum(request.body.nom, request.body.description, request.body.back_img, request.body.color, request.body.state, request.body.id_createur, request.body.id_sous_categorie,  function(result){
			response.send(result);
		});
	});

	this.app.get("/SubCategorieForums/:id_sous_categorie", function(request, response){
		self.controller.SubCategorieForums(request.params.id_sous_categorie, function(result){
			response.send(result);
		});
	});

	this.app.get("/forumSubjects/:id_forum", function(request, response){
		self.controller.forumSubjects(request.params.id_forum, function(result){
			response.send(result);
		});
	});

	this.appProtected.post("/addSubject", this.middlewareFiles.handleFiles(), this.authMiddleware.authentificate(), function(request, response){
		self.controller.addSubject(request.body.nom, request.body.description, request.body.back_img, request.body.id_createur, request.body.id_forum, request.body.type,  function(result){
			response.send(result);
		});
	});

	this.appProtected.post("/signalSubject", this.authMiddleware.authentificate(), function(request, response){
		self.controller.signalSubject(request.body.id_subject,  function(result){
			response.send(result);
		});
	});

	this.appProtected.post("/resolveSubject", this.authMiddleware.authentificate(), function(request, response){
		self.controller.resolveSubject(request.body.id_subject,  function(result){
			response.send(result);
		});
	});

	this.appProtected.post("/addComment", this.middlewareFiles.handleFiles(), this.authMiddleware.authentificate(), function(request, response){
		self.controller.addComment(request.body.message, request.body.image, request.body.id_createur, request.body.id_sujet,  function(result){
			response.send(result);
		});
	});

	this.appProtected.get("/subjectComments/:id_subject", function(request, response){
		self.controller.subjectComments(request.params.id_subject,  function(result){
			response.send(result);
		});
	});

	this.appProtected.post("/rateComment", this.authMiddleware.authentificate(), function(request, response){
		self.controller.rateComment(request.body.id_comment, request.body.id_user,  function(result){
			response.send(result);
		});
	});

	this.appProtected.post("/unrateComment", this.authMiddleware.authentificate(), function(request, response){
		self.controller.unrateComment(request.body.id_comment, request.body.id_user,  function(result){
			response.send(result);
		});
	});

	this.appProtected.post("/deleteRateComment", this.authMiddleware.authentificate(), function(request, response){
		self.controller.deleteRateComment(request.body.id_comment, request.body.id_user,  function(result){
			response.send(result);
		});
	});

	this.appProtected.post("/delateUnrateComment", this.authMiddleware.authentificate(), function(request, response){
		self.controller.delateUnrateComment(request.body.id_comment, request.body.id_user,  function(result){
			response.send(result);
		});
	});

	this.appProtected.post("/solverComment", this.authMiddleware.authentificate(), function(request, response){
		self.controller.solverComment(request.body.id_comment,  function(result){
			response.send(result);
		});
	});

	this.appProtected.post("/signalComment", function(request, response){
		self.controller.signalComment(request.body.id_comment,  function(result){
			response.send(result);
		});
	});

	this.appProtected.post("/commentResponses", this.authMiddleware.authentificate(), function(request, response){
		self.controller.commentResponses(request.body.id_comment,  function(result){
			response.send(result);
		});
	});

	this.appProtected.post("/addCommentResponse", this.authMiddleware.authentificate(), this.middlewareFiles.handleFiles(), function(request, response){
		self.controller.addCommentResponse(request.body.message, request.body.image, request.body.id_createur, request.body.id_comment,  function(result){
			response.send(result);
		});
	});

	this.app.get("/haveRate/:id_user/:id_comment", this.middlewareFiles.handleFiles(), function(request, response){
		self.controller.haveRate(request.params.id_user, request.params.id_comment,  function(result){
			response.send(result);
		});
	});

    this.app.get("/forums", function(request, response){
		self.controller.forums(function(result){
			response.send(result);
		});
	});
    
    this.app.get("/subCategories", function(request, response){
		self.controller.subCategories(function(result){
			response.send(result);
		});
	});
    
    this.app.get("/subCategories/:id_subCategorie", function(request, response){
		self.controller.singleSubCategorie(request.params.id_subCategorie, function(result){
			response.send(result);
		});
	});
    
    this.app.get("/categories/:id_categorie", function(request, response){
		self.controller.singleCategorie(request.params.id_categorie, function(result){
			response.send(result);
		});
	});
    
    this.app.get("/forum/:id_forum", function(request, response){
		self.controller.singleForum(request.params.id_forum, function(result){
			response.send(result);
		});
	});
    
    this.app.get("/subject/:id_subject", function(request, response){
		self.controller.singleSubject(request.params.id_subject, function(result){
			response.send(result);
		});
	});
    
    this.app.get("/comment/:id_comment", function(request, response){
		self.controller.singleComment(request.params.id_comment, function(result){
			response.send(result);
		});
	});


	this.app.use(this.appProtected);

	
	return this.app;
};


Routing.prototype.express = function() {

	return this.app;

};

module.exports = Routing;