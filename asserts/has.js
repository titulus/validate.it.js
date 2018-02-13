const match = require('./match.js');

module.exports = (base, pattern) => {
  if (!pattern)
    throw new Error('pattern must be specified');

  const regexp = new RegExp('' + pattern);
  const error = match(base, regexp);
  if (error)
    return {
      string: base,
      pattern,
      found: false,
      message: `"${pattern}" not found in "${base}"`
    };

  return;
};