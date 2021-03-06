class Log {
    constructor() {
        console.log("Initialized");
        this.fs = require("fs"); 
        this.config = require("./../../main/config/config");
        this.logArray = this.config.get("log.folders");
        this.logFolder = this.config.get("log.great");
    }

    /**
    * @params logType { String } the name of the folder we have to write in (example : commom)
    * @params data { any } the data to write in the log
    */

    write(logType, data) {
        const self = this;
        if (this.logArray.includes(logType) ){
            this.fs.writeFile(`${self.logFolder+logType}/log.txt`, data, (error) => {
                if (error){
                    console.log("[ERROR !] An error occur !")
                    console.log(error); 
                    return; 	
                } 
            });
        }else{
            console.log("[ERROR !] The log folder must be specifie into the config file !")
        }

    }
}

export default new Log();