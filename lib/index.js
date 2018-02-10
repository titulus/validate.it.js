import * as asserts from '../asserts';

function validate (base) {
  const report = Object.create( validate.prototype );

  Object.assign(report, {
      ok: true,
      base: base,
      checks: [],
      errors: [],
  });

  return new Proxy(report, {
    get: function(target, prop) {
      if (Object.keys(asserts).includes(prop))
        return asserts[prop].bind(target, target.base);

      return target[prop];
    }
  });
};

console.log(validate().template(1,2,3))

export default validate;