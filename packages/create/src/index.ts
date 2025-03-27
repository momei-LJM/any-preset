#!/usr/bin/env node
import { parseDep } from "./parse";
import { program } from "commander";


program.name("@momei-x/create").description("@momei-x/create cli");
program
  .command("create-preset")
  .description("create preset")
  .option("-ts --typescript", "typescipt")
  .option("-eslint --eslint", "eslint")
  .option("-prettier --prettier", "prettier")
  .option("-stylelint --stylelint", "stylelint")
  .action(({ typescript, eslint, prettier, stylelint }) => {
    if (typescript) {
      parseDep("typescript");
    } else if (eslint) {
      parseDep("eslint");
    } else if (stylelint) {
      parseDep("stylelint");
    } else if (prettier) {
      parseDep("prettier");
    }
  });

program.parse();
