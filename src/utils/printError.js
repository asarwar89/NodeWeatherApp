const chalk = require('chalk');

const printError = (errorMsg) => {
    console.log(chalk.red.bold(errorMsg));
}

module.exports = printError;