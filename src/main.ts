import * as core from "@actions/core"
import * as github from "@actions/github"
import { lint, formatResult } from './lint';

function getPrTitle(): string | undefined {
    let prTitle: string | undefined

    if(github.context.payload.pull_request && github.context.payload.title) {
        prTitle = github.context.payload.pull_request.title as string
    } else {
        prTitle = undefined
    }
    return prTitle
}

async function run(): Promise<void> {
    const title = getPrTitle()
    const configFile = core.getInput('commitlintConfigFile');

    core.info(`Checking if the title of this PR "${title ?? ""}" meets the requirements ...`);

    if (title) {
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
}



void run()