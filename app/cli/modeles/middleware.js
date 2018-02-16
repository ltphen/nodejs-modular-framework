var {{MiddlewareName}} = function (parent) {
	this.parent = parent;
	this.module = require('./../main/main');
	
}

/**
* @params params Type description
*/

{{MiddlewareName}}.prototype.method = function (params) {

	return function(req, res, next){

		// your code here

	}

	
}

module.exports = {{MiddlewareName}};
