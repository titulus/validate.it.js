var expect = require('chai').expect;
var match = require('../../asserts/match.js');
describe('asserts/match', () => {
  it('should be a function', () => expect(match).to.be.a('function'));

  describe('ok', () => {
    it('on \\d', () => expect(match('abc123', /\d/)).to.not.be.ok);
    it('on ^a.*3$', () => expect(match('abc123', /^a.*3$/)).to.not.be.ok);
    it('on abc123', () => expect(match('abc123', /abc123/)).to.not.be.ok);
    it('on set (all present)', () => expect(match('abc123', /\d/, /^a.*3$/, /abc123/)).to.not.be.ok);
    it('on set (one of present)', () => expect(match('abc123', /\d/, /\s/)).to.not.be.ok);
  });

  describe('!ok', () => {
    it('on \\s', () => expect(match('abc123', /\s/)).to.be.ok);
    it('on ^d.*6$', () => expect(match('abc123', /^d.*6$/)).to.be.ok);
    it('on def456', () => expect(match('abc123', /def456/)).to.be.ok);
    it('on set (all not present)', () => expect(match('abc123', /\s/, /^d.*6$/, /def456/)).to.be.ok);
  });

  describe('returned object', () => {
    it('.string', () => expect(match('abc123', /\s/).string).to.equal('abc123'));
    it('.patterns', () => {
      const result = match('abc123', /\s/, /def456/);
      expect(result).to.have.ownPropertyDescriptor('patterns');
      expect(JSON.stringify(result.patterns)).to.equal('["/\\\\s/","/def456/"]'); // a lot of slashes ^_^
    });
    it('.match === false', () => expect(match('abc123', /\s/).match).to.be.false);
    it('.message', () => expect(match('abc123', /\s/).message).to.be.ok);
  });
});