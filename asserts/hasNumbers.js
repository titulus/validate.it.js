module.exports = (base, ...args) => {
  const valid = /\d/.test('' + base);
  if (!valid)
    return `${base} has no Numbers`;

  return;
};