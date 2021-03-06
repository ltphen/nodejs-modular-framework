import config from "./../../../config/config.js";

class Config {
    constructor() {
        this.config = config;
    }

    /**
    * @params key String the key we have to get the value
    * @return any 
    */

    get(key) {
        if (key.includes('.')) {
            return this.getMultiple(key);
        }else{
            return this.getSingle(key);
        }
    }

    /**
    * @params key String the key we have to get the value
    * @return any 
    */

    getSingle(key) {
        for(item in this.config){
            const current = this.config[item];
            if (typeof(current) == "object") {
                if (item == key) {
                    return current;
                }else if (current.hasOwnProperty(key)) {
                    return current[key];
                }
            }else{
                return (current == key) ? current : null;
            }
        }
        return null;
    }

    /**
    * @params key String the key we have to get the value
    * @return any 
    */

    getDirect(key) {
        
        if(this.config.hasOwnProperty(key)) {
            return this.config[key];
        }
        return null;
    }

    /**
    * @params key String the key we have to get the value
    * @return any 
    */

    getMultiple(content) {
        const parts = content.split(".");
        let objectValue = this.config[parts[0]];
        for (let i = 1; i < parts.length; i++) {
            objectValue = objectValue[parts[i]];
        };
        return objectValue;
    }
}

export default new Config();