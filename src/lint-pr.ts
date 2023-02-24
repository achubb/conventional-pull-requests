import { LintOptions, ParserOptions, ParserPreset, QualifiedConfig } from '@commitlint/types'
import load from '@commitlint/load'
import lint from '@commitlint/lint'


function selectParserOpts(parserPreset: ParserPreset): object | null {
    if (typeof parserPreset !== 'object') {
      return null
    }
  
    if (typeof parserPreset.parserOpts !== 'object') {
      return null
    }
  
    return parserPreset.parserOpts
  }

function getLintOptions(config: QualifiedConfig): LintOptions {
    const opts: LintOptions & {parserOpts: ParserOptions} = {
        parserOpts: {},
        plugins: {},
        ignores: [],
        defaultIgnores: true
    }

    if (config.parserPreset) {
        const parserOpts = selectParserOpts(config.parserPreset)
        if (parserOpts) opts.parserOpts = parserOpts
    }

    if (config.plugins) {
        opts.plugins = config.plugins
    }
      
    if (config.ignores) {
        opts.ignores = config.ignores
    }

    if (!config.defaultIgnores) {
        opts.defaultIgnores = false
    }
      
    return opts
}

export async function lintPR( title: string, configurationPath: string): Promise<void> {
    const config = await load({}, {file: configurationPath, cwd: process.cwd()})
    const options = getLintOptions(config)
    const result = await lint(title, config.rules, options)

    if (result.valid) return

    const errorMessage = result.errors.map(({message, name}) => `${name}:${message}`).join('\n')
    throw new Error(errorMessage);
}