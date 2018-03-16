var controllerForum = function (parent) {
	this.parent = parent;
	this.module = require('./../main/main');
	this.model = this.module.model.getInstanceOf('forum');
}

/**
* @params fn Function
*/

controllerForum.prototype.subjects = function(fn) {
		var self = this;
	this.model.subjects().then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

	
};

/**
* @params fn Function
*/

controllerForum.prototype.forums = function(fn) {
	var self = this;
	this.model.forums().then(function(forums){
		self.model.subjects().then(function(subject){
			self.parent.addStatus(self.imbrique(forums, subject, 'id_forum'), fn);
		})
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

	
};

/**
* @params fn Function
*/

controllerForum.prototype.subCategories = function(fn) {
		var self = this;
	this.model.subCategories().then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

	
};

/**
* @params fn Function
*/

controllerForum.prototype.categories = function(fn) {

	var self = this;
	this.model.categories().then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};

/**
* @params nom String the categorie name
* @params back_img String the categorie background image
* @params color String the categorie color
* @params state Number the categorie state
* @params id_creator Number the categorie creator id
* @params fn Function
*/

controllerForum.prototype.addCategorie = function(nom, description, back_img, color, state, id_createur, fn) {

	var self = this;
	this.model.addCategorie(nom, description, back_img, color, state, id_createur).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};


/**
* @params nom String the sub_categorie name
* @params back_img String the sub_categorie background image
* @params color String the sub_categorie color
* @params state Number the sub_categorie state
* @params id_creator Number the sub_categorie creator id
* @params id_categorie Number the  categorie id
* @params fn Function
*/

controllerForum.prototype.addSubCategorie = function(nom, description, back_img, color, state, id_createur, id_categorie, fn) {

	var self = this;
	this.model.addSubCategorie(nom, description, back_img, color, state, id_createur, id_categorie).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};

/**
* @params id_categorie Number the  categorie id
* @params fn Function
*/

controllerForum.prototype.categorieSubCategories = function(id_categorie, fn) {

	var self = this;
	this.model.categorieSubCategories(id_categorie).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};

/**
* @params nom String the forum name
* @params back_img String the forum background image
* @params color String the forum color
* @params state Number the forum state
* @params id_creator Number the forum creator id
* @params id_sous_categorie Number the  sous_categorie id
* @params fn Function
*/

controllerForum.prototype.addForum = function(nom, description, back_img, color, state, id_createur, id_sous_categorie, fn) {

	var self = this;
	this.model.addForum(nom, description, back_img, color, state, id_createur, id_sous_categorie).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};

/**
* @params id_sous_categorie Number the  sous_categorie id
* @params fn Function
*/

controllerForum.prototype.SubCategorieForums = function(id_sous_categorie, fn) {

	var self = this;
	this.model.SubCategorieForums(id_sous_categorie).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};

/**
* @params id_forum Number the  forum id
* @params fn Function
*/

controllerForum.prototype.forumSubjects = function(id_forum, fn) {

	var self = this;
	this.model.forumSubjects(id_forum).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};

/**
* @params id_forum Number the  subject id
* @params fn Function
*/

controllerForum.prototype.singleForum = function(id_forum, fn) {

	var self = this;
	this.model.singleForum(id_forum).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};

/**
* @params id_subject Number the  subject id
* @params fn Function
*/

controllerForum.prototype.singleSubject = function(id_subject, fn) {

	var self = this;
	this.model.singleSubject(id_subject).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};

/**
* @params id_categorie Number the  subject id
* @params fn Function
*/

controllerForum.prototype.singleCategorie = function(id_categorie, fn) {

	var self = this;
	this.model.singleCategorie(id_subject).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};

/**
* @params id_comment Number the  subject id
* @params fn Function
*/

controllerForum.prototype.singleComment = function(id_comment, fn) {

	var self = this;
	this.model.singleComment(id_comment).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};

/**
* @params id_subcategorie Number the  subject id
* @params fn Function
*/

controllerForum.prototype.singleSubCategorie = function(id_subcategorie, fn) {

	var self = this;
	this.model.singleSubCategorie(id_subcategorie).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};


/**
* @params nom String the subject name
* @params description String the subject description
* @params color String the subject color
* @params state Number the subject state
* @params id_creator Number the subject creator id
* @params id_forum Number the  forum id
* @params fn Function
*/

controllerForum.prototype.addSubject = function(nom, description, back_img, id_createur, id_forum, type, fn) {

	var self = this;
	this.model.addSubject(nom, description, back_img, id_createur, id_forum, type).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};

/**
* @params id_subject Number the  subject id
* @params fn Function
*/

controllerForum.prototype.signalSubject = function(id_subject, fn) {

	var self = this;
	this.model.signalSubject(id_subject).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};

/**
* @params id_subject Number the  subject id
* @params fn Function
*/

controllerForum.prototype.resolveSubject = function(id_subject, fn) {

	var self = this;
	this.model.resolveSubject(id_subject).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};

/**
* @params message String the comment message
* @params image String the comment background image
* @params id_creator Number the comment creator id
* @params id_subject Number the subject id
* @params fn Function
*/

controllerForum.prototype.addComment = function(message, image, id_createur, id_sujet, fn) {

	var self = this;
	this.model.addComment(message, image, id_createur, id_sujet).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};

/**
* @params id_subject Number the subject id
* @params fn Function
*/

controllerForum.prototype.subjectComments = function(id_sujet, fn) {

	var self = this;
	this.model.subjectComments(id_sujet).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};

/**
* @params id_comment Number the comment id
* @params fn Function
*/
controllerForum.prototype.rateComment = function(id_comment, id_user, fn) {

	var self = this;
	this.model.rateComment(id_comment, id_user).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};

/**
* @params id_comment Number the comment id
* @params fn Function
*/
controllerForum.prototype.deleteRateComment = function(id_comment, id_user, fn) {

	var self = this;
	this.model.deleteRateComment(id_comment, id_user).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};

/**
* @params id_comment Number the comment id
* @params fn Function
*/
controllerForum.prototype.deleteUnrateComment = function(id_comment, id_user, fn) {

	var self = this;
	this.model.deleteUnrateComment(id_comment, id_user).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};

/**
* @params id_comment Number the comment id
* @params fn Function
*/

controllerForum.prototype.unrateComment = function(id_comment, id_user, fn) {

	var self = this;
	this.model.unrateComment(id_comment, id_user).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};

/**
* @params id_comment Number the comment id
* @params fn Function
*/

controllerForum.prototype.solverComment = function(id_comment, fn) {

	var self = this;
	this.model.solverComment(id_comment).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};

/**
* @params id_comment Number the comment id
* @params fn Function
*/

controllerForum.prototype.signalComment = function(id_comment, fn) {

	var self = this;
	this.model.signalComment(id_comment).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};

/**
* @params id_comment Number the comment id
* @params fn Function
*/

controllerForum.prototype.commentComment = function(id_comment, fn) {

	var self = this;
	this.model.commentComment(id_comment).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};
/**
* @params message String the comment message
* @params image String the comment background image
* @params id_createur Number the comment creator id
* @params id_comment Number the comment id
* @params fn Function
*/

controllerForum.prototype.addCommentResponse = function(message, image, id_createur, id_comment, fn) {

	var self = this;
	this.model.addCommentResponse(message, image, id_createur, id_comment).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};

/**
* @params id_comment Number the comment id
* @params fn Function
*/

controllerForum.prototype.commentResponses = function(id_comment, fn) {

	var self = this;
	this.model.commentResponses(id_comment).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};

/**
* @params id_user Number the user id
* @params id_comment Number the comment id
* @params fn Function
*/

controllerForum.prototype.haveRate = function(id_user, id_comment, fn) {

	var self = this;
	this.model.haveRate(id_user, id_comment).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});

};


/**
* @params greatData { Array } the user id
* @params subData { Array } the comment id
* @params field { String } the comment id
*/
controllerForum.prototype.imbrique = function(great, sub, field) {
	for (let i = 0; i < great.length; i++) {
		let intermadiate = [];
		for (let j = 0; j < sub.length; j++) {
			if (sub[j][field] == great[i].id) {
				intermadiate.push(sub[j]);
			}
		}
		great[i].last = (intermadiate[0] == undefined ) ? null : intermadiate[0];
	}
	return great;

	
	
};


module.exports = controllerForum;