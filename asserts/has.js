const match = require('./match.js');

module.exports = (base, pattern) => {
  if (!pattern)
    throw new Error('pattern must be specified');

  const baseString = '' + base;

  const found = baseString.includes(pattern);
  if (!found)
    return {
      string: base,
      pattern,
      found: false,
      message: `"${pattern}" not found in "${base}"`,
    };

  return;
};