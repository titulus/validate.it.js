module.exports = (base, ...regexps) => {
  if (regexps.length === 0) {
    throw new Error('at least 1 regexp must be specified');
  }

  const string = '' + base;

  const patterns = regexps.map(regexp => '' + regexp);

  const match = regexps.some(regexp => regexp.test(string));

  if (match) {
    return;
  }

  return {
    string,
    patterns,
    match,
    message: `"${base}" don't match any of ${JSON.stringify(patterns)}`,
  };
};