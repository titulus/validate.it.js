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

const extend = (name, assert) => {
  validate.prototype[name] = runAssertAsMethod(name, assert)
};

for (const name in asserts) {
  const assert = asserts[name];
  extend(name, assert);
};

module.exports = validate;
module.exports.extend = extend;