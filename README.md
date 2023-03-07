<h1 align="center">Conventional Pull Requests</h1>

<p align="center">A Github action which will automatically lint your Pull Request titles to ensure that conform to <a href="https://www.conventionalcommits.org/" target="_blank">conventional commit standards</a>.</p>

<p align="center">
  <img alt="Style: Prettier" src="https://img.shields.io/badge/style-prettier-21bb42.svg" />
  <img alt="TypeScript: Strict" src="https://img.shields.io/badge/typescript-strict-21bb42.svg" />
</p>

## How to use

This action can be run on any repo where you require pull request titles to meet conventional commit standards. Conventional pull request titles dovetails into [Semantic Versioning](https://semver.org/), whereby each pull request title details the type of update being made to the project. The type of the pull request can help to calculate the semantic version number.

Create a new workflow action, you can specify particular branches or pull request types that the action will be run on. Note that we need to install `@commitlint/config-conventional`, which is the config we are using to enforce our conventional PR messages.

```yaml
name: Pull Request Check

on:
    pull_request_target:
        types: [opened, edited, synchronize]
        branches: [main, beta]

jobs:
    check_pr:
        name: Conventional PR Check
        runs-on: ubuntu-latest

        steps:
            - name: Checkout
              uses: actions/checkout@v3

            - name: Install Commitlint Config
              run: npm install --no-save @commitlint/config-conventional

            - name: Conventional PR Check
              uses: achubb/conventional-pull-requests@v0.0.29
```

## Writing conventional pull request titles

1. Commits MUST be prefixed with a type, which is normally of a noun, `feat`, `fix`, etc., followed by a colon and a space.
2. The type `feat` MUST be used when a commit adds a new feature to your application or library.
3. The type `fix` MUST be used when a commit represents a bug fix for your application.
4. An optional scope MAY be provided after a type. A scope is a phrase describing a section of the codebase enclosed in parenthesis, e.g., `fix(parser):`
5. A description MUST immediately follow the type/scope prefix. The description is a short description of the code changes, e.g., `fix: array parsing issue when multiple spaces were contained in string`.
6. Breaking changes MUST be indicated at the very beginning of the footer or body section of a commit. A breaking change MUST consist of the uppercase text `BREAKING CHANGE`, followed by a colon and a space.
7. A description MUST be provided after the `BREAKING CHANGE: `, describing what has changed about the API, e.g., `BREAKING CHANGE: environment variables now take precedence over config files`.

## Usage with semantic versioning

Well formed conventional pull request titles are an important part of the release workflow for packages. We can use the semantic-release package to automatically tag and release packages as pull requests are merged. So `fix` type pull requests will trigger a new patch version (this is the last number of the version i.e `0.0.1`, `0.0.2`, etc) and `feat` type pull requests will trigger a new minor version (this is the middle value of the version i.e. `0.1.0`, `0.2.0`, etc).

Anything with a breaking change, should trigger a new major release (this the the first value of the version i.e. `1.0.0`, `2.0.0`). This will be any pull request with `BREAKING CHANGE: ` in the body, this can be any **type** of pull request, but this will always take precedence over the pull request type.

## Pull Request types

The following types are recognized in conventional commits:

| **Type** | **Title**                | **Description**                                                                                               |     |     |
| -------- | ------------------------ | ------------------------------------------------------------------------------------------------------------- | --- | --- |
| build    | Builds                   | Changes relating to the build system.                                                                         |     |     |
| chore    | Chores                   | Catch-all type for work that doesn't fit easily into other types.                                             |     |     |
| ci       | Continuous Integrations  | Changes to CI configuration files and scripts (i.e. Github Actions).                                          |     |     |
| docs     | Documentation            | Changes relating to documentation.                                                                            |     |     |
| feat     | Features                 | Changes made to introduce new features.                                                                       |     |     |
| fix      | Bug Fixes                | Changes made to fix bugs or other issues.                                                                     |     |     |
| perf     | Performance Improvements | Changes made relating to performance improvements, but otherwise doesn't change functionality.                |     |     |
| refactor | Refactor                 | Changes that neither fix a bug nor introduce a feature.                                                       |     |     |
| revert   | Reverts                  | Reverts to a previous commit.                                                                                 |     |     |
| style    | Styles                   | Changes that do not affect the functionality of the code (white-space, formatting, missing semi-colons, etc). |     |     |
| test     | Tests                    | Changes relating to testing.                                                                                  |     |     |

These types can also be used in commit messages to help to easily identify the types of changes being made, although this linter will only lint pull request messages.
