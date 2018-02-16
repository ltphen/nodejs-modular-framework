var Modules = function() {
	this.Controller = require("./../controllers/controller");
	this.Model = require("./../models/model");
	this.modulesFolder = "./../../modules/";
	this.Middleware = require("./../middlewares/middleware");
}

/**
* @params ModuleName String the name of the module (example : modules/account=> account)
* @return factory of the module elements
*/
Modules.prototype.getModule = function(moduleName) {
	try{
		return {
			controller : new this.Controller(moduleName),
			middleware : new this.Middleware(moduleName),
			model : new this.Model(moduleName),
		};
	} catch (e){
		// should log something here
		console.log(" Have failed "+e);
	}
};


/**
* @params ModuleName String the name of the module (example : modules/account=> account)
* @return  of the module
*/
Modules.prototype.getRoutes = function(moduleName) {
	var Route = require(this.modulesFolder+moduleName+"/routing/routing");
	return new Route().express();
};

module.exports = new Modules();