# Read Me


# Installation
To install use the following command
```
git clone https://github.com/ltphen/nodejs-modular-framework.git
```
then
```
npm install
```

To launch the server 
```
npm start
```

# Folder Structure

```
.
+-- node_modules
|   +-- *
+-- app
|   +-- cli
|   +-- generic
|   +-- main
|   +-- modules
|   +-- others
|   +-- routing	
+-- config
|   +-- config.js
+-- log
|   +-- *
+--  public
|   +-- *
+-- test
+-- api.js

```

## api.js

the  **api** entry point . Bootstrap application routes

## test

Folder for application unit test (***optional***).
to test : 

    npm test


## public

public folder for uploaded files

## config

The main application configuration folder

### config.js




    database : {
    
	    db_name :  "elevage",
    
	    db_host :  "localhost",
	    
	    db_user :  "root",
	    
	    db_pass :  ""
    
    },
    
    api : {
    
	    version:  'v1'
    
    },
    
    env : {
    
	    PORT :  8000,
	    
	    prod :  false
    
    },
    
    log : {
    
	    great :  "localhost:8000/log/",
	    
	    folders : ["common", "generic"]
    
    },
    
      
    
    jwt : {
    
	    secret :  "PASDEPASSWORD",
	    
	    expiredTime :  "24h"
    
    },
    
    mail : {
    
    config : {
    
	    host:  'smtp.ethereal.email',
	    
	    port:  587,
	    
	    auth: {
	    
	    user:  'vb26llg4uzfshhie@ethereal.email',
	    
	    pass:  'GthaXwxS9WUsNbfEcK'
    
    }
    
    },
    
    option : {
    
	    from:  '"Fred Foo 👻" <foo@example.com>', // sender addres
    
    }
    
    }



## app

The application logic


# App folder ( API )

[cli api](doc/cli.md)  
[generic folder](doc/generic.md)  
[main folder](doc/main.md)  
[modules folder](doc/modules.md)  
[others folder](doc/routing.md)  
[routing folder](doc/routing.md)

