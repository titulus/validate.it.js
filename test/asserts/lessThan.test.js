var expect = require('chai').expect;
var lessThan = require('../../asserts/lessThan.js');
describe('asserts/lessThan', () => {
  it('should be a function', () => expect(lessThan).to.be.a('function'));

  describe('ok', () => {
    it('on "abc" 4', () => expect(lessThan('abc', 4)).to.not.be.ok);
    it('on "abc" 5', () => expect(lessThan('abc', 5)).to.not.be.ok);
    it('on "" 1', () => expect(lessThan("", 1)).to.not.be.ok);
  });

  describe('!ok', () => {
    it('on "abc" 3', () => expect(lessThan('abc', 3)).to.be.ok);
    it('on "abc" "4"', () => expect(() => lessThan('abc', '4')).to.throw);
    it('on "" 0', () => expect(() => lessThan("", 0)).to.throw);
  });

  describe('returned', () => {
    it('.string', () => expect(lessThan('abc', 2).string).to.equal('abc'));
    it('.length', () => expect(lessThan('abc', 2).length).to.equal(3));
    it('.lengthBeyond', () => expect(lessThan('abc', 2).lengthBeyond).to.equal(2));
    it('.message', () => expect(lessThan('abc', 2).message).to.be.ok);
  });
});