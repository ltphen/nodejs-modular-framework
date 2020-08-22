class Middleware {
    constructor(module) {
        this.model = require("./../models/model");
        this.modulesFolder = "./../../modules/";
        this.helper = require("./../../others/helpers/string");
        this.currentModule =  module == null ? "core" : module ;
    }

    /**
    * @params MiddlewareName String the name of the Middleware (example : MiddlewareFoo => foo)
    */
    getInstanceOf(MiddlewareName) {
        const classMiddleware = require(`${this.modulesFolder+this.currentModule}/middlewares/middleware${this.helper.capitalize(MiddlewareName)}`);
        return new classMiddleware(this);
    }
}

export default Middleware;