import prompts from "prompts";

export const promptPackageManagerSelect = () => {
  return prompts({
    type: "select",
    name: "packageManager",
    message: "Select a package manager",
    choices: [
      { title: "npm", value: "npm" },
      { title: "yarn", value: "yarn" },
      { title: "pnpm", value: "pnpm" },
    ],
    initial: 0,
  });
}