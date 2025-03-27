import fs from "fs-extra";
import path from "node:path";
import {
  getPackageInfo,
  importModule,
  isPackageExists,
  resolveModule,
} from "local-pkg";
import prompts from "prompts";
import { execSync } from "node:child_process";
import chalk from "chalk";
type PresetType = "eslint" | "prettier" | "typescript" | "stylelint";

const cwd = process.cwd();
export const pkgMap = {
  eslint: {
    package: "eslint",
    preset: path.resolve(__dirname, "eslint.config.js"),
  },
  prettier: {
    package: "prettier",
    preset: path.resolve(__dirname, ".prettierrc.js"),
  },
  typescript: {
    package: "typescript",
    preset: path.resolve(__dirname, "tsconfig.json"),
  },
  stylelint: {
    package: "stylelint",
    preset: path.resolve(__dirname, "stylelint.config.ts"),
  },
  // ...
};
function detectPackageManager() {
  const userAgent = process.env.npm_config_user_agent;

  if (userAgent) {
    if (userAgent.includes("pnpm")) {
      return "pnpm";
    } else if (userAgent.includes("yarn")) {
      return "yarn";
    } else if (userAgent.includes("npm")) {
      return "npm";
    }
  }

  return "unknown";
}
export const parseDep = async (dependency: PresetType) => {
  resolvePreset(dependency);
  if (!isPackageExists(pkgMap[dependency].package)) {
    const response = await prompts({
      type: "confirm",
      name: "install",
      message: `You have not installed this "${dependency}，install it"？`,
      initial: true, // 默认值为 Yes
    });
    if (response.install) {
      try {
        // 使用 npm 安装依赖
        execSync(`${detectPackageManager()} install ${dependency}`, {
          stdio: "inherit",
        });
        console.log(chalk.bgCyan(`"${dependency}" installed success！`));
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
