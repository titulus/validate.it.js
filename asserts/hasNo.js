module.exports = (base, ...args) => {
  if (args.length === 0)
    throw new Error('at least 1 substring must be specified');

  const string = '' + base;
  const subStrings = args.map(argument => '' + argument);

  for (const subString of subStrings) {
    if (!string.includes(subString))
      return;
  };
  
  return {
    string,
    subStrings,
    found: true,
    message: `every of ${JSON.stringify(subStrings)} found in "${string}"`,
  };
};