class controllerShared {
    constructor(parent) {
        this.parent = parent;
        this.module = require('./../main/main');
        this.config = require("./../../../main/config/config")
        this.jwt = require("jsonwebtoken");
        /**
        * @property roles
        * @description give the routes where users can't go to if he have a specific role
        */
        this.roles = {
            0 : ["/users/administrator"],
            1 : ["/users/*"],
            2 : ["/categories/*", "/users/*"]
        }
    }

    /**
    * @params params Type description
    */

    matchRoleForUrl(role, url) {
        let i = 0;
        let end = false;
        if(!this.roles[role])
            return true;
        console.log(this.roles[role])
        while (i<this.roles[role].length && !end) {
            let element = this.roles[role][i];
            if(element.includes("*")) {
                element = `/${this.config.get("api.version")}${element.replace("/*", "")}`
                end = url.indexOf(element) === 0
            
            }
            else {

                element = `/${this.config.get("api.version")}${element}`
                end = element === url
            }

            i++;

        }

        return end;
    }

    /**
    * @params params Type description
    */

    getToken({headers}) {
        
        if (headers['x-auth-token']) {
            return headers['x-auth-token'];
        }
        return null;
        
    }

    /**
    * @params params Type description
    */

    decryptToken(req) {
        const token = this.getToken(req);
        
        if (token != null) {
            try {
                return self.jwt.verify(token, self.config.get("jwt.secret"));
                
            } catch(error) {
                return null
            }
        }
        return null;
        
    }

    // specifie the real image folder

    getFolder({originalUrl}) {
        if(originalUrl.includes("administrator")) {
            return 'administrators'
        }

        if(originalUrl.includes("change-profile")) {
            return 'users'
        }

        if(originalUrl.includes("home_slide")) {
            return 'home_slides'
        }

        if(originalUrl.includes("provider")) {
            return 'providers'
        }

        if(originalUrl.includes("categorie")) {
            return 'categories'
        }

        if(originalUrl.includes("product")) {
            return 'products'
        }

        return ""
        
    }
}

export default controllerShared;