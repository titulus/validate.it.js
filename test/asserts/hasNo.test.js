var expect = require('chai').expect;
var hasNo = require('../../asserts/hasNo.js');
describe('asserts/hasNo', () => {
  it('should be a function', () => expect(hasNo).to.be.a('function'));

  describe('ok', () => {
    it('on char', () => expect(hasNo('abc123', 'e')).to.not.be.ok);
    it('on digit', () => expect(hasNo('abc123', 4)).to.not.be.ok);
    it('on substring', () => expect(hasNo('abc123', 'd2')).to.not.be.ok);
    it('on set (all not present)', () => expect(hasNo('abc123', 'e', 4, 'd2')).to.not.be.ok);
  });

  describe('!ok', () => {
    it('on char', () => expect(hasNo('abc123', 'b')).to.be.ok);
    it('on digit', () => expect(hasNo('abc123', 2)).to.be.ok);
    it('on substring', () => expect(hasNo('abc123', 'c1')).to.be.ok);
    it('on set (all present)', () => expect(hasNo('abc123', 'b', 2, 'c1')).to.be.ok);
    it('on set (one of present)', () => expect(hasNo('abc123', 'b', 4)).to.be.ok);
  });
});