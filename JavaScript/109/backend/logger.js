module.exports = (info, message) => {
  ('\x1b[33m%s\x1b[0m', `-------> [${info}] ${message}`);
}