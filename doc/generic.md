# Generic folder API

this folder contain controller, models, middlewares, modules parent with usable functions

## Controller

### explain

Here is a controller . It's help to treat data that have been retreive to the database.
It's call after a route mapping and validate, or work on sended data before using them

It can be access in any controller via the ```this.parent```
property
### Properties

    model  =  Model instance

    helper  =  helpers functions
    
    currentModule  =  current module name
    
    success  =  "success";
    
    error  =  "error";
    
### functions

**Construct**

    Controller(module)


- `Controller.getInstanceOf(controllerName) : Controller` : return a controller instance 

- `Controller.goodStatus(data, fn) : JSON` : return a 200 status with `status: success`
	- data : Data to send throw the api
	- fn : the callback to call after building JSON data
	
-  `Controller.badStatus(controllerName) : JSON` : return a 200 status with `status: error`


## Model


    
### explain

Here is a model parent . To directly communicate with the database


### Properties

    database  =  Database access instance

    helper  =  helpers functions
    
    currentModule  =  current module name
    


### functions
**Construct**

    Model(module)
    
- `ModelInstanceOf(controllerName) : Model` : return a modeltance 

## Module ( !! important )

### explain

Here the module main object. It's the module entry point . It give access to modules routes, controller, middlewares, helpers, and to the shared modules that every module can use

It can be access in any controller via the ```this.module```
property

### Properties

 

    Controller : module parent controller. It give access to others modules controller across the **getInstanceOf** method
    
    Model  =  module parent model. It give access to others modules model across the **getInstanceOf** method
    
    Middleware  =  module parent middleware. It give access to others modules middleware across the **getInstanceOf** method
    
    config  = manage configurations;
    
### functions

**Construct**

    Controller(module)


- `Controller.getInstanceOf(controllerName) : Controller` : return a controller instance 

- `Controller.goodStatus(data, fn) : JSON` : return a 200 status with `status: success`
	- data : Data to send throw the api
	- fn : the callback to call after building JSON data
	
-  `Controller.badStatus(controllerName) : JSON` : return a 200 status with `status: error`



