const error2validateReport = require('./error2validateReport.js');

const runAssertAsMethod = (name, assert) => function(...args) {
  this.asserts.push(name);
  
  const error = assert.apply(this, [this.base, ...args]);

  if (typeof error !== 'undefined') {
    this.ok = false;
    this.errors.push(
      error2validateReport(name, error)
    );
  }
  return this;
};

module.exports = runAssertAsMethod;