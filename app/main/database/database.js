var Database = function () {
	this.sql = require('mysql');
	this.config = require('./../config/config');
	this.connection = this.sql.createConnection({
		host : this.config.get("db_host"),
		user : this.config.get("db_user"),
		password : this.config.get("db_pass"),
		database : this.config.get("db_name")
	});
	this.connection.connect(function(error){
		if (error) {
			console.log(" There was some trouble "+ error);
			return;
		}
	});
}

/**
* @params statement String the SQL statement
* @params attributes Array evantual request attributes
* @return Promise
*/
Database.prototype.query = function(statement, attributes) {
	var that = this;
	return new Promise(function (resolve, reject) {
		if (attributes == null) {
			that.connection.query(statement, function(error, result, fields){
				if (error) { reject(error)}
				resolve(result);
			})
		}else{
			that.connection.query(statement, attributes, function(error, result, fields){
				if (error) { reject(error)}
				resolve(result);
			})
		}
	});
};



module.exports = new Database();