var Promise = function() {
	this._resolve = null;
	this._reject = null;

}

Promise.prototype.resolve = function(argument) {
	this._resolve = argument;
};


Promise.prototype.reject = function(argument) {
	this._reject = argument;
};

Promise.prototype.promise = function() {
	return new Promise(function(resolve, reject){
		if (this.resolve != null) {
			resolve(this.resolve);
		}else{
			reject(this.reject);
		}
	})
};


module.exports = Promise;