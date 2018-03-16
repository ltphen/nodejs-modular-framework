var Routing = function () {
	this.express = require('express');
	this.app = 	this.express();
	this.modules = require("./../generic/modules/modules");
	this.config = require('./../main/config/config');
	this.crossorigin = this.modules.getShared().middleware.getInstanceOf('cors');

}


/**
* this part is for the application routes 
* App refer to express module
* the real application component
*/
Routing.prototype.boostrap = function() {

	var that = this, path = require('path');
	
	this.enabledCors();

	this.app.set('port', (this.config.get("env.PORT") || 5000));

	const fileUpload = require('express-fileupload');

	var morgan = require('morgan');

 	this.app.disable("x-powered-by");

	this.app.use(morgan('combined'))

	this.app.use(fileUpload());

	this.app.use(this.crossorigin.manuelCors());

	this.app.use("/forum", this.modules.getRoutes("forum"));

	this.app.use("/account", this.modules.getRoutes("account"));

	this.app.use('/files', this.express.static(path.join(__dirname, '../../public')))
	
	this.app.use(function(err, req, res, next) {
		if (err) {	
		    res.status(err.status || 500);
		    res.send(err.message);
		}
		next();
	});

	this.app.listen(this.app.get('port'), function() {
	  console.log('Node app is running on port', that.app.get('port'));
	});
};


Routing.prototype.express = function() {
	return this.app;
};

Routing.prototype.enabledCors = function() {
	var cors = require('cors');
	var corsOption = {
	    origin: true,
	    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	    credentials: true,
	    exposedHeaders: ['authorisation']
	};
	this.app.use(cors());
};


module.exports = new Routing();