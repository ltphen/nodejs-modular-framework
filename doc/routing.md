# Routing folder API

the project routes. It contain every routes of the api. Every module route are register to the main route here

### Usage

    this.app.use("/users", this.modules.getRoutes("account"));
    this.app.use("/", this.modules.getRoutes("core"));

Help to register a route to the main routes 

# Others folder API

helpers functions are founnd here as : 
- Mailer
- String helper
- Date helper

