var middlewareAuth = function (parent) {
	this.parent = parent;
	this.module = require('./../main/main');
	this.jwt = require("jsonwebtoken");
	this.controller = this.module.controller.getInstanceOf('shared');
	this.config = this.module.config;

}

/**
* @params params Type description
*/

middlewareAuth.prototype.authentificate = function () {
	var self = this;
	return function(req, res, next){ 
		var token = self.controller.getToken(req);
		if (token != null) {
			try {
			    var decoded = self.jwt.verify(token, self.config.get("jwt.secret"));
			    console.log(decoded);
			    next();
			} catch(error) {
			    console.log(error);
			    res.status(401).send('User Not Authenticated');
			}
		}else{
			res.status(403).send('User must be authentificated to access the ressource');
		}

	}

	// var jwt = require('express-jwt');
	// return jwt({ secret: this.config.get("jwt.secret")});
	
}



module.exports = middlewareAuth;
