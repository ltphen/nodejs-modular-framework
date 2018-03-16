var controllerShared = function (parent) {
	this.parent = parent;
	this.module = require('./../main/main');
}

/**
* @params params Type description
*/

controllerShared.prototype.getToken = function (req) {

	if (req.headers['x-auth-token']) {
	      return req.headers['x-auth-token'];
	}
	return null;
	
}

module.exports =  controllerShared;