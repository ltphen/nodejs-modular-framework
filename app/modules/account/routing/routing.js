import multer from 'multer';

class Routing {
    constructor() {
        this.app = 	require('express').Router()
        this.module = require('./../main/main');
        this.controller = this.module.controller.getInstanceOf("account"); 
        this.genericController = this.module.shared.controller.getInstanceOf("generic"); 
        this.authMiddleware = this.module.shared.middleware.getInstanceOf('auth');
        this.middlewareFiles = this.module.shared.middleware.getInstanceOf("files"); 
        
        this.boostrap();
    }

    /**
    * this part is for the application routes 
    * App refer to express module
    * the real module routing
    */
    boostrap() {
        
        const self = this;
        
        const bodyParser = require('body-parser');  
        
        this.app.use(bodyParser.json()); 
        this.app.use(bodyParser.urlencoded({ extended: true }));
        
        this.app.get("/adresses", this.authMiddleware.authentificate(), ({query, decodedToken}, response) => {
            self.genericController.getById({
                users_id: query.id ? query.id : decodedToken.id,
            }, "addresses_books", result => {
                response.send(result);
            });
        });
        
        
        this.app.get("/adresses/find/:id", this.authMiddleware.authentificate(), ({params}, response) => {
            self.genericController.getWhere({
                id: params.id,
                
            }, "addresses_books", result => {
                response.send(result);
            });
        });
        
        this.app.get("/orders", this.authMiddleware.authentificate(), ({query, decodedToken}, response) => {
            self.genericController.getWhere({
                customer_id: query.id ? query.id : decodedToken.id,
                
            }, "orders", result => {
                response.send(result);
            });
        });
        
        this.app.put("/edit", this.authMiddleware.authentificate(), ({decodedToken, body}, response) => {
            self.genericController.update({
                id : decodedToken.id,
                first_name: body.first_name,
                last_name: body.last_name,
                email: body.email,
                phone: body.phone,
                gender: body.gender,
                
            }, "users", result => {
                response.send(result);
            });
        });
        
        this.app.post("/login", ({body}, response) => {
            self.controller.login({
                telephone: body.telephone,
                password: body.password,
            }, "users", result => {
                response.send(result);
            });
        });
        
        this.app.post("/register", ({body}, response) => {
            self.controller.register( {
                first_name: body.first_name,
                last_name: body.last_name,
                telephone: body.telephone,
                password: body.password,
            }, "users", result => {
                response.send(result);
            });
        });
        
        // this.app.post("/updateProfile", function(request, response){
        // 	self.genericController.updateProfile(request.body.name, request.body.mail, request.body.sex, request.body.pseudo, request.body.profession, request.body.image, request.body.password, request.body.id_user, function(result){
        // 		response.send(result);
        // 	});
        // });
        
        // this.app.get("/search/:nameOrPseudo", function(request, response){
        // 	self.genericController.search(request.params.nameOrPseudo, function(result){
        // 		response.send(result);
        // 	});
        // });
        
        this.app.put("/change-password", this.authMiddleware.authentificate(), ({decodedToken, body}, response) => {
            self.controller.changePassword({
                id : decodedToken.id,
                last_password: body.last_password,
                password: body.new_password,
            }, "users", result => {
                response.send(result);
            });
        });
        
        // Administrators
        
        
        this.app.post("/administrator/add", this.authMiddleware.authentificate(), this.authMiddleware.isAdmin(), ({body}, response) => {
            
            self.controller.addAdmin(
                {
                    email: body.email,
                    first_name: body.first_name,
                    last_name: body.last_name,
                    roles_id: body.role,
                    
                }, "administrators", result => {
                    response.send(result);
                }
                );
            });
            
            
            this.app.post("/administrator/login",  ({body}, response) => {
                
                self.controller.login(
                    {
                        email: body.email,
                        password: body.password,
                        
                    }, "administrators", result => {
                        response.send(result);
                    }
                    );
                });
                
                this.app.put("/administrator/edit-infos", this.authMiddleware.authentificate(), this.authMiddleware.isAdmin(), ({decodedToken, body}, response) => {
                    self.genericController.update({
                        id : decodedToken.id,
                        first_name: body.first_name,
                        last_name: body.last_name,
                        email: body.email,
                        phone: body.phone,
                        
                    }, "administrators", result => {
                        response.send(result);
                    });
                });
                
                this.app.delete("/administrator/delete", this.authMiddleware.authentificate(), this.authMiddleware.isAdmin(), ({body}, response) => {
                    self.genericController.delete({
                        id : body.id,
                        
                    }, "administrators", result => {
                        response.send(result);
                    });
                });
                
                
                /**
                * Special function controller
                * 
                */
                this.app.put("/administrator/change-password", this.authMiddleware.authentificate(), ({decodedToken, body}, response) => {
                    
                    self.controller.changePassword(
                        {
                            id: decodedToken.id,
                            last_password: body.last_password,
                            password: body.new_password,
                            
                        }, "administrators", result => {
                            response.send(result);
                        }
                        );
                    });
                    
                    this.app.put("/administrator/change-avatar", this.authMiddleware.authentificate(), ({decodedToken, newImages}, response) => {
                        
                        self.genericController.update(
                            {
                                id: decodedToken.id,
                                avatar: newImages ? ( newImages.image ? newImages.image[0].filename : undefined) : undefined,
                                
                            }, "administrators", result => {
                                response.send(result);
                            }
                            );
                        });
                        this.app.put("/change-profile", this.authMiddleware.authentificate(), ({decodedToken, newImages}, response) => {
                            self.genericController.update(
                                {
                                    id: decodedToken.id,
                                    avatar: newImages ? ( newImages.image ? newImages.image[0].filename : undefined) : undefined,
                                    
                                }, "users", result => {
                                    response.send(result);
                                }
                                );
                            });
                        
                        
                        
                        return this.app;
                    }

    express() {
        
        return this.app;
        
    }
}

export default Routing;