/**
* The Global Application Configurations
* Database
* ENV
* ...
*/
module.exports = {
	database : {
		db_name : "xcode",
		db_host : "localhost",
		db_user : "root",
		db_pass : "root"
	},
	env : {
		PORT : 8000
	},
	log : {
		great : "localhost:8000/log/",
		folders : ["common", "generic"]
	}
	
}