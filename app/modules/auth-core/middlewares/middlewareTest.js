var middlewareTest = function (parent) {
	this.parent = parent;
}

/**
* @params params Type description
*/

middlewareTest.prototype.method = function (params) {

	return function(req, res, next){

		// your code here

	}

	
}

module.exports = middlewareTest;
