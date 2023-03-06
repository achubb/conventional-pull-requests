import { lint, formatResult } from "../lint";

// Load custom commitlint config
const customCommitlintConfig = "./src/__tests__/commitlint.config.js";

// Example of a valid commit message
const validCommitMessage = "fix(scope): valid subject";

// Example of an invalid commit message
const invalidCommitMessage = "invalid commit message";

describe("lint.ts", () => {
	describe("lint", () => {
		it("should detect a valid message", async () => {
			const result = await lint(validCommitMessage);
			expect(result.valid).toBeTruthy();
		});

		it("should detect an invalid message", async () => {
			const result = await lint(
				invalidCommitMessage,
				customCommitlintConfig
			);
			expect(result.valid).toBeFalsy();
		});
	});

	describe("formatResult", () => {
		it("should return an empty string if the lint result is valid", async () => {
			const lintResult = await lint(validCommitMessage);
			expect(formatResult(lintResult)).toBe("");
		});

		it("should return a human-readable error message for invalid lint result", async () => {
			const lintResult = await lint(
				invalidCommitMessage,
				customCommitlintConfig
			);
			const formattedErrorMessage = formatResult(lintResult);
			expect(formattedErrorMessage).toMatch("subject may not be empty");
			expect(formattedErrorMessage).toMatch("type may not be empty");
			expect(formattedErrorMessage).toMatch(
				"found 2 problems, 0 warnings"
			);
		});
	});
});
