var expect = require('chai').expect;
var template = require('../asserts/template.js');
describe('template', () => {
  it('should be a function', () => {
    expect(template).to.be.a('function');
  });
  describe('template()', () => {
    it('should be an object', () => {
      expect(template()).to.be.a('object');
    });
    it('should contain `base` and `args` props', () => {
      expect(template()).to.have.keys('base', 'args');
    });
    it('should return first argument in `base` prop', () => {
      expect(template('asd').base).to.equal('asd');
      expect(template(123).base).to.equal(123);
      const a = {}
      expect(template(a).base).to.equal(a);
    });

  })
});