var expect = require('chai').expect;
var runAssertAsMethod = require('../../lib/runAssertAsMethod.js');
describe('runAssertAsMethod', () => {
  it('should be a function', () => expect(runAssertAsMethod).to.be.a('function'));
  it('should return function', () => expect(runAssertAsMethod('name', () => {})).to.be.a('function'));
  describe('returned function', () => {
    it('should push name to this.asserts', () => {
      const method = runAssertAsMethod('testAssert', () => {});
      const _this = {asserts: [1,2,3]};
      method.call(_this);
      expect(_this.asserts.length).to.equal(4);
      expect(_this.asserts[3]).to.equal('testAssert');
    });
    it('should call assert (second argument)', () => {
      let counter = 0;
      const method = runAssertAsMethod('testAssert', () => {counter++});
      const _this = {asserts: []};
      method.call(_this);
      expect(counter).to.equal(1);
    });
    it('should call assert with this.base as first argument', () => {
      let _base;
      const method = runAssertAsMethod('testAssert', base => {_base = base});
      const _this = {asserts: [], base: 'testBase'};
      method.call(_this);
      expect(_base).to.equal('testBase');
    });
    it('should call assert with rest arguments after base', () => {
      let test = {};
      const method = runAssertAsMethod('testAssert', (base, a,b,c) => {Object.assign(test, {a,b,c})});
      const _this = {asserts: [], base: 'testBase'};
      method.apply(_this,[1,2,3]);
      expect(JSON.stringify(test)).to.equal('{"a":1,"b":2,"c":3}');
    });
    it('should not modify anything else but .asserts in this if assert returns undefined', () => {
      const method = runAssertAsMethod('testAssert', () => undefined);
      const _this = {asserts: []};
      method.call(_this);
      expect(JSON.stringify(_this)).to.equal('{"asserts":["testAssert"]}');
    });
    it('should set this.ok=false if assert returns something', () => {
      const methodReturnsString = runAssertAsMethod('testAssert', () => 'something');
      const _this1 = {asserts: [], errors: []};
      methodReturnsString.call(_this1);
      expect(_this1.ok).to.be.false;

      const methodReturnsObject = runAssertAsMethod('testAssert', () => 'something');
      const _this2 = {asserts: [], errors: [], ok: true};
      methodReturnsObject.call(_this2);
      expect(_this2.ok).to.be.false;
    });
    it('should push validation report to this.errors', () => {
      const method = runAssertAsMethod('testAssert', () => true);
      const _this = {asserts: [], errors: [1,2,3]};
      method.call(_this);
      expect(_this.errors.length).to.equal(4);
      expect(_this.errors[3]).to.have.all.keys('path', 'rule', 'details');
      // rest test in error2validateReport.test.js
    });
  });
});