module.exports = (base, ...args) => {
  if (args.length === 0) {
    throw new Error('at least 1 substring must be specified');
  }

  const string = '' + base;
  const subStrings = args.map(argument => '' + argument);

  const found = subStrings.some(subString => string.includes(subString));
  if (found) {
    return;
  }

  return {
    string,
    subStrings,
    found,
    message: `not any of ${JSON.stringify(subStrings)} found in "${string}"`,
  };

};