const match = require('./match.js');

module.exports = (base, pattern) => {
  if (!pattern)
    throw new Error('pattern must be specified');

  const regexp = new RegExp('' + pattern);
  const found = regexp.test('' + base);
  if (found)
    return {
      string: base,
      pattern,
      found: true,
      message: `"${pattern}" found in "${base}"`,
    };

  return;
};