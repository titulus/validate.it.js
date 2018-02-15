var expect = require('chai').expect;
var has = require('../../asserts/has.js');
describe('asserts/has', () => {
  it('should be a function', () => expect(has).to.be.a('function'));

  describe('ok', () => {
    it('on char', () => expect(has('abc123', 'b')).to.not.be.ok);
    it('on digit', () => expect(has('abc123', 2)).to.not.be.ok);
    it('on substring', () => expect(has('abc123', 'c1')).to.not.be.ok);
    it('on set (all present)', () => expect(has('abc123', 'b', 2, 'c1')).to.not.be.ok);
    it('on set (one of present)', () => expect(has('abc123', 'b', 4)).to.not.be.ok);
  });

  describe('!ok', () => {
    it('on char', () => expect(has('abc123', 'e')).to.be.ok);
    it('on digit', () => expect(has('abc123', 4)).to.be.ok);
    it('on substring', () => expect(has('abc123', 'd2')).to.be.ok);
    it('on set (all not present)', () => expect(has('abc123', 'e', 4, 'd2')).to.be.ok);
  });

  describe('returned object', () => {
    it('.string', () => expect(has('abc123', 'e').string).to.equal('abc123'));
    it('.subStrings', () => {
      const result = has('abc123', 'e', 4, 'd2');
      expect(result).to.have.ownPropertyDescriptor('subStrings');
      expect(JSON.stringify(result.subStrings)).to.equal('["e",4,"d2"]');
    });
    it('.found === false', () => expect(has('abc123', 'e').found).to.be.false);
    it('.message', () => expect(has('abc123', 'e').message).to.be.ok);
  });
});