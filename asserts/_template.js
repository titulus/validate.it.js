module.exports = (base, ...args) => {
  if (args.length > 0)
    return {base, args};

  return null;
};