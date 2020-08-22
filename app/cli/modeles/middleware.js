class MiddlewareName {
    constructor(parent) {
        this.parent = parent;
        this.module = require('./../main/main');
        
    }

    /**
    * @params params Type description
    */

    method(params) {
        return (req, res, next) => {

            // your code here

        };
    }
}

export default MiddlewareName;
