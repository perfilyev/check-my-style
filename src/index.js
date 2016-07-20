const eslint = require('eslint/lib/cli');
const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;
const gulp = require('gulp');

const bin = `${__dirname}/../node_modules/.bin`;
const mocha = `${bin}/_mocha`;
const istanbul = `${bin}/istanbul`;

const mochaOpts = [`--compilers`, `js:${__dirname}/../src/babel-register`];
const eslintOpts = ['-c', `${__dirname}/../.eslintrc`];

module.exports.lint = (dir, watch=false, fix=false) => {
  console.log('Lint');
  const opts = eslintOpts.slice();
  
  if (fix === true) {
    opts.push('--fix');
  }
  
  opts.push(dir);
  
  const execute = () => eslint.execute(opts.join(' '));
  execute();
  if (watch === true) {
    fs.watch(dir, () => {
      execute()
    })
  } 
}

module.exports.test = (dir, watch=false) => {
  console.log('Test')
  const opts = mochaOpts.slice();
  if (watch === true) {
      opts.push('--watch')
  }
  opts.push(dir)
  spawn(mocha, opts, {stdio: "inherit"});
}

module.exports.coverage = dir => {
  console.log('Coverage')
  spawn(istanbul, ['cover', mocha, '--'].concat(mochaOpts, [dir]), {stdio: "inherit"});
}