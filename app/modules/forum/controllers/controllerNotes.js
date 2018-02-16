
var ControllerNotes = function () {
	this.parent = require("./controller");
}
/**
* @params fn Function the function to exceute after result receive from database
*/
ControllerNotes.prototype.all = function (fn) {
	var that = this;
	this.parent.model.getModel("notes").all().then(function (result) {
		that.parent.addStatus(result, fn);
	}).catch(function(error){
		console.log(error);
		that.parent.badStatus(fn);
	});
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

module.exports = new ControllerNotes();