var assert = require("assert");

var Model = require('../lib/backbone-schema').SchemaAwareModel;
var expect = require('expect.js');
describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});

describe('Schema Aware Model Testing Module', function() {

  //
  // Global settings
  //

  var Model = require('../lib/backbone-schema').SchemaAwareModel;

  var model, schema, errorEmitted, changeEmitted;

  function resetEmitted() {
    errorEmitted = changeEmitted = false;
  }

  //
  // Before each
  //

  beforeEach(function() {

    schema = {
      name: "testing",
      type: "object",
      properties: {
        "text": {
          type: "string",
          required: true
        },
        "done": {
          type: "boolean",
          required: true
        },
        "number": {
          type: "integer"
          // not required
        }
      }
      // additionalProperties: true by default
    };

    model = new Model( {}, { schema: schema} );
    resetEmitted();

    model.bind('change', function() {
      changeEmitted = true;
    });

    model.bind('error', function() {
      errorEmitted = true;
    });

  });


  //
  // Test specs
  //
  it('should fail to set data missing a required property', function() {
    model.set({ text: 'hello world' });
    expect(model.attributes).to.eql({});
    expect(errorEmitted).to.be(true);
    expect(changeEmitted).to.be(false);
  });

  it('should set data conforming to provided schema', function() {
    model.set({ text: 'hello world', done: true });
    expect(model.get('text')).to.equal('hello world');
    expect(model.get('done')).to.equal(true);
    expect(errorEmitted).to.be(false);
    expect(changeEmitted).to.be(true);
  });

  it('should fail to set data with wrong property type', function() {
    model.set({ text: 123, done: true });
    expect(model.attributes).to.eql({});
    expect(errorEmitted).to.be(true);
    expect(changeEmitted).to.be(false);
  });

  it('should set data conforming to provided schema plus extra property', function() {
    model.set({ text: 'hello world', done: true, extra: 123 });
    expect(model.get('text')).to.equal('hello world');
    expect(model.get('done')).to.equal(true);
    expect(model.get('extra')).to.equal(123);
    expect(errorEmitted).to.be(false);
    expect(changeEmitted).to.be(true);
  });

  it('should fail to set data with extra property when extra properties not allowed', function() {
    schema.additionalProperties = false;
    model = new Model( {}, { schema: schema } );
    resetEmitted();
    model.bind('change', function() {
      changeEmitted = true;
    });
    model.bind('error', function(msg) {
      errorEmitted = true;
    });
    model.set({ text: 'hello world', done: true, extra: 123 });
    expect(model.attributes).to.eql({});
    expect(errorEmitted).to.be(true);
    expect(changeEmitted).to.be(false);
  });

  it('should change type of extra property', function() {
    model.set({ text: 'hello world', done: true, extra: 123 });
    expect(model.get('text')).to.equal('hello world');
    expect(model.get('done')).to.equal(true);
    expect(typeof model.get('extra')).to.equal('number');
    expect(model.get('extra')).to.equal(123);
    expect(errorEmitted).to.be(false);
    expect(changeEmitted).to.be(true);
    resetEmitted();
    model.set({ extra: 'test' });
    expect(model.get('text')).to.equal('hello world');
    expect(model.get('done')).to.be(true);
    expect(typeof model.get('extra')).to.equal('string');
    expect(model.get('extra')).to.equal('test');
    expect(errorEmitted).to.be(false);
    expect(changeEmitted).to.be(true);
  });

  it('should fail to change type of property defined in provided schema', function() {
    model.set({ text: 'hello world', done: true });
    expect(model.get('text')).to.equal('hello world');
    expect(model.get('done')).to.equal(true);
    expect(errorEmitted).to.be(false);
    expect(changeEmitted).to.be(true);
    resetEmitted();
    model.set({ done: 'test' });
    expect(model.get('text')).to.equal('hello world');
    expect(typeof model.get('done')).to.equal('boolean');
    expect(model.get('done')).to.be(true);
    expect(errorEmitted).to.be(true);
    expect(changeEmitted).to.be(false);
  });

 it('should unset optional property', function() {
    model.set({ text: 'hello world', done: true, number: 123 });
    expect(model.get('text')).to.equal('hello world');
    expect(model.get('done')).to.be(true);
    expect(model.get('number')).to.equal(123);
    expect(errorEmitted).to.be(false);
    expect(changeEmitted).to.be(true);
    resetEmitted();
    model.unset('number');
    expect(model.get('text')).to.equal('hello world');
    expect(model.get('done')).to.be(true);
    expect(model.get('number')).to.eql(undefined);
    expect(errorEmitted).to.be(false);
    expect(changeEmitted).to.be(true);
  });

  it('should fail to unset mandatory property', function() {
    model.set({ text: 'hello world', done: true });
    expect(model.get('text')).to.equal('hello world');
    expect(model.get('done')).to.be(true);
    expect(errorEmitted).to.be(false);
    expect(changeEmitted).to.be(true);
    resetEmitted();
    model.unset('done');
    expect(model.get('text')).to.equal('hello world');
    expect(model.get('done')).to.be(true);
    expect(errorEmitted).to.be(true);
    expect(changeEmitted).to.be(false);
  });

  it('should clear already set model', function() {
    model.set({ text: 'hello world', done: true });
    expect(model.get('text')).to.equal('hello world');
    expect(model.get('done')).to.equal(true);
    expect(errorEmitted).to.be(false);
    expect(changeEmitted).to.be(true);
    resetEmitted();
    model.clear();
    expect(model.attributes).to.eql({});
    expect(errorEmitted).to.be(false);
    expect(changeEmitted).to.be(true);
  });

});
