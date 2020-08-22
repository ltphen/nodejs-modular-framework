/**
*
* Generator 
* the class for generating class (models, comtroller, middleware)	
*
* @author ltphen
*
**/
class Generator {
    constructor() {
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
    generate(name) {

        const self = this;
        this.read(name, ({answer, result}) => {
            self.request.question('Give the module name ? ', module => {
                    self.fs.readdir(self.modulesPath+module, (error, content) => {
                        if (error){
                            console.log("[ERROR ! ] Module not found ! "); 
                            return; 	
                        } 
                        const filename = `${self.modulesPath+module}/${name}s/${name}${self.help.capitalize(answer)}`;
                        self.fs.writeFile(`${filename}.js`, result, (error) => {
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


    }

    /**
    * @params name String the type name of the class we will generate (model => model)
    * @params fn Function the callback function
    * read a modele then personalize it
    */

    read(name, fn) {
        const self = this;
        self.request.question(`Give the ${name} name ? `, answer => {

            const filePath = `./../modeles/${name}.js`;

            self.fs.readFile(filePath, function (error, content) {
                if (error){
                    console.log(error); 
                    return; 	
                }
                const filename = name + self.help.capitalize(answer);
                const regexp = `${self.help.capitalize(name)}Name`;
                let result = null;

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
                    result,
                    name,
                    answer
                }]);
            });
        });
    }
}

export default new Generator();