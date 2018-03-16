var Mailer = function(){
    this.config = require("./../../main/config/config");
    this.nodemailer = require('nodemailer');
    this.fs = require("fs");
    this.modelPath = "./../mailModels/";

}

/*
* @params to String sender address
* @params subject String email subject
* @params message String email message
*/
Mailer.prototype.send = function(to, subject, message) {
    this.nodemailer.createTestAccount((err, account) => {
        var transporter = this.nodemailer.createTransport(this.config.get("mail.config"));

        var mailOptions = {
            from: this.config.get("mail.option.from"),
            to: to,
            subject: subject, 
            html: message
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            if (!this.config.get("env.prod")) {
                console.log('Message sent: %s', info.messageId);
                // only for devellopement
                console.log('Preview URL: %s', this.nodemailer.getTestMessageUrl(info));
                
            }
        });
    });
}

/*
* @params to String sender address
* @params subject String email subject
* @params modelMane String the reference model name for the mail
* @params data Object the mapping data between model and real data
* @params path String the modele file path (disturbing because if fs )
*/

Mailer.prototype.sendFromModele = function(to, subject, modelName, data, path) {
    var self = this;
    this.normalizeModel(modelName, data, path).then(function(data){
        self.send(to, subject, data);
    }).catch(function (error) {
        console.log(error);
    })

}

/*
* @params modelMane String the reference model name for the mail
* @params data Object the mapping data between model and real data
* @params path String the modele file path (disturbing because if fs )
*/

Mailer.prototype.normalizeModel = function(modelName, data, path) {
    var self = this;
    return new Promise(function(resolve, reject) {
        self.modelPath = (path) ? path : self.modelPath;
        self.fs.readFile(self.modelPath+modelName+'.html', function (error, content) {
                if (error){
                    reject(error); 
                } 
                for(var key in data) {
                    var regExp = new RegExp('{{'+key+'}}', 'gi');
                    content = content.toString().replace(regExp, data[key]);
                }

                resolve(content);       
        });

    })

};


module.exports = new Mailer();