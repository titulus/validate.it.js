var expect = require('chai').expect;
var template = require('../../asserts/_template.js');
describe('asserts/template', () => {
  it('should be a function', () => expect(template).to.be.a('function'));

  describe('ok', () => {
    it('on ()', () => expect(template()).to.not.be.ok);
    it('on 123', () => expect(template("123")).to.not.be.ok);
    it('on "abc"', () => expect(template("abc")).to.not.be.ok);
  });

  describe('!ok', () => {
    it('on ("abc", "def")', () => expect(template("abc", "def")).to.be.ok);
    it('on ("abc", 1, 2, 3)', () => expect(template("abc", 1, 2, 3)).to.be.ok);
  });
});