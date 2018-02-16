var expect = require('chai').expect;
var hasNumbers = require('../../asserts/hasNumbers.js');
describe('asserts/hasNumbers', () => {
  it('should be a function', () => expect(hasNumbers).to.be.a('function'));

  describe('ok', () => {
    it('on number', () => expect(hasNumbers(123)).to.not.be.ok);
    it('on "123"', () => expect(hasNumbers("123")).to.not.be.ok);
    it('on "abc1"', () => expect(hasNumbers("abc1")).to.not.be.ok);
  });

  describe('!ok', () => {
    it('on undefined', () => expect(hasNumbers()).to.be.ok);
    it('on "abc"', () => expect(hasNumbers("abc")).to.be.ok);
    it('on NaN', () => expect(hasNumbers(NaN)).to.be.ok);
  });

  describe('returned', () => {
    it('.string', () => expect(hasNumbers('abc').string).to.equal('abc'));
    it('.subStrings', () => {
      const result = hasNumbers('abc');
      expect(result).to.have.ownPropertyDescriptor('subStrings');
      expect(JSON.stringify(result.subStrings)).to.equal('[1,2,3,4,5,6,7,8,9,0]');
    });
    it('.found === false', () => expect(hasNumbers('abc').found).to.be.false);
    it('.message', () => expect(hasNumbers('abc').message).to.be.ok);
  });
});