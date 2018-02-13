const has = require('./has.js');

module.exports = base => {
  const pattern = '[A-Za-z]';
  const error = has(base,pattern);
  if (error)
    return {
      ...error,
      message: `"${base}" has no latin letters`,
    };

  return;
};