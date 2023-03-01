'use strict';

var core = require('@actions/core');
var github = require('@actions/github');
var commitlintLoad = require('@commitlint/load');
var commitlintLint = require('@commitlint/lint');
var commitlintFormat = require('@commitlint/format');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var core__namespace = /*#__PURE__*/_interopNamespaceDefault(core);
var github__namespace = /*#__PURE__*/_interopNamespaceDefault(github);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

/**
 * @param {string} message PR title or commit message
 * @param {string} configFile path to commitlint config file
 * @returns raw results from `@commitlint/lint()`
 */
function lint(message, configFile) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = yield commitlintLoad({}, { file: configFile });
        return commitlintLint(message, config.rules, config.parserPreset
            ? { parserOpts: config.parserPreset.parserOpts }
            : {});
    });
}
/**
 *
 * @param {Object} lintResult raw results from `@commitlint/lint()`
 * @returns string with human-readable error message
 */
function formatResult(lintResult) {
    const options = {};
    const helpUrl = core.getInput('helpUrl', { required: false });
    if (helpUrl) {
        options.helpUrl = helpUrl;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return commitlintFormat({
        results: [
            {
                warnings: lintResult.warnings,
                errors: lintResult.errors,
                input: lintResult.input,
            },
        ],
    }, options);
}

function run() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const title = (_a = github__namespace.context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.title;
        const configFile = core__namespace.getInput('commitlintConfigFile');
        core__namespace.info(`Checking if the title of this PR "${title}" meets the requirements ...`);
        try {
            const lintResult = yield lint(title, configFile);
            if (!lintResult.valid) {
                core__namespace.setFailed(`\n ${formatResult(lintResult)}`);
            }
            else {
                core__namespace.info('✔️ All good');
            }
        }
        catch (error) {
            core__namespace.setFailed(error);
        }
    });
}
void run();
