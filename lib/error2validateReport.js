module.exports = (rule, error) => {
  if (typeof rule === 'undefined')
    throw new Error('rule is required');
  if (typeof rule !== 'string')
    throw new Error('rule must be a string');
  if (rule === '')
    throw new Error('rule should not be empty');

  if (typeof error === 'undefined')
    throw new Error('error is required');

  if (typeof error === 'string')
    error = {message: error};

  const details = Object.assign({}, error);

  return {
    path: [],
    rule,
    details,
  }
};