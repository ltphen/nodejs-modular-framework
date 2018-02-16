
var assert = require('assert');
var module = require('./../../../app/generic/modules/modules');
var model = module.getModule("account").model.getInstanceOf("notes");
var controller = module.getModule("account").controller.getInstanceOf("notes");

describe('Array', function() {
  describe('#GetModulesAndControllers', function() {
    it('should return just true to prouve it can get a module then get a controller in this module', function() {
     assert.equal(controller.true(), true);
    });
  });
});



describe('Array', function() {
  describe('#GetModulesAndModels', function() {
    it('should return just true to prouve it can get a model then get a controller in this module', function() {
     assert.equal(model.true(), true);
    });
  });
});