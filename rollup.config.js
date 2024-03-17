import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import { wasm } from "@rollup/plugin-wasm";

export default {
  input: "src/index.js",
  output: {
    dir: "dist",
    format: "es",
  },
  plugins: [
    resolve(),
    terser({
      ecma: 2020,
      module: true,
      warnings: true,
    }),
    wasm(),
  ],
};
