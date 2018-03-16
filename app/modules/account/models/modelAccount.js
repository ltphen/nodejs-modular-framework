var modelAccount = function (parent) {
	this.parent = parent;
	this.module = require('./../main/main');
	this.studentRole = 1;
	this.unverified = 0;
	this.verified = 1;
	
}

/**
* @return Promise concerning the request
*/

modelAccount.prototype.profile = function(id_user) {

	return this.parent.database.knex('user').select('*').where({ id : id_user });
	
};

/**
* @return Promise concerning the request
*/

modelAccount.prototype.signIn = function(emailOrPseudo, password) {

	return this.parent.database.knex('user').select('*').where({ mail : emailOrPseudo, password : password }).orWhere({  pseudo : emailOrPseudo, password : password });
	
};

/**
* @return Promise concerning the request
*/

modelAccount.prototype.signUp = function(name, mail, sex, pseudo, profession, image, password, token) {

	return this.parent.database.knex('user').insert({ nom : name, mail : mail, sex : sex, pseudo : pseudo, profession : profession, profil_img : image, password : password, token : token, role : this.studentRole, date_inscription : new Date(), etat : this.unverified});
	
};

/**
* @return Promise concerning the request
*/

modelAccount.prototype.search = function(nameOrPseudo) {

	return this.parent.database.knex('user').where("nom" , "like", "%"+nameOrPseudo+"%").orWhere("pseudo" , "like", "%"+nameOrPseudo+"%");
	
};

/**
* @return Promise concerning the request
*/

modelAccount.prototype.verifyAccount = function(token) {

	return this.parent.database.knex('user').update({ etat : this.verified }).where({token : token});
	
};

/**
* @return Promise concerning the request
*/

modelAccount.prototype.updateProfile = function(name, mail, sex, pseudo, profession, image, password, id_user) {

	return this.parent.database.knex('user').update({ nom : name, mail : mail, sex : sex, pseudo : pseudo, profession : profession, profil_img : image, password : password}).where({id : id_user});
	
};

/**
* @return Promise concerning the request
*/

modelAccount.prototype.upgradeToPathmaster = function(id_user, bio, speciality) {

	return this.parent.database.knex('user').update({ etat : 'pathmaster'}).where({ id : id_user});
	return this.parent.database.knex('PathMaster').insert({ id_user : id_user, bio : bio, specialite : speciality});
	
};

module.exports =  modelAccount;
