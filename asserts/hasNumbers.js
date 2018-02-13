const has = require('./has.js');

module.exports = base => {
  const pattern = '\\d';
  const error = has(base,pattern);
  if (error)
    return {
      string: base,
      pattern,
      found: false,
      message: `"${base}" has no numbers`,
    };

  return;
};