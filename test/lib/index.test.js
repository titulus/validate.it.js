var expect = require('chai').expect;
var validate = require('../../index.js');
describe('validate', () => {
  it('should be a function', () => expect(validate).to.be.a('function'));

  describe('validate()', () => {
    it('should be an object', () => expect(validate()).to.be.a('object'));
    it('should have methods from asserts', () => expect(validate()._template).to.be.a('function'));
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
        expect(JSON.stringify(validate()._template(null).errors)).to.equal('[{"path":[],"rule":"_template","details":{"args":[null],"message":"this is template assert"}}]');
        expect(JSON.stringify(validate()._template()._template(null)._template().errors)).to.equal('[{"path":[],"rule":"_template","details":{"args":[null],"message":"this is template assert"}}]');
        expect(JSON.stringify(validate()._template(1)._template(2).errors)).to.equal('[{"path":[],"rule":"_template","details":{"args":[1],"message":"this is template assert"}},{"path":[],"rule":"_template","details":{"args":[2],"message":"this is template assert"}}]');
      });
    });
  });

  describe('.extend', () => {
    it('class validate has static method .extend', () => {
      expect(validate).to.have.ownPropertyDescriptor('extend');
      expect(validate.extend).to.be.a('function');
    });
    it('create named method', () => {
      expect(validate.prototype).to.not.have.ownPropertyDescriptor('_test');
      validate.extend('_test', () => null);
      expect(validate.prototype).to.have.ownPropertyDescriptor('_test');
      expect(validate.prototype._test).to.be.a('function');
      // rest testing in runAssertAsMethod.test
    });
  });

  describe('cases', () => {
    describe('ok', () => {
      it('no asserts', () => {
        const result = validate();
        expect(result.ok).to.be.true;
        expect(result.errors).to.be.empty;
      });
      it('one assert', () => {
        const result = validate()
          ._template();
        expect(result.ok).to.be.true;
        expect(result.errors).to.be.empty;
        expect(JSON.stringify(result.asserts)).to.equal('["_template"]');
      });
      it('several assert', () => {
        const result = validate()
          ._template()
          ._template()
          ._template();
        expect(result.ok).to.be.true;
        expect(result.errors).to.be.empty;
        expect(result.asserts.length).to.equal(3);
        expect(JSON.stringify(result.asserts)).to.equal('["_template","_template","_template"]');
      });
    });
    describe('!ok', () => {
      it('one assert', () => {
        const result = validate()
          ._template(null);
        expect(result.ok).to.not.be.true;
        expect(result.errors).to.not.be.empty;
        expect(JSON.stringify(result.errors)).to.equal('[{"path":[],"rule":"_template","details":{"args":[null],"message":"this is template assert"}}]');
        expect(JSON.stringify(result.asserts)).to.equal('["_template"]');
      });
      it('several assert', () => {
        const result = validate()
          ._template(1)
          ._template()
          ._template('a');
        expect(result.ok).to.not.be.true;
        expect(result.errors).to.not.be.empty;
        expect(result.errors.length).to.equal(2);
        expect(JSON.stringify(result.errors)).to.equal('[{"path":[],"rule":"_template","details":{"args":[1],"message":"this is template assert"}},{"path":[],"rule":"_template","details":{"args":["a"],"message":"this is template assert"}}]');
        expect(result.asserts.length).to.equal(3);
        expect(JSON.stringify(result.asserts)).to.equal('["_template","_template","_template"]');
      });
    });
  });
});