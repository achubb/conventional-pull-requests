import * as core from "@actions/core"
import * as github from "@actions/github"
import { lintPR } from "./lint-pr";

function getPrTitle(): string | undefined {
    // TODO - Tidy Up...
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const pullRequest = github.context.payload.pull_request;
    if (!pullRequest) {
        return undefined
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return pullRequest.title
}

async function run(): Promise<void> {
    try {
        const configurationPath = core.getInput('configuration-path', {required: true})
        const prTitle = getPrTitle()

        if (!prTitle) {
            core.debug('Could not get Pull Request Title')
            return
        }

        await lintPR(prTitle, configurationPath)

    } catch (error) {
        console.log(error)
    }
}

void run()