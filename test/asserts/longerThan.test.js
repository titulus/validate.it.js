var expect = require('chai').expect;
var longerThan = require('../../asserts/longerThan.js');
describe('asserts/longerThan', () => {
  it('should be a function', () => expect(longerThan).to.be.a('function'));

  describe('ok', () => {
    it('on "abc" 2', () => expect(longerThan('abc', 2)).to.not.be.ok);
    it('on "abc" 0', () => expect(longerThan('abc', 0)).to.not.be.ok);
  });

  describe('!ok', () => {
    it('on "abc" 3', () => expect(longerThan('abc', 3)).to.be.ok);
    it('on "abc" "2"', () => expect(() => longerThan('abc', '4')).to.throw);
  });

  describe('returned', () => {
    it('.string', () => expect(longerThan('abc', 4).string).to.equal('abc'));
    it('.length', () => expect(longerThan('abc', 4).length).to.equal(3));
    it('.lengthBeyond', () => expect(longerThan('abc', 4).lengthBeyond).to.equal(4));
    it('.message', () => expect(longerThan('abc', 4).message).to.be.ok);
  });
});