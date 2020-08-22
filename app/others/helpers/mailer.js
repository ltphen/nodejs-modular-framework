class Mailer {
    constructor() {
        this.config = require("./../../main/config/config");
        this.nodemailer = require('nodemailer');
        this.fs = require("fs");
        this.modelPath = "./app/others/mailModels/";

    }

    /*
    * @params to String sender address
    * @params subject String email subject
    * @params message String email message
    */
    send(to, subject, message) {
            const transporter = this.nodemailer.createTransport(this.config.get("mail.config"));

            const mailOptions = {
                from: this.config.get("mail.option.from"),
                to,
                subject, 
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
    }

    /*
    * @params to String sender address
    * @params subject String email subject
    * @params modelMane String the reference model name for the mail
    * @params data Object the mapping data between model and real data
    * @params path String the modele file path (disturbing because if fs )
    */

    sendFromModele(to, subject, modelName, data, path) {
        const self = this;
        this.normalizeModel(modelName, data, path).then(data => {
            self.send(to, subject, data);
        }).catch(error => {
            console.log(error);
        })

    }

    /*
    * @params modelMane String the reference model name for the mail
    * @params data Object the mapping data between model and real data
    * @params path String the modele file path (disturbing because if fs )
    */

    normalizeModel(modelName, data, path) {
        const self = this;
        return new Promise((resolve, reject) => {
            self.modelPath = (path) ? path : self.modelPath;
            self.fs.readFile(`${self.modelPath+modelName}.html`, (error, content) => {
                    if (error){
                        reject(error); 
                    } 
                    for(const key in data) {
                        const regExp = new RegExp(`{{${key}}}`, 'gi');
                        content = content.toString().replace(regExp, data[key]);
                    }
                    resolve(content);       
            });

        });

    }
}

export default new Mailer();