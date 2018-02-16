/**
*
* Generator 
* the class for generating modules 
*
* @author ltphen
*
**/
var ModuleGenerator = function(){
	this.fs = require("fs");
	this.readline = require('readline');
	this.modulesPath = "./../../modules/";

	this.request = this.readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});
}

/**
* generate the files and folders after reading the modeles
*/

ModuleGenerator.prototype.generate = function() {

	var self = this;
	this.read(function(readResult){
		try{
			self.fs.mkdir(self.modulesPath+readResult.answer, function(error, content){
				if (error){
			    	throw error;  
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
			    	throw error; 
			    	return; 	
			    } 
			});

			self.fs.writeFile(routefile, readResult.routeResult, (error) => {
				if (error){
			    	throw error;  
			    	return; 	
			    } 
			});

				console.log('\nThe module has been created successfully!\n');

			self.request.close();
		}
		catch(e){
			console.log("[ ERROR ! ] It seems like this module already exist");
		}
	});


};

/**
* @params fn Function the callback function
* read a modele then personalize it
*/

ModuleGenerator.prototype.read = function(fn) {
	var self = this;
	self.request.question('Give the module name ? ', function (answer) {

		var filePath = "./../modeles/module.js";
		var routePath = "./../modeles/routes.js";

		self.fs.readFile(filePath, function (error, content) {
		    if (error){
		    	throw error; 
		    	return; 	
		    } 

		    result = content.toString().replace(/{{ModuleName}}/gi, answer);
		    		
			self.fs.readFile(routePath, function (error, routeResult) {
			    if (error){
			    	throw error;  
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
	this.fs.readdir(this.modulesPath+answer+"/"+folder, function(error, content){
		if (erro) {}
	})
	this.fs.mkdir(this.modulesPath+answer+"/"+folder, function(error, content){
		if (error){
			 if (error.code === 'EEXIST') {
		      console.error('myfile already exists');
		      console.error('myfile already exists');
		      console.error('myfile already exists');
		      console.error('myfile already exists');
		      console.error('myfile already exists');
		      console.error('myfile already exists');
		      return;
		    }
	    	throw error; 
	    	return; 	
	    } 
    });

};

module.exports = new ModuleGenerator();