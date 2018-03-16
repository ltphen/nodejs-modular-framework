var middlewareFiles = function (parent) {
	this.parent = parent;
	this.module = require('./../main/main');
	this.uploadPath = './public/images/'
	
}

/**
* @params params Type description
*/

middlewareFiles.prototype.handleFiles = function () {
	var self= this;
	return function(req, res, next){
		if (req.files) {
			var image;

			if ( req.files.image || req.files.back_img) {

				if(req.files.image) {
					image = req.files.image;
				}else if (req.files.back_img) {
					image = req.files.back_img;
				}
				var timestamp = Date.now().toString();
				image.mv(self.uploadPath+timestamp+'.'+image.mimetype.split("/")[1]);
				if(req.files.image) {
					req.body.image = timestamp+'.'+image.mimetype.split("/")[1];
				}else if (req.files.back_img) {
					req.body.back_img = timestamp+'.'+image.mimetype.split("/")[1];
				}
				next();
				return;
			}
		}
			req.body.image = 'default.png';
			req.body.back_img = 'default.png';

			next();
	}

	
}

module.exports = middlewareFiles;
