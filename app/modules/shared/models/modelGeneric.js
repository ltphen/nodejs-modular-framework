class modelGeneric {
    constructor(parent) {
        this.parent = parent;
        this.module = require('./../main/main');
        
    }

    /**
    * @params data : Data we have to save to the database
    */

    insert(data, database) {

        // first code

        return this.parent.database.knex(database).insert(data);

        
    }

    /**
    * @params data : Data we have to update to the database
    */

    update(data, database) {
        
        // have to retrive the id here
        let id = data.id;
        delete data.id;
        return this.parent.database.knex(database).update(data).where({id});
        
    }

    /**
    * @params data : Data we have to update to the database
    */

    delete(data, database) {

        return this.parent.database.knex(database).update({deleted:1}).where(data);

        
    }

    /**
    * @params data : Data we have to update to the database
    */

    getById(data, database) {
        data.deleted = 0
        data.status = 1	

        return this.parent.database.knex(database).where(data).select();
        
    }

    /**
    * @params data : Data we have to update to the database
    */

    getWhere(data, database) {
        data.deleted = 0	
        data.status = 1	
        return this.parent.database.knex(database).where(data).select();

        
    }

    /**
    * @params data : Data we have to update to the database
    */

    getAll(data, database) {

        return this.parent.database.knex(database).select("*").where("deleted", 0).andWhere("status", 1);
        
    }

    /**
    * @params data : Data we have to update to the database
    */

    getAllWithLimit({limit, offset}, database) {

        return this.parent.database.knex(database).select("*").limit(limit).offset(parseInt(offset?offset:0)).orderBy('id').where("deleted", 0).andWhere("status", 1);
        
    }
}

export default modelGeneric;
