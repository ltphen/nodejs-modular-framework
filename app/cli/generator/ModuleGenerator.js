var ModuleGenerator = function(){
	this.fs = require("fs");
	this.readline = require('readline');
	this.modulesPath = "./../../modules/";

	this.request = this.readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});
}

ModuleGenerator.prototype.generate = function() {

	var self = this;
	this.read(function(readResult){
		self.fs.mkdir(self.modulesPath+readResult.answer, function(error, content){
			if (error){
		    	console.log(error); 
		    	return; 	
		    } 
	    });
		self.create("models", readResult.answer);
		self.create("controllers", readResult.answer);
		self.create("middlewares", readResult.answer);
		self.create("routing", readResult.answer);
		self.create("main", readResult.answer);

		var filename = self.modulesPath+readResult.answer+"/main/main.js";
		var routefile = self.modulesPath+readResult.answer+"/routing/routing.js";
		
		self.fs.writeFile(filename, readResult.result, (error) => {
			if (error){
		    	console.log(error); 
		    	return; 	
		    } 
		});

		self.fs.writeFile(routefile, readResult.routeResult, (error) => {
			if (error){
		    	console.log(error); 
		    	return; 	
		    } 
		});

			console.log('\nThe module has been created successfully!\n');

		self.request.close();
	});


};

ModuleGenerator.prototype.read = function(fn) {
	var self = this;
	self.request.question('Give the module name ? ', function (answer) {

		var filePath = "./../modeles/module.js";
		var routePath = "./../modeles/routes.js";

		self.fs.readFile(filePath, function (error, content) {
		    if (error){
		    	console.log(error); 
		    	return; 	
		    } 

		    result = content.toString().replace(/{{ModuleName}}/gi, answer);
		    		
			self.fs.readFile(routePath, function (error, routeResult) {
			    if (error){
			    	console.log(error); 
			    	return; 	
			    } 
			    
			    fn.apply(this, [{
					result : result,
					answer : answer,
					routeResult : routeResult
				}]);			
			});
		});

	});
};

ModuleGenerator.prototype.create = function(folder, answer) {
	this.fs.mkdir(this.modulesPath+answer+"/"+folder, function(error, content){
		if (error){
	    	console.log(error); 
	    	return; 	
	    } 
    });

};

module.exports = new ModuleGenerator();