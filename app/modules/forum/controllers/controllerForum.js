var controllerForum = function (parent) {
	this.parent = parent;
	this.module = require('./../main/main');
	this.model = this.module.model.getInstanceOf('forum');
}

/**
* @params params Type description
*/

controllerForum.prototype.subjects = function (fn) {

	this.model.subjects().then(function(data){
		fn(data)
	}).catch(function(error){
		console.log(error);
	});
}

module.exports = controllerForum;