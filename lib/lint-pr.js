"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lintPR = void 0;
const load_1 = __importDefault(require("@commitlint/load"));
const lint_1 = __importDefault(require("@commitlint/lint"));
function selectParserOpts(parserPreset) {
    if (typeof parserPreset !== 'object') {
        return null;
    }
    if (typeof parserPreset.parserOpts !== 'object') {
        return null;
    }
    return parserPreset.parserOpts;
}
function getLintOptions(config) {
    const opts = {
        parserOpts: {},
        plugins: {},
        ignores: [],
        defaultIgnores: true
    };
    if (config.parserPreset) {
        const parserOpts = selectParserOpts(config.parserPreset);
        if (parserOpts)
            opts.parserOpts = parserOpts;
    }
    if (config.plugins) {
        opts.plugins = config.plugins;
    }
    if (config.ignores) {
        opts.ignores = config.ignores;
    }
    if (!config.defaultIgnores) {
        opts.defaultIgnores = false;
    }
    return opts;
}
function lintPR(title, configurationPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = yield (0, load_1.default)({}, { file: configurationPath, cwd: process.cwd() });
        const options = getLintOptions(config);
        const result = yield (0, lint_1.default)(title, config.rules, options);
        if (result.valid)
            return;
        const errorMessage = result.errors.map(({ message, name }) => `${name}:${message}`).join('\n');
        throw new Error(errorMessage);
    });
}
exports.lintPR = lintPR;
