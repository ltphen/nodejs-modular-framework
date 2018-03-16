var middlewareCors = function (parent) {
	this.parent = parent;
	this.module = require('./../main/main');
	
}

/**
* @params params Type description
*/

middlewareCors.prototype.manuelCors = function () {

	return function(req, res, next) {
	  console.log("i'm the cors here ");
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	}
};


module.exports = middlewareCors;
