
var ControllerNotes = function (parent) {
	this.parent = parent;
}
/**
* @params fn Function the function to exceute after result receive from database
*/
ControllerNotes.prototype.true = function () {
	return true
}
/**
* @params fn Function the function to exceute after result receive from database
* @params id Integer the notes Id
*/
ControllerNotes.prototype.one = function(id, fn) {
	var that = this;
	if (!isNaN(id)) {
		this.parent.model.getModel("notes").one([id]).then(function (result) {
			that.parent.addStatus(result, fn);
		}).catch(function(error){
			console.log(error);
			that.parent.badStatus(fn);
		});
	}else{
		this.parent.badStatus(fn);
	}
};

module.exports = ControllerNotes;