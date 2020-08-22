class middlewareAuth {
    constructor(parent) {
        this.parent = parent;
        this.module = require('./../main/main');
        this.jwt = require("jsonwebtoken");
        this.controller = this.module.controller.getInstanceOf('shared');
        this.config = this.module.config;
        

    }

    /**
    * @params params Type description
    */

    authentificate() {
        let self = this;

        return (req, res, next) => { 

            const token = self.controller.getToken(req);

            if (token != null) {
                try {
                    const decoded = self.jwt.verify(token, self.config.get("jwt.secret"));
                    req.decodedToken = decoded.data;
                    console.log(req.decodedToken)
            
                    next();
                } catch(error) {
                    self.controller.parent.sendMessage("session_expired", (data)=>res.status(401).send(data))
                    //res.status(401).send('User Not Authenticated');
                }
            }else{
                self.controller.parent.sendMessage("user_not_authenticated", (data)=>res.status(403).send(data))

            }

        };

        // var jwt = require('express-jwt');
        // return jwt({ secret: this.config.get("jwt.secret")});
        
    }

    isAdmin() {
        let self = this;

        return ({decodedToken, originalUrl}, res, next) => { 
            if (decodedToken && decodedToken.isAdmin) {
                if(self.controller.matchRoleForUrl(decodedToken.role, originalUrl))
                self.controller.parent.sendMessage("role_error", (data)=>res.status(403).send(data))
                // self.controller.parent.addStatus("Desole bro", res.send)
                else
                    next();
            }else{
                self.controller.parent.sendMessage("must_be_admin", (data)=>res.status(403).send(data))
            }

        };

        // var jwt = require('express-jwt');
        // return jwt({ secret: this.config.get("jwt.secret")});
        
    }
}

export default middlewareAuth;
