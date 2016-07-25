const eslint = require('eslint/lib/cli');
const fs = require('fs');
const spawn = require('child_process').spawn;

const bin = `${__dirname}/../node_modules/.bin`;
const istanbul = `${bin}/istanbul`;

const mochaOpts = ['--compilers', `js:${__dirname}/../src/babel-register`];
const eslintOpts = [];

module.exports.lint = (dir, { watch, fix, ignore, config }) => {
  const opts = eslintOpts.slice();

  if (fix === true) {
    opts.push('--fix');
  }

  if (config) {
    opts.push('-c', config);
  } else {
    opts.push('-c', `${__dirname}/../.eslintrc`);
  }


  if (ignore) {
    opts.push('--ignore-path', ignore);
  } else {
    opts.push('--ignore-path', `${__dirname}/../.eslintignore`);
  }

  opts.push(dir);

  const execute = () => eslint.execute(opts.join(' '));
  execute();
  if (watch === true) {
    fs.watch(dir, () => {
      execute();
    });
  }
};

module.exports.test = (dir, watch = false) => {
  const opts = mochaOpts.slice();
  if (watch === true) {
    opts.push('--watch');
  }
  opts.push(dir);
  spawn(mocha, opts, { stdio: 'inherit' });
};

module.exports.coverage = dir => {
  spawn(istanbul, ['cover', mocha, '--'].concat(mochaOpts, [dir]), { stdio: 'inherit' });
};
