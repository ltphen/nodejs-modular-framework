
var ModelAccessApi = function () {
	this.parent = require("./model");

}
/**
* @params access_token String the access token for the api
* @return Promise
*/
ModelAccessApi.prototype.one = function(access_token) {
	return this.parent.database.query("SELECT * FROM APIaccess WHERE token = ?", access_token);	
};

module.exports = new ModelAccessApi();
