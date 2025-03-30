import chalk from "chalk";

const logger = {
  success: (message: string, print?: true) => {
    const content = chalk.green.bold(`${message}`)
    if (print) console.log(content);
    return content;
  },
  error: (message: string, print?: true) => {
    const content = chalk.red.bold(`${message}`)
    if (print) console.log(content);
    return content
  },
  warning: (message: string, print?: true) => {
    const content = chalk.yellow.bold(`${message}`)
    if (print) console.log(content);
    return content
  },
  info: (message: string, print?: true) => {
    const content = chalk.blue.bold(`${message}`)
    if (print) console.log(content);
    return content
  },
  debug: (message: string, print?: true) => {
    const content = chalk.magenta.bold(`${message}`)
    if (print) console.log(content);
    return content
  },
  chain() {

  }
};

export default logger;