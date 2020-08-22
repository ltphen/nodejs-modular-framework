class Database {
    constructor() {
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
    knex() {
        return this.knex;
    }
}

export default new Database();