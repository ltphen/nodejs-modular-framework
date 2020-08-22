class Routing {
    constructor() {
        this.app = 	require('express').Router()
        this.module = require('./../main/main');
        this.boostrap();
    }

    /**
    * this part is for the application routes 
    * App refer to express module
    * the real module routing
    */
    boostrap() {

        const self = this;

        this.app.get("/", (request, response) => {

            // code here

        });

        return this.app;
    }

    express() {

        return this.app;

    }
}

export default Routing;