const asserts = require('../asserts');

function validate (base) {
  const report = Object.create( validate.prototype );

  Object.assign(report, {
      ok: true,
      base: base,
      asserts: [],
      errors: [],
  });

  return report;
};

const bindAssertToMethod = (assert, name) => function(...args) {
  this.asserts.push(name);
  
  const error = assert.apply(this, [this.base, ...args]);

  if (error) {
    this.ok = false;
    this.errors.push(error);
  }
  return this;
};

for (const name in asserts) {
  const assert = asserts[name];
  validate.prototype[name] = bindAssertToMethod(assert, name);
};

module.exports = validate;