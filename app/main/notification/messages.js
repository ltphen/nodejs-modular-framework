import messages from "./../../../config/messages";

class Messages {
    constructor() {
        this.messages = messages;
        this.lang = "fr";
    }

    /**
    * @params key String the key we have to get the value
    * @return any 
    */

    setLang(val) {
        this.lang = val
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

    retrieve(key) {
        key = `${this.lang}.${key}`;
            return this.getMultiple(key);
        
    }

    /**
    * @params key String the key we have to get the value
    * @return any 
    */

    getSingle(key) {
        for(item in this.messages){
            const current = this.messages[item];
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
        
        if(this.messages.hasOwnProperty(key)) {
            return this.messages[key];
        }
        return null;
    }

    /**
    * @params key String the key we have to get the value
    * @return any 
    */

    getMultiple(content) {
        const parts = content.split(".");
        let objectValue = this.messages[parts[0]];
        for (let i = 1; i < parts.length; i++) {
            objectValue = objectValue[parts[i]];
        };
        return objectValue ? objectValue : this.messages[this.lang]["unknown_error"];
    }
}

export default new Messages();