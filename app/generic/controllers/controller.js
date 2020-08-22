class Controller {
    constructor(module) {
        this.model = require("./../models/model");
        this.modulesFolder = "./../../modules/";
        this.helper = require("./../../others/helpers/string");
        this.currentModule =  module == null ? "core" : module;
        this.messages = require('./../../main/notification/messages');
        this.success = "success";
        this.error = "error";
    }

    /**
    * @params controllerName { String } the name of the controller (example : ControllerFoo => foo)
    */
    getInstanceOf(controllerName) {
        const classController = require(`${this.modulesFolder+this.currentModule}/controllers/controller${this.helper.capitalize(controllerName)}`);
        return new classController(this);
    }

    /**
    * @role get the views file to link model to views in non-API model
    */
    getViewsFile() {
        
    }

    /**
    * @params method { Function } The function to execute before promise
    * @params fn { Function } The function to excetute after promise
    * @params attributes { Array } eventually the attributes of the databse request
    */
    addStatus(result, fn) {
            if (result != null && result.length != 0) {
                var result = new Object({
                    status : this.success,
                    data : result
                });
                fn(result);
            }else{
                result = new Object({
                    status : this.success,
                    data : null
                });
                fn(result);
            }
    }

    /**
    * @params fn Funtion The { Function } to excetute after promise
    */
    badStatus(fn) {
        result = new Object({
            status : this.error
        });
        fn(result);
    }

    /**
    * @params fn Funtion The { Function } to excetute after promise
    */
    sendMessage(code, fn, isGoodStatut = false) {
        result = new Object({
            description : this.messages.retrieve(code),
            code,
            status : isGoodStatut ? this.success : this.error
        });
        fn(result);
    }

    /**
    * @params fn Funtion The { Function } to excetute after promise
    */
    goodStatus(result, fn) {
        var result = new Object({
            status : this.success,
            data : result
        });
        fn(result);
    }
}

export default Controller;