process.on('uncaughtException', (err) => {
 	console.log(" uncaughtException   ===>  ",err);
});


try{

	let a = require('./app/modules/forum/controllers/controllerForum');


	let modules = require("./app/generic/modules/modules");

	var b = modules.getModule('forum').controller;

	let c = b.getInstanceOf("forum");

	 
	c.forumAndLastUsbject();

}
catch (e){
	console.log(" Error  : "+e);
}