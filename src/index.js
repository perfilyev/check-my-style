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

module.exports.lint = (dir, watch=false) => {
  const execute = () => eslint.execute(`-c ${__dirname}/../.eslintrc ${dir}`);
  execute();
  if (watch === true) {
    fs.watch(dir, () => {
      execute()
    })
  } 
}

module.exports.test = (dir, watch=false) => {
  const opts = mochaOpts.slice();
  if (watch === true) {
      opts.push('--watch')
  }
  opts.push(dir)
  spawn(mocha, opts, {stdio: "inherit"});
}

module.exports.coverage = dir => {
  spawn(istanbul, ['cover', mocha, '--'].concat(mochaOpts, [dir]), {stdio: "inherit"});
}