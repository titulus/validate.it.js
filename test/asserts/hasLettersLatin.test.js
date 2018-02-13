var expect = require('chai').expect;
var hasLettersLatin = require('../../asserts/hasLettersLatin.js');
describe('asserts/hasLettersLatin', () => {
  it('should be a function', () => expect(hasLettersLatin).to.be.a('function'));

  describe('ok', () => {
    it('on latin word', () => expect(hasLettersLatin('abc')).to.not.be.ok);
    it('on latin words', () => expect(hasLettersLatin('abc def')).to.not.be.ok);
    it('on latin with digit', () => expect(hasLettersLatin('abc123')).to.not.be.ok);
    it('on latin with no-latin', () => expect(hasLettersLatin('abcабв')).to.not.be.ok);
  });

  describe('!ok', () => {
    it('on number', () => expect(hasLettersLatin('123')).to.be.ok);
    it('on special chars', () => expect(hasLettersLatin('!@#$%^&*(')).to.be.ok);
    it('on no-latin', () => expect(hasLettersLatin('абв')).to.be.ok);
  });
});