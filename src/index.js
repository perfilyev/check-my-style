const eslint = require('eslint/lib/cli');

module.exports.lint = (dir) => {
    eslint.execute(`-c ${__dirname}/../.eslintrc ${dir}`);
}