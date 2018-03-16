var controllerAccount = function (parent) {
	this.parent = parent;
	this.module = require('./../main/main');
	this.model = this.module.model.getInstanceOf('account');
	this.config = this.module.config;
	this.SHA256 = require("crypto-js/sha256");
	this.Mailer = require('./../../../others/helpers/mailer');
	this.mailSubject = 'Hello ✔';

}

/**
* @params id_user Number the user id
* @params fn Function
*/

controllerAccount.prototype.profile = function(id_user, fn) {

	var self = this;
	this.model.profile(id_user).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});
	
};

/**
* @params id_user Number the user id
* @params fn Function
*/

controllerAccount.prototype.search = function(nameOrPseudo, fn) {

	var self = this;
	this.model.search(nameOrPseudo).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});
	
};
/**
* @params emailOrPseudo String the email ou the user pseudo
* @params password String the user password
* @params fn Function
*/

controllerAccount.prototype.signIn = function(emailOrPseudo, password, fn) {

	var self = this;
	password = this.SHA256(password).toString();
	this.model.signIn(emailOrPseudo, password).then(function(data){
		if (data != null && data != undefined && data[0] != undefined) {
			var token = self.authenficate(data),
				data = data;
			data[0].token = token;
		}
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});
};

/**
* @params name String the user name
* @params mail String the user mail
* @params sex String the user sex
* @params pseudo String the user pseudo
* @params profession String the user profession
* @params image String the user profile image
* @params password String the user password
* @params fn Function
*/

controllerAccount.prototype.signUp = function(name, mail, sex, pseudo, profession, image, password, fn) {
	var self = this;
	password = this.SHA256(password).toString();
	var token = this.SHA256(pseudo).toString(); 
	

	this.model.signUp(name, mail, sex, pseudo, profession, image, password, token).then(function(data){
		self.Mailer.sendFromModele(mail, this.mailSubject, 'verifyAccount', {name : name, date : 'Maintenant', token : token}, './app/others/mailModels/');
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});	
};

/**
* @params name String the user name
* @params mail String the user mail
* @params sex String the user sex
* @params pseudo String the user pseudo
* @params profession String the user profession
* @params image String the user profile image
* @params password String the user password
* @params id_user Number  user id
* @params fn Function
*/

controllerAccount.prototype.updateProfile = function(name, mail, sex, pseudo, profession, image, password, id_user, fn) {

	var self = this;
	this.model.updateProfile(name, mail, sex, pseudo, profession, image, password, id_user).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});
};

/**
* @params id_user Number  user id
* @params bio String the user bio
* @params speciality String the user speciality
* @params fn Function
*/

controllerAccount.prototype.upgradeToPathmaster = function(id_user, bio, speciality, fn) {

	var self = this;
	this.model.upgradeToPathmaster(id_user, bio, speciality).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});
};

/**
* @params data Object the data to add for encryption
*/
controllerAccount.prototype.verifyAccount = function(token, fn) {
	var self = this;
	this.model.verifyAccount(token).then(function(data){
		self.parent.addStatus(data, fn);
	}).catch(function(error){
		console.log(error);
		self.parent.badStatus(fn);
	});
};


/**
* @params data Object the data to add for encryption
*/
controllerAccount.prototype.authenficate = function(data) {
	var jwt = require("jsonwebtoken");

	return jwt.sign({
		data : data,
	}, this.config.get("jwt.secret")
	, { expiresIn: this.config.get("jwt.expiredTime") });
};

module.exports =  controllerAccount;