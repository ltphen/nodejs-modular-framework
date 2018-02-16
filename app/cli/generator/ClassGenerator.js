/**
*
* Generator 
* the class for generating class (models, comtroller, middleware)	
*
* @author ltphen
*
**/
var Generator = function () {
	this.fs = require("fs");
	this.help = require('./../../others/helpers/string');
	this.readline = require('readline');
	this.modulesPath = "./../../modules/";

	this.request = this.readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});
	
}

/**
* @params name String the type name of the class we will generate (model => model)
* generate the file after reading the modeles
*/
Generator.prototype.generate = function(name) {

	var self = this;
	this.read(name, function(readResult){
		self.request.question('Give the module name ? ', function (module) {
			 	self.fs.readdir(self.modulesPath+module, function (error, content) {
				    if (error){
				    	console.log("[ERROR ! ] Module not found ! "); 
				    	return; 	
				    } 
				    var filename = self.modulesPath+module+"/"+name+"s/"+name+"" + self.help.capitalize(readResult.answer);
					self.fs.writeFile(filename+'.js', readResult.result, (error) => {
						if (error){
					    	console.log(error); 
					    	return; 	
					    } 
						console.log('\nThe file has been created successfully!\n');
					});
		  	})	
			self.request.close();
		});
	});


};

/**
* @params name String the type name of the class we will generate (model => model)
* @params fn Function the callback function
* read a modele then personalize it
*/

Generator.prototype.read = function(name, fn) {
	var self = this;
	self.request.question('Give the '+name+' name ? ', function (answer) {

		var filePath = "./../modeles/"+name+".js";

		self.fs.readFile(filePath, function (error, content) {
		    if (error){
		    	console.log(error); 
		    	return; 	
		    } 
		    var filename = name + self.help.capitalize(answer),
		    	regexp = self.help.capitalize(name)+"Name",
		    	result = null;

		    switch(name) {
		    	case "controller" : 
		    		result = content.toString().replace(/{{ControllerName}}/gi, filename);
		    	break;
		    	case "model" : 
		    		result = content.toString().replace(/{{ModelName}}/gi, filename);
		    	break;
		    	case "middleware" : 
		    		result = content.toString().replace(/{{MiddlewareName}}/gi, filename);
		    	break;
		    }
		    fn.apply(this, [{
				result : result,
				name : name,
				answer : answer
			}]);			
		});
	});
};

module.exports = new Generator();