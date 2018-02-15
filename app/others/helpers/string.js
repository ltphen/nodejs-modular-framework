var String = function() {
}

/**
* @params string String the string to capitalize
*/
String.prototype.capitalize = function(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
};


module.exports = new String();