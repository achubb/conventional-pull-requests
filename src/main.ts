import * as core from "@actions/core";
import * as github from "@actions/github";
import { lint, formatResult } from "./lint";

(async function run() {
	const title = github.context.payload.pull_request?.title;
	const configFile = core.getInput("commitlintConfigFile");

	core.info(
		`Checking the PR message: "${title}" to see if it conforms to conventional commit standards ...`
	);

	try {
		const lintResult = await lint(title, configFile);
		if (!lintResult.valid) {
			core.setFailed(`\n ${formatResult(lintResult)}`);
		} else {
			core.info("✔️ All good");
		}
	} catch (error) {
		core.setFailed(error as Error);
	}
})();
