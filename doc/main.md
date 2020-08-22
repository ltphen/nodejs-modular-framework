# Main folder API

this folder contain function and methods that are independant of the progect and reusables in an abstract layer

## Config

### explain

It's help accessing to config parameters. It's call everytime you need a configurations from the configuration file.


### Properties

    config  =  Config file datas

   
    
### functions

**Construct**

    Config()


- `Config.get(configParam) : Any` : return a configuration item you need to access
	- configParam: It a word that specify what you want to retreive from configurations files.
	Exemple : `database` : Return the database config object, `database.db_pass` : return the value of database.db_pass

- `Config.getSingle(param) : Any` 
- `Config.getDirect(param) : Any` 
- `Config.getMultiple(param) : Any` 
	

## Database

    
### explain

The database interface . It host a knex instance that initiate the communication with he database


### Properties

    config  =  Config Object

    knex  =  Knex Query Builder instance
        


