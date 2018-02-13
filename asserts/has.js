module.exports = (base, pattern) => {
  if (!pattern)
    throw new Error('pattern must be specified');
  const regexp = new RegExp('' + pattern);
  const valid = regexp.test('' + base);
  if (!valid)
    return `${base} has no Numbers`;

  return;
};