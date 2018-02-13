module.exports = (base, regexp) => {
  if (!regexp)
    throw new Error('regexp must be specified');
  const valid = regexp.test('' + base);
  if (!valid)
    return {
      string: base,
      pattern: '' + regexp,
      match: false,
      message: `"${base}" don't match ${regexp}`,
    };

  return;
};