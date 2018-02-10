var expect = require('chai').expect;
var hasNumbers = require('../asserts/hasNumbers.js');
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
});