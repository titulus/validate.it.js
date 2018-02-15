const match = require('./match.js');

module.exports = (base, ...subStrings) => {
  if (subStrings.length === 0)
    throw new Error('at least 1 substring must be specified');

  const string = '' + base;

  let found = false;
  const founded = [];
  for (const subString of subStrings) {
    const position = string.indexOf(subString);
    if (position === -1)
      continue;

    found = true;
    founded.push({subString, position});
  };

  if (found)
    return {
      string,
      subStrings,
      founded,
      found,
      message: `${JSON.stringify(founded.map(({substring}) => substring))} found in "${string}"`,
    };

  return;
};