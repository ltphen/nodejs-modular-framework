class Modules {
    constructor() {
        this.Controller = require("./../controllers/controller");
        this.Model = require("./../models/model");
        this.modulesFolder = "./../../modules/";
        this.Middleware = require("./../middlewares/middleware");
        this.config = require('./../../main/config/config');

    }

    /**
    * @params ModuleName String the name of the module (example : modules/account=> account)
    * @return factory of the module elements
    */
    getModule(moduleName) {
        try{
            return {
                controller : new this.Controller(moduleName),
                middleware : new this.Middleware(moduleName),
                model : new this.Model(moduleName),
                config : this.config,
                shared : require(`${this.modulesFolder}shared/main/main`)
            };
        } catch (e){
            // should log something here
            console.log(` Have failed ${e}`);
        }
    }

    /**
    * @params ModuleName String the name of the module (example : modules/account=> account)
    * @return  of the module
    */
    getRoutes(moduleName) {
        const Route = require(`${this.modulesFolder+moduleName}/routing/routing`);
        return new Route().express();
    }

    /**
    * @params ModuleName String the name of the module (example : modules/account=> account)
    * @return  of the module
    */
    getShared() {
        //console.log(this.modulesFolder+"shared/main/main")
        return require(`${this.modulesFolder}shared/main/main`);
    }
}

export default new Modules();