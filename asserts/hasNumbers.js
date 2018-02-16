const has = require('./has.js');

module.exports = base => {
  const numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ];
  const error = has(base, ...numbers);
  if (!error) {
    return;
  }

  return {
    ...error,
    message: `"${base}" has no numbers`,
  };
};