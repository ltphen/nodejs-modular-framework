class middlewareFiles {
    constructor(parent) {
        this.parent = parent;
        this.module = require('../../core/main/main');
        this.uploadPath = './public/images/'
        
    }

    /**
    * @params params Type description
    */

    handleFiles() {
        const self= this;
        return ({files, body}, res, next) => {
            if (files) {
                let image;

                if ( files.image || files.back_img) {

                    if(files.image) {
                        image = files.image;
                    }else if (files.back_img) {
                        image = files.back_img;
                    }
                    const timestamp = Date.now().toString();
                    image.mv(`${self.uploadPath+timestamp}.${image.mimetype.split("/")[1]}`);
                    if(files.image) {
                        body.image = `${timestamp}.${image.mimetype.split("/")[1]}`;
                    }else if (files.back_img) {
                        body.back_img = `${timestamp}.${image.mimetype.split("/")[1]}`;
                    }
                    next();
                    return;
                }
            }
                body.image = 'default.png';
                body.back_img = 'default.png';

                next();
        };

        
    }
}

export default middlewareFiles;
