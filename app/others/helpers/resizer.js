import config from "./../../../config/image";

class Resizer {
    constructor() {
        this.config = config;
        this.sharp = require("sharp");
        this.mkdirp = require("mkdirp")
    }

    /**
    * @params key String the key we have to get the value
    * @return any 
    */

    launch(folders, files) {
        let self = this;
        let sizes = this.config["reziseSizes"][folders];
        if(!files)
        return
        if(files.image) {
            for (const file of files.image) {
                self.resize(sizes, folders, file)
            }
        }
        
        
        if(files.image_secondaire) {
            for (const file of files.image_secondaire) {
                self.resize(sizes, folders, file)
            }
        }
        
        
    }

    resize(sizes, folders, {path, filename}) {
        let self = this;

        for (const size of sizes) {
            self.mkdirp(`uploads/${folders}/${size.width}x${size.height}`, err => {
                if (err) throw new Error(err)
                else {
                    try{

                        self.sharp(path)
                        .resize(size.width, size.height, {
                            kernel: self.sharp.kernel.nearest,
                            fit: 'cover',
                        })
                        .toFile(`uploads/${folders}/${size.width}x${size.height}/${filename}`)
                        .then(() => {
                            // output.png is a 200 pixels wide and 300 pixels high image
                            // containing a nearest-neighbour scaled version
                            // contained within the north-east corner of a semi-transparent white canvas
                        })
                    } catch(err){
                        throw new Error(err)
                    }
                }
            });
        }
    }
}

export default new Resizer();