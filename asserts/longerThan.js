module.exports = (base, lengthBeyond) => {
  if (typeof lengthBeyond !== 'number') {
    throw new Error('lengthBeyond must be a valid number');
  }

  const string = String(base);

  const length = string.length;

  if (length > lengthBeyond) {
    return;
  }
  
  return {
    string,
    length,
    lengthBeyond,
    message: `length of "${string}" is not longer than ${lengthBeyond}`,
  };
};