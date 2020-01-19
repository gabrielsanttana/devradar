module.exports = function parseArrayToString(string) {
  const array = string.split(",").map(item => item.trim());

  return array;
}