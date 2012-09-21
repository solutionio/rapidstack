var assert = require('assert');
var services = require('../lib/services');

describe('Services', function(){
	describe('getAll', function(){
		it('should return a list of services', function(){
			var res = services.getAll();
			assert.equal(typeof res, 'object');
			assert.equal(res.length, 1);
		});
	});
});
