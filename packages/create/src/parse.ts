import fs from "fs-extra";
import path, { dirname } from "node:path";
import {
  getPackageInfo,
  importModule,
  isPackageExists,
  resolveModule,
} from "local-pkg";
import prompts from "prompts";
import { execSync } from "node:child_process";
import chalk from "chalk";
import { fileURLToPath } from "node:url";
import { promptPackageManagerSelect } from "./manager";
type PresetType = "eslint" | "prettier" | "typescript" | "stylelint";

const SUB_DEPS: Record<PresetType, string[]> = {
  eslint: ["eslint", "@antfu/eslint-config"],
  prettier: ["prettier"],
  typescript: ["typescript"],
  stylelint: ["stylelint"],
}

const cwd = process.cwd();



// 获取当前文件的绝对路径
const __filename = fileURLToPath(import.meta.url);


// 获取当前文件所在的目录
const __dirname = dirname(__filename);
export const pkgMap = {
  eslint: {
    package: SUB_DEPS["eslint"],
    preset: path.resolve(__dirname, "eslint.config.js"),
  },
  prettier: {
    package: SUB_DEPS["prettier"],
    preset: path.resolve(__dirname, "prettier.config.js"),
  },
  typescript: {
    package: SUB_DEPS["typescript"],
    preset: path.resolve(__dirname, "tsconfig.json"),
  },
  stylelint: {
    package: SUB_DEPS["stylelint"],
    preset: path.resolve(__dirname, "stylelint.config.js"),
  },
  // ...
};

export const parseDep = async (dependency: PresetType) => {
  resolvePreset(dependency);
  const needInstall = pkgMap[dependency].package.filter((dep) => !isPackageExists(dep));
  if (needInstall?.length) {
    const response = await prompts({
      type: "confirm",
      name: "install",
      message: `You have not installed ${dependency}，install it？`,
      initial: true, // 默认值为 Yes
    });
    if (response.install) {
      try {
        const selected = await promptPackageManagerSelect()
        const pkgManager = selected.packageManager

        const depsStr = needInstall.map((dep) => `${dep}`);
        execSync(`${pkgManager} install ${depsStr.join(" ")} -D`, {
          stdio: "inherit",
        });
        console.log(chalk.bgCyan(`"${depsStr.join('\n')}" installed success！`));
      } catch (installErr) {
        console.error(`install "${dependency}" failed：${installErr}`);
      }
    }
  }
};

const resolvePreset = (type: PresetType) => {
  const preset = pkgMap[type].preset;
  const baseName = path.basename(preset);
  fs.copyFileSync(preset, path.resolve(cwd, baseName));
  chalk.bgCyan(`"${baseName}" created.`);
};
