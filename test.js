try{
	var modules = require("./app/generic/modules/modules");
	var app = require('express')();
	app.use("/forum", modules.getRoutes("forum"));

	app.listen(3000, () => {
	  console.log('App listening on port 3000');
	});


}
catch (e){
	console.log("error"+e);
}