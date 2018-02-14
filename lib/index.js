const asserts = require('../asserts');
const runAssertAsMethod = require('./runAssertAsMethod.js');

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

for (const name in asserts) {
  const assert = asserts[name];
  validate.prototype[name] = runAssertAsMethod(assert, name);
};

module.exports = validate;