var expect = require('chai').expect;
var match = require('../../asserts/match.js');
describe('asserts/match', () => {
  it('should be a function', () => expect(match).to.be.a('function'));

  describe('ok', () => {
    it('on \\d', () => expect(match('abc123', /\d/)).to.not.be.ok);
    it('on [a-z]{3,3}\\d+', () => expect(match('abc123', /[a-z]{3,3}\d+/)).to.not.be.ok);
    it('on ^a.*3$', () => expect(match('abc123', /^a.*3$/)).to.not.be.ok);
    it('on abc123', () => expect(match('abc123', /abc123/)).to.not.be.ok);
  });

  describe('!ok', () => {
    it('on \\s', () => expect(match('abc123', /\s/)).to.be.ok);
    it('on [a-z]{4,4}\\d+', () => expect(match('abc123', /[a-z]{4,4}\d+/)).to.be.ok);
    it('on ^d.*6$', () => expect(match('abc123', /^d.*6$/)).to.be.ok);
    it('on def456', () => expect(match('abc123', /def456/)).to.be.ok);
  });

  describe('returned object', () => {
    it('.string', () => expect(match('abc123', /\s/).string).to.equal('abc123'));
    it('.pattern', () => expect(match('abc123', /\s/).pattern).to.equal('/\\s/'));
    it('.match === false', () => expect(match('abc123', /\s/).match).to.be.false);
    it('.message', () => expect(match('abc123', /\s/).message).to.be.ok);
  });
});