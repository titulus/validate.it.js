var expect = require('chai').expect;
var validate = require('../lib');
describe('validate', () => {
  it('should be a function', () => expect(validate).to.be.a('function'));

  describe('validate()', () => {
    it('should be an object', () => expect(validate()).to.be.a('object'));
    describe('.base', () => {
      it('should be own property', () => expect(validate()).to.have.ownPropertyDescriptor('base'));
      it('should be same as first argument', () => {
        expect(validate().base).to.be.undefined;
        expect(validate(1).base).to.equal(1);
        expect(validate('string').base).to.equal('string');
        const base = {};
        expect(validate(base).base).to.equal(base);
      });
    });
    describe('.ok', () => {
      it('should be own property', () => expect(validate()).to.have.ownPropertyDescriptor('ok'));
      it('should be true if no asserts called', () => {
        expect(validate().ok).to.be.true;
        expect(validate(1).ok).to.be.true;
        expect(validate('string').ok).to.be.true;
      });
    });
    describe('.asserts', () => {
      it('should be own property', () => expect(validate()).to.have.ownPropertyDescriptor('asserts'));
      it('should be an array', () => expect(validate().asserts).to.be.a('array'));
      it('should be empty if no asserts called', () => expect(validate().asserts).to.be.empty);
      it('should be filled with called asserts', () => {
        expect(JSON.stringify(validate()._template().asserts)).to.equal('["_template"]');
        expect(JSON.stringify(validate()._template()._template().asserts)).to.equal('["_template","_template"]');
        expect(JSON.stringify(validate()._template()._template(1,2,3).asserts)).to.equal('["_template","_template"]');
      });
    });
    describe('.errors', () => {
      it('should be own property', () => expect(validate()).to.have.ownPropertyDescriptor('errors'));
      it('should be an array', () => expect(validate().errors).to.be.a('array'));
      it('should be empty if no errors in asserts', () => {
        expect(validate().errors).to.be.empty;
        expect(validate()._template().errors).to.be.empty;
        expect(validate()._template()._template().errors).to.be.empty;
      });
      it('should be filled with errors', () => {
        expect(JSON.stringify(validate()._template(null).errors)).to.equal('[{"args":[null]}]');
        expect(JSON.stringify(validate()._template()._template(null)._template().errors)).to.equal('[{"args":[null]}]');
        expect(JSON.stringify(validate()._template(1)._template(2).errors)).to.equal('[{"args":[1]},{"args":[2]}]');
      });
    });
    



    it('should have methods from asserts', () => expect(validate()._template).to.be.a('function'));

  });
});