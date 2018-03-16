var modelForum = function (parent) {
	this.parent = parent;
	this.module = require('./../main/main');
	this.warnState = 1;
	this.unresolvedState = 2;
	this.resolvedState = 3;
}

/**
* @return Array forum subjects
*/

modelForum.prototype.subjects = function() {

	return this.parent.database.knex('sujet').orderBy("id", "desc");
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.categories = function() {

	return this.parent.database.knex('categorie').orderBy("id", "desc");
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.subCategories = function() {

	return this.parent.database.knex('sous_categories').orderBy("id", "desc");
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.forums = function() {

	return this.parent.database.knex('forum').orderBy("id", "desc");
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.addCategorie = function(nom, description, back_img, color, state, id_createur) {

	return this.parent.database.knex('categorie').insert({ nom : nom, description : description, back_img : back_img, color : color, etat : state, id_createur : id_createur, date_creation : new Date() });
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.addSubCategorie = function(nom, description, back_img, color, state, id_createur, id_categorie) {

	return this.parent.database.knex('sous_categories').insert({ nom : nom, description : description, back_img : back_img, color : color, etat : state, id_createur : id_createur, date_creation : new Date(), id_categorie : id_categorie });
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.categorieSubCategories = function(id_categorie) {

	return this.parent.database.knex.select('*').from('sous_categories').where({id_categorie : id_categorie});
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.singleSubCategorie = function(id_sous_categorie) {

	return this.parent.database.knex.select('*').from('sous_categories').where({id : id_sous_categorie});
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.singleCategorie = function(id_categorie) {

	return this.parent.database.knex.select('*').from('categories').where({id : id_categorie});
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.singleSubject = function(id_subject) {

	return this.parent.database.knex.select('*').from('sujet').where({id : id_subject});
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.singleForum = function(id_forum) {

	return this.parent.database.knex.select('*').from('forum').where({id : id_forum});
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.singleComment = function(id_comment) {

	return this.parent.database.knex.select('*').from('commentaire').where({id : id_comment});
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.addForum = function(nom, description, back_img, color, state, id_createur, id_sous_categorie) {

	return this.parent.database.knex('forum').insert({ nom : nom, description : description, back_img : back_img, color : color, etat : state, id_createur : id_createur, date_creation : new Date(), id_sous_categorie : id_sous_categorie });
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.SubCategorieForums = function(id_sous_categorie) {

	return this.parent.database.knex.select('*').from('forum').where({ id_sous_categorie : id_sous_categorie });
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.forumSubjects = function(id_forum) {

	return this.parent.database.knex.select('*').from('sujet').where({ id_forum : id_forum });
	
};


/**
* @return Array forum subjects
*/

modelForum.prototype.addSubject = function(nom, description, back_img, id_createur, id_forum, type) {

	return this.parent.database.knex('sujet').insert({ nom : nom, description : description, back_img : back_img, etat : this.unresolvedState, id_createur : id_createur, date_creation : new Date(), id_forum : id_forum, type : type });
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.signalSubject = function(id_subject) {

	return this.parent.database.knex('sujet').update({ etat : this.warnState }).where({ id : id_subject });
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.resolveSubject = function(id_subject) {

	return this.parent.database.knex('sujet').update({ etat : this.resolvedState }).where({ id : id_subject });
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.addComment = function(message, image, id_createur, id_sujet) {

	return this.parent.database.knex('commentaire').insert({ message : message, image : image, etat : this.unresolvedState, id_createur : id_createur, date_creation : new Date(), id_sujet : id_sujet, rate : 0, unrate : 0 });
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.subjectComments = function(id_sujet) {

	return this.parent.database.knex('commentaire').select('*').where({id_sujet : id_sujet});
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.rateComment = function(id_user, id_comment) {

	this.addRater(id_user, id_comment);

	return this.parent.database.knex('commentaire').where({ id : id_comment }).increment("rate", 1);
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.deleteRateComment = function(id_user, id_comment) {

	this.addRater(id_user, id_comment);

	return this.parent.database.knex('commentaire').where({ id : id_comment }).decrement("rate", 1);
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.deleteUnrateComment = function(id_user, id_comment) {

	this.addRater(id_user, id_comment);

	return this.parent.database.knex('commentaire').where({ id : id_comment }).decrement("unrate", 1);
	
};
/**
* @return Array forum subjects
*/

modelForum.prototype.unrateComment = function(id_comment) {

	this.addRater(id_user, id_comment);

	return this.parent.database.knex('commentaire').where({ id : id_comment }).increment("unrate", 1);
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.solverComment = function(id_comment) {

	return this.parent.database.knex('commentaire').where({ id : id_comment }).update("etat", this.resolvedState);
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.signalComment = function(id_comment) {

	return this.parent.database.knex('commentaire').where({ id : id_comment }).update("etat", this.warnState);
	
};



/**
* @return Array forum subjects
*/

modelForum.prototype.commentResponses = function(id_comment) {

	return this.parent.database.knex('reponse').where({ id_commentaire : id_comment });
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.addCommentResponse = function(message, image, id_createur, id_comment) {

	return this.parent.database.knex('reponse').insert({ message : message, image : image, etat : this.unresolvedState, id_createur : id_createur, date_creation : new Date(), id_commentaire : id_comment});
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.haveRate = function(id_user, id_comment) {

	return this.parent.database.knex('user_comment_rate').where({ id_user : id_user, id_comment : id_comment});
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.addRater = function(id_user, id_comment) {

	return this.parent.database.knex('user_comment_rate').insert({ id_user : id_user, id_comment : id_comment});
	
};

/**
* @return Array forum subjects
*/

modelForum.prototype.deleteRater = function(id_user, id_comment) {

	return this.parent.database.knex('user_comment_rate').where({ id_user : id_user, id_comment : id_comment}).del();
	
};

modelForum.prototype.oderedSubjects = function() {
	return this.parent.database.knex('sujet');
};

module.exports =  modelForum;
