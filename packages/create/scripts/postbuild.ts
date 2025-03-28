import fs from "fs-extra";
import path from "path";
import fg from "fast-glob";
const postbuild = async () => {
  const fileList = await fg.glob(
    ["src/presets/*.{js,ts,json}"],
    {
      cwd: process.cwd(),
      absolute: true,
      onlyFiles: true,
      dot: true,
    }
  );
  fileList.forEach((file) => {
    const baseName = path.basename(file);
    fs.copyFileSync(file, path.resolve("./dist", baseName));
  });
};

postbuild();
