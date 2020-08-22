class middlewareCors {
    constructor(parent) {
        this.parent = parent;
        this.module = require('./../main/main');
        
    }

    /**
    * @params params Type description
    */

    manuelCors() {
        return (req, res, next) => {
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          next();
        };
    }
}

export default middlewareCors;
