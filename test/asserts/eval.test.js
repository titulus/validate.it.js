var expect = require('chai').expect;
var _eval = require('../../asserts/eval.js');
describe('asserts/eval', () => {
  it('should be a function', () => expect(_eval).to.be.a('function'));
  it('should run provided function', () => {
    let counter = 0;
    _eval('abc123', () => counter++);
    expect(counter).to.equal(1);
  });

  describe('ok', () => {
    it('on () => undefined', () => expect(_eval('abc123', () => undefined)).to.not.be.ok);
    it('on () => {/*no return*/}', () => expect(_eval('abc123', () => {/*no return*/})).to.not.be.ok);
  });

  describe('!ok', () => {
    it('on () => string', () => expect(_eval('abc123', () => 'asd')).to.equal('asd'));
    it('on () => object', () => {
      const obj = {a:1, b:2}
      expect(_eval('abc123', () => obj)).to.equal(obj);
    });
  });
});