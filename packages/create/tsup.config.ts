import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
  format: ["esm"],
  target: "esnext",
  onSuccess: "npx tsx scripts/postbuild.ts"
  // platform: 'node'
});
