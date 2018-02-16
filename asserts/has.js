module.exports = (base, ...args) => {
  if (args.length === 0)
    throw new Error('at least 1 substring must be specified');

  const string = '' + base;
  const subStrings = args.map(argument => '' + argument);

  let found = false;
  for (const subString of subStrings) {
    if (!string.includes(subString))
      continue;

    found = true;
    break;
  };

  if (!found)
    return {
      string,
      subStrings,
      found,
      message: `not any of ${JSON.stringify(subStrings)} found in "${string}"`,
    };

  return;
};