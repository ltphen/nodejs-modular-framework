/**
* The Global Application Configurations
* Database
* ENV
* ...
*/
export default {
	database : {
		db_name : "databasename",
		db_host : "localhost",
		db_user : "user",
		db_pass : "password"
	},
	api : {
		version: 'v1'
	},
	env : {
		PORT : 8000,
		prod : false
	},
	log : {
		great : "localhost:8000/log/",
		folders : ["common", "generic"]
	},

	jwt : {
		secret : "rskltni uotuertutyertuyetyo utonghj",
		expiredTime : "24h"
	},
	mail : {
	    config : {
			host: 'smtp.googlemail.com', // Gmail Host
			port: 465, // Port
			secure: true, // this is true as port is 465
			 auth: {
			 	user: 'GMAIL_USERNAME', //Gmail username
			 	pass: 'GMAIL_PASSWORD' // Gmail password
			 }
				
	    },
	    option : {
	    	from: '"Fred Foo 👻" <foo@example.com>', // sender addres
	    }
	},

	
	
};
