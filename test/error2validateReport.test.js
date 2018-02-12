var expect = require('chai').expect;
var error2validateReport = require('../lib/error2validateReport.js');
describe('error2validateReport', () => {
  it('should be a function', () => expect(error2validateReport).to.be.a('function'));
  it('should throw an error if called without rule and error', () => {
    expect(() => error2validateReport()).to.throw();
    expect(() => error2validateReport('asd')).to.throw();
  });
  it('should throw an error if called with nonString rule', () => {
    expect(() => error2validateReport(true, 'error')).to.throw();
    expect(() => error2validateReport(123, 'error')).to.throw();
    expect(() => error2validateReport({}, 'error')).to.throw();
    expect(() => error2validateReport([], 'error')).to.throw();
  });
  it('should throw an error if called with empty string as rule', () => expect(() => error2validateReport('', 'error')).to.throw());
  it('should return object', () => expect(error2validateReport('rule', 'error')).to.be.a('object'));

  describe('validate report', () => {
    describe('.path', () => {
      it('should have path property', () => expect(error2validateReport('rule', 'error')).to.have.ownPropertyDescriptor('path'));
      it('path property is array', () => expect(error2validateReport('rule', 'error').path).to.be.a('array'));
      it('path property is empty array', () => expect(error2validateReport('rule', 'error').path).to.be.empty);
    });
    describe('.rule', () => {
      it('should have rule property', () => expect(error2validateReport('rule', 'error')).to.have.ownPropertyDescriptor('rule'));
      it('rule property equal to first argument', () => expect(error2validateReport('test', 'error').rule).to.equal('test'));
    });
    describe('.details', () => {
      it('should have details property', () => expect(error2validateReport('rule', 'error')).to.have.ownPropertyDescriptor('details'));
      it('details property is object in any cases', () => {
        expect(error2validateReport('rule', 'error').details).to.be.a('object');
        expect(error2validateReport('rule', {message: 'error'}).details).to.be.a('object');
        expect(error2validateReport('rule', ['error']).details).to.be.a('object');
        expect(error2validateReport('rule', 123).details).to.be.a('object');
        expect(error2validateReport('rule', true).details).to.be.a('object');
        expect(error2validateReport('rule', null).details).to.be.a('object');
      });
      it('error object return as is', () => expect(JSON.stringify(error2validateReport('rule', {message: 'error'}).details)).to.equal('{"message":"error"}'));
      it('error string converts to object', () => expect(JSON.stringify(error2validateReport('rule', 'error').details)).to.equal('{"message":"error"}'));
    });
  });
});