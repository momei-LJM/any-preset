#!/usr/bin/env node
import { program } from "commander";
import { parseDep } from "./parse";


program.description("@momei-x/create cli");
program
  .command("create")
  .description("create preset")
  .option("--typescript", "typescipt")
  .option("--eslint", "eslint")
  .option("--prettier", "prettier")
  .option("--stylelint", "stylelint")
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
