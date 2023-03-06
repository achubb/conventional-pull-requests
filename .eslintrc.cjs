module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "github", "jest"],
	ignorePatterns: ["dist/**/*", "lib/**/*", "node_modules/**/*"],
	rules: {
		"linebreak-style": ["error", "unix"],
		semi: ["error", "always"],
	},
};
