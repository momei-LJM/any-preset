import { execSync } from "node:child_process";
import path, { dirname } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
import {
  isPackageExists
} from "local-pkg";
import prompts from "prompts";
import logger from "./log";
import { promptPackageManagerSelect } from "./manager";

type PresetType = "eslint" | "prettier" | "typescript" | "stylelint";

const SUB_DEPS: Record<PresetType, string[]> = {
  eslint: ["eslint", "@antfu/eslint-config", "eslint-config-prettier/flat"],
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
    package: SUB_DEPS.eslint,
    preset: path.resolve(__dirname, "eslint.config.js"),
  },
  prettier: {
    package: SUB_DEPS.prettier,
    preset: path.resolve(__dirname, "prettier.config.js"),
  },
  typescript: {
    package: SUB_DEPS.typescript,
    preset: path.resolve(__dirname, "tsconfig.json"),
  },
  stylelint: {
    package: SUB_DEPS.stylelint,
    preset: path.resolve(__dirname, "stylelint.config.js"),
  },
  // ...
};

function isMonorepo() {
  const workspaceFile = path.join(process.cwd(), 'pnpm-workspace.yaml');
  return fs.existsSync(workspaceFile);
}

export async function parseDep(dependency: PresetType) {
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
        execSync(`${pkgManager} install ${depsStr.join(" ")} -D ${isMonorepo() ? "-w" : ""}`, {
          stdio: "inherit",
        });
        logger.success(`${depsStr.join('\n')} installed success！`)
      } catch (installErr) {
        console.error(`install "${dependency}" failed：${installErr}`);
      }
    }
  }
}

function resolvePreset(type: PresetType) {
  const preset = pkgMap[type].preset;
  const baseName = path.basename(preset);
  fs.copyFileSync(preset, path.resolve(cwd, baseName));
  logger.success(`${baseName} created.`)
}
