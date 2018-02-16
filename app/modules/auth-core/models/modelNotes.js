
var ModelNotes = function (parent) {
	this.parent = parent;
}
/**
* @params fn Function the function to exceute after result receive from database
* @return Promise
*/
ModelNotes.prototype.true = function() {
	console.log(this.parent);
	return true;
};

/**
* @params fn Function the function to exceute after result receive from database
* @return Promise
*/
ModelNotes.prototype.one = function(id) {
	return this.parent.database.query("SELECT * FROM notes WHERE id_notes = ?", id);	
};

module.exports = ModelNotes;
