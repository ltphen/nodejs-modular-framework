/**
* The Global Application Configurations
* Database
* ENV
* ...
*/
module.exports = {
	database : {
		db_name : "forum",
		db_host : "localhost",
		db_user : "root",
		db_pass : "root"
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
		secret : "PASDEPASSWORD",
		expiredTime : "1h"
	},
	mail : {
	    config : {
	    	host: 'smtp.ethereal.email',
		    port: 587,
		    auth: {
		        user: 'vb26llg4uzfshhie@ethereal.email',
		        pass: 'GthaXwxS9WUsNbfEcK'
		    }
	    },
	    option : {
	    	from: '"Fred Foo 👻" <foo@example.com>', // sender addres
	    }
	}
	
}