module.exports = (base, lengthRequired) => {
  if (typeof lengthRequired !== 'number') {
    throw new Error('lengthRequired must be a valid number');
  }

  const string = String(base);

  const length = string.length;

  if (length === lengthRequired) {
    return;
  }
  
  return {
    string,
    length,
    lengthRequired,
    message: `length of "${string}" is not equal to ${lengthRequired}`,
  };
};