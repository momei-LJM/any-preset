import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/tsconfig.ts"],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
});
