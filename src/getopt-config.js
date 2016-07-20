const Getopt = require('node-getopt');

const getopt = new Getopt([
  ['w', 'watch', 'Watch mode.'],
  ['f', 'fix', 'Fix mode.'],
  ['h', 'help', 'display this help'],
]);

getopt.setHelp(
  `Usage: check-my-style lint|test|coverage [OPTIONs] path
  
  lint = eslint by airbnb
  test = Mocha with babel es-2015
  coverage = Istanbul with Mocha
  
  [[OPTIONS]]
  
  Installation: npm i -g check-my-style
  Respository:  https://github.com/perfilyev/check-my-style`
);

module.exports = getopt;