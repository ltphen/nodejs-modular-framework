var supertest = require("supertest");
var should = require("should");
let config = require('./../../../app/main/config/config');

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:"+config.get("env.PORT")+"/"+config.get("api.version"));
console.log("http://localhost:"+config.get("env.PORT")+"/"+config.get("api.version"));
// UNIT test begin

describe("Users Module Tests",function(){

  // #1 should return home page

  it("should return home page",function(done){

    var data = {
        new_pass : "test",
        old_pass : "test"
    }

    // calling home page api
    server
    .post("/users/change-password")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      res.body.status.should.equal("success");
      done();
    });
  });

});