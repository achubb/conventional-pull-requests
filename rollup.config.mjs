import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import json from "@rollup/plugin-json";

// const packageJson = require("./package.json");
import packageJson from "./package.json" assert { type: "json" };

export default [
	{
		input: "src/main.ts",
		output: [
			{
				file: packageJson.main,
				format: "cjs",
				sourcemap: true,
			},
			{
				file: packageJson.module,
				format: "esm",
				sourcemap: true,
			},
		],
		plugins: [
            json(),
			resolve(),
			commonjs(),
			typescript({ tsconfig: "./tsconfig.json" }),
		],
	},
	{
		input: "dist/esm/types/main.d.ts",
		output: [{ file: "dist/main.d.ts", format: "esm" }],
		plugins: [dts()]
	},
];