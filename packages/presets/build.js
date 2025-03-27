const { readdir, copyFile } = require("fs");
const path = require("path");
console.log(7878);

readdir(path.resolve(__dirname, "./src"), (err, files) => {
  console.log(6666, files);

  files.forEach((file) => {
    const src = path.resolve(__dirname, path.basename(file));
    const dest = path.resolve(__dirname, "./dist", file);
    console.log(src, dest);
    copyFile(src, dest, () => {});
  });
});
