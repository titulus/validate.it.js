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

  describe('returned', () => {
    it('.string', () => expect(hasLettersLatin('абв123').string).to.equal('абв123'));
    it('.subStrings', () => {
      const result = hasLettersLatin('абв123');
      expect(result).to.have.ownPropertyDescriptor('subStrings');
      expect(JSON.stringify(result.subStrings)).to.equal('["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]');
    });
    it('.found === false', () => expect(hasLettersLatin('абв123').found).to.be.false);
    it('.message', () => expect(hasLettersLatin('абв123').message).to.be.ok);
  });
});