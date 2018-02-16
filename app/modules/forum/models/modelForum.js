var modelForum = function (parent) {
	this.parent = parent;
	this.module = require('./../main/main');
	
}

/**
* @params params Type description
*/

modelForum.prototype.subjects = function() {

	return this.parent.database.knex.select('*').from('SujetForum');
	
};

module.exports =  modelForum;
