var Middleware = function(){
	this.controller = require("./../controllers/controller");
}

Middleware.prototype.accessToken = function() {
	var that = this;
	return function(req, res, next){
		that.controller.getController("accessApi").one(req.query.access_token, function (result) {
			if (req.query.access_token != null ) {
				next();
			}else{
				res.status(401).send("Error : 401 Unauthorised");
			}
		})
	}
};

module.exports = new Middleware();