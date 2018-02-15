const has = require('./has.js');

module.exports = base => {
  const ascii_lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const ascii_uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letters = [
    ...ascii_lowercase.split(''),
    ...ascii_uppercase.split(''),
  ];
  const error = has(base, ...letters);
  if (error)
    return {
      ...error,
      message: `"${base}" has no latin letters`,
    };

  return;
};