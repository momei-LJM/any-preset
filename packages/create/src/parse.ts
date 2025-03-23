import fs from "fs-extra";
import path from "node:path";
export const parseDep = (cwd: string) => {
  const pkgPath = path.resolve(cwd, "package.json");
  if (!fs.existsSync(pkgPath)) {
    return null;
  }
  const pkg = fs.readJSONSync(pkgPath);
  return pkg;
};
