var Database = function () {
	this.config = require('./../config/config');
	this.knex = require('knex')({
		client: 'mysql',
		connection: {
		   	host : this.config.get("db_host"),
			user : this.config.get("db_user"),
			password : this.config.get("db_pass"),
			database : this.config.get("db_name")
		}
	});
}

/**
* @return knex instance
*/
Database.prototype.knex = function() {
	return this.knex;
};

module.exports = new Database();