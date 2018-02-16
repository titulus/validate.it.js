module.exports = (base, ...args) => {
  if (args.length === 0)
    throw new Error('at least 1 substring must be specified');

  const string = '' + base;
  const subStrings = args.map(argument => '' + argument);

  const founded = [];
  for (const subString of subStrings) {
    const position = string.indexOf(subString);

    if (position === -1)
      return;

    founded.push({subString, position});
  };
  
  return {
    string,
    subStrings,
    founded,
    found: true,
    message: `${JSON.stringify(founded.map(({substring}) => substring))} found in "${string}"`,
  };
};