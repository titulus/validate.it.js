const has = require('./has.js');

module.exports = base => {
  const letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  const error = has(base, ...letters);
  if (error)
    return {
      ...error,
      message: `"${base}" has no latin letters`,
    };

  return;
};