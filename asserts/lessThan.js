module.exports = (base, lengthBeyond) => {
  if (typeof lengthBeyond !== 'number') {
    throw new Error('lengthBeyond must be a valid number');
  }

  if (lengthBeyond === 0) {
    throw new Error('the length of the string can not be negative');
  }

  const string = String(base);

  const length = string.length;

  if (length < lengthBeyond) {
    return;
  }
  
  return {
    string,
    length,
    lengthBeyond,
    message: `length of "${string}" is not less than ${lengthBeyond}`,
  };
};