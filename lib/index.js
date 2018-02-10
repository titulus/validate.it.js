import * as asserts from '../asserts';

function validate (base) {
  const report = Object.create( validate.prototype );

  Object.assign(report, {
      ok: true,
      base: base,
      checks: [],
      errors: [],
  });

  return report;
};

for (const assert in asserts) {
  validate.prototype[assert] = function(...args) {
    this.checks.push(assert);
    const error = asserts[assert].apply(this, [this.base, ...args]);
    if (error) {
      this.ok = false;
      this.errors.push(error);
    }
    return this;
  };
};

export default validate;