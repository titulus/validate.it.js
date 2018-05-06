var expect = require('chai').expect;
var length = require('../../asserts/length.js');
describe('asserts/length', () => {
  it('should be a function', () => expect(length).to.be.a('function'));

  describe('ok', () => {
    it('on "abc" 3', () => expect(length('abc', 3)).to.not.be.ok);
    it('on "" 0', () => expect(length('', 0)).to.not.be.ok);
  });

  describe('!ok', () => {
    it('on "abc" 4', () => expect(length('abc', 4)).to.be.ok);
    it('on "abc" "3"', () => expect(() => length('abc', '3')).to.throw);
  });

  describe('returned', () => {
    it('.string', () => expect(length('abc', 4).string).to.equal('abc'));
    it('.length', () => expect(length('abc', 4).length).to.equal(3));
    it('.lengthBeyond', () => expect(length('abc', 4).lengthRequired).to.equal(4));
    it('.message', () => expect(length('abc', 4).message).to.be.ok);
  });
});