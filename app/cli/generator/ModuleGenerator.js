/**
*
* Generator 
* the class for generating modules 
*
* @author ltphen
*
**/
class ModuleGenerator {
    constructor() {
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

    generate() {

        const self = this;
        this.read(readResult => {
            try{
                self.fs.mkdir(self.modulesPath+readResult.answer, (error, content) => {
                    if (error){
                        console.log(error);  
                        return; 	
                    } 
                    self.create("models", readResult.answer);
                    self.create("controllers", readResult.answer);
                    self.create("middlewares", readResult.answer);
                    self.create("routing", readResult.answer);
                    self.create("main", readResult.answer);

                    const filename = `${self.modulesPath+readResult.answer}/main/main.js`;
                    const routefile = `${self.modulesPath+readResult.answer}/routing/routing.js`;
                    
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
            }
            catch(e){
                console.log("[ ERROR ! ] It seems like this module already exist");
            }
        });


    }

    /**
    * @params fn Function the callback function
    * read a modele then personalize it
    */

    read(fn) {
        const self = this;
        self.request.question('Give the module name ? ', answer => {

            const filePath = "./../modeles/module.js";
            const routePath = "./../modeles/routes.js";

            self.fs.readFile(filePath, (error, content) => {
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
                        result,
                        answer,
                        routeResult
                    }]);			
                });
            });

        });
    }

    create(folder, answer) {

        this.fs.mkdir(`${this.modulesPath+answer}/${folder}`, (error, content) => {
            if (error){
                console.log(error); 
                return; 	
            } 
        });

    }
}

export default new ModuleGenerator();