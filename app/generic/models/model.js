class Model {
    constructor(module) {
        this.database = require("./../../main/database/database");
        this.helper = require("./../../others/helpers/string");
        this.modulesFolder = "./../../modules/";
        this.currentModule =  module == null ? "core" : module ;

    }

    /**
    * @params modelName String the name of the model (example : ModelFoo=> foo)
    */
    getInstanceOf(modelName) {
        const classModel = require(`${this.modulesFolder+this.currentModule}/models/model${this.helper.capitalize(modelName)}`);
        return new classModel(this);
    }
}

export default Model;