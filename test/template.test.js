var expect = require('chai').expect;
var template = require('../asserts/_template.js');
describe('asserts/template', () => {
  it('should be a function', () => expect(template).to.be.a('function'));

  describe('template( base? )', () => {
    it('should be falsy if no base and args', () => expect(template()).to.not.be.ok);
    it('should be falsy if no args', () => expect(template(true)).to.not.be.ok);
  });
  
  describe('template( base, ... )', () => {
    it('should be an object', () => expect(template(true, true)).to.be.a('object'));
  });
});