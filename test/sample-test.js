var libpath = process.env['CHECK_COVERAGE'] ? '../src-cov' : '../src';
var assert = require("assert");

describe ("Sample", function() {

    it ("it works", function() {
        assert.equal(true, true);
    });
    
});