const Getopt = require('node-getopt');

const getopt = new Getopt([
  ['l', 'lint', 'Eslint check.'],
  ['h', 'help', 'display this help'],
]);

getopt.setHelp(
  'Usage: check-my-style [OPTIONs] path-to-dir\n' +
  '\n' +
  '[[OPTIONS]]\n' +
  '\n' +
  'Installation: npm i -g check-my-style\n' +
  'Respository:  https://github.com/perfilyev/check-my-style'
);

module.exports = getopt;