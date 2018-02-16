
var ModelNotes = function () {
	this.parent = require("./model");

}
/**
* @params fn Function the function to exceute after result receive from database
* @return Promise
*/
ModelNotes.prototype.all = function() {
	return this.parent.database.query("SELECT * FROM notes", null);
};

/**
* @params fn Function the function to exceute after result receive from database
* @return Promise
*/
ModelNotes.prototype.one = function(id) {
	return this.parent.database.query("SELECT * FROM notes WHERE id_notes = ?", id);	
};

module.exports = new ModelNotes();
