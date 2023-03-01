/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as core from "@actions/core"
import * as github from "@actions/github"
import { lint, formatResult } from './lint';


async function run(): Promise<void> {
    const title = github.context.payload.pull_request?.title;
    const configFile = core.getInput('commitlintConfigFile');

    core.info(`Checking if the title of this PR "${title}" meets the requirements ...`);

    try {
        const lintResult = await lint(title, configFile);
        if (!lintResult.valid) {
            core.setFailed(`\n ${formatResult(lintResult)}`);
        } else {
            core.info('✔️ All good');
        }
    } catch (error) {
        core.setFailed(error as Error);
    }
}



void run()

