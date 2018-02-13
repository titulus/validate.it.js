var expect = require('chai').expect;
var hasNo = require('../../asserts/hasNo.js');
describe('asserts/hasNo', () => {
  it('should be a function', () => expect(hasNo).to.be.a('function'));

  describe('ok', () => {
    it('on char', () => expect(hasNo('abc123', 'e')).to.not.be.ok);
    it('on digit', () => expect(hasNo('abc123', 4)).to.not.be.ok);
    it('on digit as char', () => expect(hasNo('abc123', '4')).to.not.be.ok);
    it('on regexp pattern', () => expect(hasNo('abc123', '\\s')).to.not.be.ok);
    it('on regexp pattern', () => expect(hasNo('abc123', '[А-я]')).to.not.be.ok);
  });

  describe('!ok', () => {
    it('on char', () => expect(hasNo('abc123', 'b')).to.be.ok);
    it('on digit', () => expect(hasNo('abc123', 2)).to.be.ok);
    it('on digit as char', () => expect(hasNo('abc123', '2')).to.be.ok);
    it('on regexp pattern', () => expect(hasNo('abc123', '\\d')).to.be.ok);
    it('on regexp pattern', () => expect(hasNo('abc123', '[A-z]')).to.be.ok);
  });
});