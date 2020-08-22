class controllerAccount {
    constructor(parent) {
        this.parent = parent;
        this.module = require('./../main/main');
        this.model = this.module.model.getInstanceOf('account');
        this.genericModel = this.module.shared.model.getInstanceOf('generic');
        this.config = this.module.config;
        this.SHA256 = require("crypto-js/sha256");
        this.Mailer = require('./../../../others/helpers/mailer');
        this.invitSubject = "Invitation pour administration"
        
        this.stringHelper = require('./../../../others/helpers/string');
        this.date = require('./../../../others/helpers/date');
        this.userDB = "users";
        this.adminDB = "administrators";
    }

    /**
    * @params telephone String the email ou the user pseudo
    * @params password String the user password
    * @params fn Function
    */

    login(data, database, fn) {
        
        const self = this;
        data.password = this.SHA256(data.password).toString();
        this.genericModel.getWhere(data, database).then(data => {
            
            if (data != null && data != undefined && data[0] != undefined) {
                data = {id : data[0].id, role : data[0].roles_id ? data[0].roles_id : false }

                // @TODO replace this by self 
                data.isAdmin = (database === self.userDB) ? false : true;
                const token = self.authenficate(data);
                var data = data;
                data.token = token;
                self.parent.addStatus({token : data.token}, fn);
            }else{
                self.parent.sendMessage("user_no_registered", fn);
                
            }
            
        }).catch(error => {
            console.log(error);
            self.parent.sendMessage(error.code, fn);
        });
    }

    addAdmin(data, database, fn) {
        
        // first code
        
        const self = this;
        console.log(this.date.now)
        data.created_at = this.date.now();
        data.updated_at = this.date.now();
        const password = this.stringHelper.generatePassword();
        data.password = this.SHA256(password).toString();
        this.genericModel.getWhere({email : data.email}, database).then(result => {
            if (!(result != null && result != undefined && result[0] != undefined)) {
                
                self.genericModel.insert(data, database).then(data => {
                    self.genericModel.getById({id : data[0]}, database).then(data => {
                        //data[0].password = password
                        delete data[0].password
                        self.Mailer.sendFromModele(data[0].email, self.invitSubject, 'invitAdmin', Object.assign({password}, data[0]));
                        self.parent.addStatus(data, fn);
                    }).catch(error => {
                        console.log(error);
                        self.parent.sendMessage(error.code, fn);
                    });
                }).catch(error => {
                    console.log(error);
                    self.parent.sendMessage(error.code, fn);
                });
                
                
            }else{
                self.parent.sendMessage("user_already_exists", fn);
            }
        })
    }

    /**
    * @params name String the user name
    * @params mail String the user mail
    * @params sex String the user sex
    * @params pseudo String the user pseudo
    * @params profession String the user profession
    * @params image String the user profile image
    * @params password String the user password
    * @params fn Function
    */

    register(data, database, fn) {
        
        
        const self = this;
        data.password = this.SHA256(data.password).toString();
        data.created_at = this.date.now();
        data.updated_at = this.date.now();
        
        
        this.genericModel.getWhere({telephone : data.telephone}, database).then(result => {
            console.log(result)
            if (!(result != null && result != undefined && result[0] != undefined)) {
                self.genericModel.insert(data, database).then(data => {
                    //self.Mailer.sendFromModele(mail, this.mailSubject, 'verifyAccount', {name : name, date : 'Maintenant', token : token}, './app/others/mailModels/');
                    if (data != null && data != undefined && data[0] != undefined) {
                        data = {id : data[0]}
                        // @TODO replace this by self 
                        data.isAdmin = (database === self.userDB) ? false : true;
                        const token = self.authenficate(data);
                        var data = data;
                        data.token = token;
                    }
                    self.parent.addStatus({token : data.token}, fn);
                }).catch(error => {
                    console.log(error);
                    self.parent.sendMessage(error.code, fn);
                });	
                
            }
            else
            self.parent.sendMessage("user_already_exists", fn);
            
        }).catch(error => {
            console.log(error);
            self.parent.sendMessage(error.code, fn);
        });
        
    }

    /**
    * @params name String the user name
    * @params mail String the user mail
    * @params sex String the user sex
    * @params pseudo String the user pseudo
    * @params profession String the user profession
    * @params image String the user profile image
    * @params password String the user password
    * @params id_user Number  user id
    * @params fn Function
    */

    updateProfile(name, mail, sex, pseudo, profession, image, password, id_user, fn) {
        
        const self = this;
        this.model.updateProfile(name, mail, sex, pseudo, profession, image, password, id_user).then(data => {
            self.parent.addStatus(data, fn);
        }).catch(error => {
            console.log(error);
            self.parent.sendMessage(error.code, fn);
        });
    }

    /**
    * @params id_user Number  user id
    * @params bio String the user bio
    * @params speciality String the user speciality
    * @params fn Function
    */

    changePassword(data, database, fn) {
        const self = this;
        console.log(data);
        data.last_password = this.SHA256(data.last_password).toString();
        data.updated_at = this.date.now();
        
        // Verify if the user with he last pass exist
        this.genericModel.getWhere({id : data.id, password : data.last_password}, database).then(result => {
            if (result != null && result != undefined && result[0] != undefined) {
                delete data.last_password;
                data.password = self.SHA256(data.password).toString();
            
                self.genericModel.update(data, database).then(data => {
                    self.parent.addStatus(data, fn);
                }).catch(error => {
                    console.log(error);
                    self.parent.sendMessage(error.code, fn);
                });
            }else{
                self.parent.sendMessage("bad_password", fn);
            }
        }).catch(error => {
            console.log(error);
            self.parent.sendMessage(error.code, fn);
        });
        
        
    }

    /**
    * @params data Object the data to add for encryption
    */
    verifyAccount(token, fn) {
        const self = this;
        this.model.verifyAccount(token).then(data => {
            self.parent.addStatus(data, fn);
        }).catch(error => {
            console.log(error);
            self.parent.sendMessage(error.code, fn);
        });
    }

    /**
    * @params data Object the data to add for encryption
    */
    authenficate(data) {
        const jwt = require("jsonwebtoken");
        
        return jwt.sign({
            data,
        }, this.config.get("jwt.secret")
        , { expiresIn: this.config.get("jwt.expiredTime") });
    }
}

export default controllerAccount;