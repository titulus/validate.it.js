module.exports = (base, ...regexps) => {
  if (regexps.length === 0)
    throw new Error('at least 1 regexp must be specified');

  const string = '' + base;

  let match = false;
  const patterns = [];
  for (const regexp of regexps) {
    const pattern = '' + regexp;
    patterns.push(pattern);

    if (!regexp.test(string))
      continue;

    match = true;
    break;
  }
  if (!match)
    return {
      string,
      patterns,
      match,
      message: `"${base}" don't match any of ${JSON.stringify(patterns)}`,
    };

  return;
};