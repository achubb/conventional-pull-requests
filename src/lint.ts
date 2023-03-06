import { getInput } from "@actions/core";
import commitlintLoad from "@commitlint/load";
import commitlintLint from "@commitlint/lint";
import commitlintFormat from "@commitlint/format";
import { LintOutcome, ParserOptions } from "@commitlint/types";

/**
 * @param {string} message Pull Request Title
 * @param {string} configFile path to commitlint config file
 * @returns the result from `@commitlint/lint()`
 */
export async function lint(
	message: string,
	configFile?: string
): Promise<LintOutcome> {
	const config = await commitlintLoad({}, { file: configFile });

	return commitlintLint(
		message,
		config.rules,
		config.parserPreset
			? { parserOpts: config.parserPreset.parserOpts as ParserOptions }
			: {}
	);
}

/**
 *
 * @param {Object} lintResult raw results from `@commitlint/lint()`
 * @returns outcome messages coming from `@commitlint/lint`
 */
export function formatResult(lintResult: LintOutcome): string {
	const options: { helpUrl?: string } = {};
	const helpUrl = getInput("helpUrl", { required: false });
	if (helpUrl) {
		options.helpUrl = helpUrl;
	}

	return commitlintFormat(
		{
			results: [
				{
					warnings: lintResult.warnings,
					errors: lintResult.errors,
					input: lintResult.input,
				},
			],
		},
		options
	);
}
