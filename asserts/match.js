module.exports = (base, regexp) => {
  if (!regexp)
    throw new Error('regexp must be specified');
  const string = '' + base;
  const valid = regexp.test(string);
  if (!valid)
    return {
      string,
      pattern: '' + regexp,
      match: false,
      message: `"${base}" don't match ${regexp}`,
    };

  return;
};