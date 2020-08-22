import bodyParser from 'body-parser';

class Routing {
    constructor() {
        this.express = require('express');
        
        this.app = 	this.express();
        this.modules = require("./../generic/modules/modules");
        this.config = require('./../main/config/config');
        this.resizer = require("../others/helpers/resizer");
        this.crossorigin = this.modules.getShared().middleware.getInstanceOf('cors');
        this.sharedController = this.modules.getShared().controller.getInstanceOf('shared');
        this.boostrap(); 
    }

    /**
    * this part is for the application routes 
    * App refer to express module
    * the real application component
    */
    boostrap() {
        this.app.use( bodyParser.json({limit: '50mb'}) );       // to support JSON-encoded bodies
        this.app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
            limit: '50mb',
            extended: true,
            parameterLimit: 1000000
        }));

        const that = this;
        const path = require('path');

        this.enabledCors();

        this.app.set('port', (this.config.get("env.PORT") || 5000));

        const fileUpload = require('express-fileupload');

        const morgan = require('morgan');

        this.app.disable("x-powered-by");

        this.app.use(morgan('combined'))

        this.app.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 },
        }));

        this.app.use(this.crossorigin.manuelCors());



        this.app.use("/", this.modules.getRoutes("core"));

        this.app.use("/users", this.modules.getRoutes("account"));

        this.app.use('/files', this.express.static(path.join(__dirname, '../../public')))

        this.app.use((err, req, res, next) => {
            if (err) {	
                that.sharedController.parent.sendMessage(err.code, (data)=>res.send(data))
            }
            next();
        });

        // Version adding on urls 

        let app = 	this.express();


        //server.js

        const multer = require('multer');
        // SET STORAGE
        const storage = multer.diskStorage({
            destination(req, file, cb) {
                cb(null, `uploads/${that.sharedController.getFolder(req)}`)
            },
            filename(req, {originalname, fieldname}, cb) {
                let ext = originalname.split(".")[originalname.split(".").length - 1]
                cb(null, `${fieldname}-${Date.now()}.${ext}`)
            }
            
        });

        const upload = multer({ 
            storage,
            fileFilter(req, {originalname}, callback) {
                
                const ext = path.extname(originalname);
                
                if (ext !== ".svg" && ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
                    req.fileValidationError = 'Erreur de format';
                    return callback(null, false);	 			
                }
                
                callback(null, true);
                
            } }).fields([{ name: 'image', maxCount: 1 }, { name: 'image_secondaire', maxCount: 8 }]);


        // app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
        // 	const file = req.file
        // 	if (!file) {
        // 		const error = new Error('Please upload a file')
        // 		error.httpStatusCode = 400
        // 		return next(error)
        // 	}
        // 	next(file)

        // })

        app.all(`/${this.config.get("api.version")}/*`, (req, res, next) => {
            upload(req, res, err => {
                if (err instanceof multer.MulterError) {
                    // A Multer error occurred when uploading.
                    that.sharedController.parent.sendMessage(err.code, (data)=>res.send(data))
                } else if (err) {
                    // An unknown error occurred when uploading.
                    that.sharedController.parent.sendMessage(err.code, (data)=>res.send(data))
                }
                // Everything went fine.
                
                req.newImages = req.files
                if(req.fileValidationError)
                    return that.sharedController.parent.sendMessage("file_bad_format", (data)=>res.send(data))	 
                if(req.files)
                    that.resizer.launch(that.sharedController.getFolder(req), req.files);
                
                next()
            })
        })


        app.use(`/${this.config.get("api.version")}`,this.app)

        app.listen(this.app.get('port'), () => {
            console.log('Node app is running on port', that.app.get('port'));
        });
    }

    express() {
        return this.app;
    }

    enabledCors() {
        const cors = require('cors');
        const corsOption = {
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
            exposedHeaders: ['x-auth-token']
        };
        this.app.use(cors());
    }
}

export default new Routing();