class controllerGeneric {
    constructor(parent) {
        this.parent = parent;
        this.module = require('./../main/main');
        //this.model = this.module.model.getInstanceOf('account');
        this.date = require('./../../../others/helpers/date');
        this.genericModel = this.module.model.getInstanceOf('generic');
    }

    /**
    * @params data : Data we have to save to the database
    */

    insert(data, database, fn) {

        // first code
        
        const self = this;
        console.log(this.date.now)
        data.created_at = this.date.now();
        data.updated_at = this.date.now();


        this.genericModel.insert(data, database).then(data => {
            self.genericModel.getById({id : data[0]}, database).then(data => {
                self.parent.addStatus(data, fn);
            }).catch(error => {
                console.log(error);
                self.parent.sendMessage(error.code, fn);
            });
        }).catch(error => {
            console.log(error);
            self.parent.sendMessage(error.code, fn);
        });
        
    }

    /**
    * @params data : Data we have to update to the database
    */

    update(data, database, fn) {

        // first code

        const self = this;
        let id = data.id;
        data.updated_at = this.date.now();
        this.genericModel.update(data, database).then(result => {
            //if(result != 1) throw new Error("Something were wrong")
            self.genericModel.getById({id}, database).then(data => {
                self.parent.addStatus(data, fn);
            }).catch(error => {
                console.log(error);
                self.parent.sendMessage(error.code, fn);
            });
        }).catch(error => {
            console.log(error);
            self.parent.sendMessage(error.code, fn);
        });
        
    }

    /**
    * @params data : Data we have to update to the database
    */

    delete(data, database, fn) {

        // first code
        
        const self = this;

        this.genericModel.delete(data, database).then(data => {
            self.parent.addStatus(data, fn);
        }).catch(error => {
            console.log(error);
            self.parent.sendMessage(error.code, fn);
        });
        
    }

    /**
    * @params data : Data we have to update to the database
    */

    getById(data, database, fn) {

        // first code
        
        const self = this;

        this.genericModel.getById(data, database).then(data => {
            self.parent.addStatus(data, fn);
        }).catch(error => {
            console.log(error);
            self.parent.sendMessage(error.code, fn);
        });
        
    }

    /**
    * @params data : Data we have to update to the database
    */

    getWhere(data, database, fn) {

        // first code
        
        const self = this;

        this.genericModel.getWhere(data, database).then(data => {
            self.parent.addStatus(data, fn);
        }).catch(error => {
            console.log(error);
            self.parent.sendMessage(error.code, fn);
        });
        
    }

    /**
    * @params data : Data we have to update to the database
    */

    getAll(data, database, fn) {

        // first code
        
        const self = this;

        this.genericModel.getAll(data, database).then(data => {
            self.parent.addStatus(data, fn);
        }).catch(error => {
            console.log(error);
            self.parent.sendMessage(error.code, fn);
        });
        
    }

    /**
    * @params data : Data we have to update to the database
    */

    getAllWithLimit(data, database, fn) {

        // first code
        
        const self = this;

        this.genericModel.getAllWithLimit(data, database).then(data => {
            self.parent.addStatus(data, fn);
        }).catch(error => {
            console.log(error);
            self.parent.sendMessage(error.code, fn);
        });
        
    }
}

export default controllerGeneric;