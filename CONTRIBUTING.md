# Contributing to create-solana-dapp

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## We Develop with GitHub

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## We use [GitHub Flow](https://guides.github.com/introduction/flow/index.html), so all code changes happen through pull requests

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`.
2. Prefix your branch with your GitHub username (eg, `beeman/fix-anchor-issue` and not `fix/anchor-issue`)
3. If you've added code that should be tested, add tests.
4. If you've changed APIs, update the documentation.
5. Ensure the test suite passes.
6. Make sure your code lints.
7. Issue that pull request!

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same
[MIT License](https://choosealicense.com/licenses/mit/) that covers the project.

## Report bugs using GitHub's [issues](https://github.com/solana-foundation/templates/issues)

We use GitHub issues to track public bugs. Report a bug by
[opening a new issue](https://github.com/solana-foundation/templates/issues/new); it's that easy!

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can.
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

People _love_ thorough bug reports.

## Use a Consistent Coding Style

- Code is formatted using the prettier configuration in the project root.
- Run `pnpm format` to make sure your code is formatted correctly.

## Development Workflow

In this section, you'll find the basic commands you need to run for building, testing, and maintaining the quality of the codebase.

### Setting Up the Project

To get started with development:

```shell
pnpm install
```

### Available Commands

To see all available commands, run:

```shell
pnpm run
```

**Core Development Commands:**

- `pnpm clean` - Clean generated files and artifacts
- `pnpm generate` - Generate template files and configurations
- `pnpm format` - Format code using prettier
- `pnpm lint` - Lint code for style and quality issues
- `pnpm update-deps` - Update all dependencies to latest versions

### Code Quality

Ensure your code meets project standards:

```shell
pnpm format  # Format code
pnpm lint    # Check for issues
```

### Committing Your Changes

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for commit:

- `fix`: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in semantic versioning).
- `feat`: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in semantic
  versioning).
- `BREAKING CHANGE`: a commit that has the text BREAKING CHANGE: at the beginning of its optional body or footer section
  introduces a breaking API change (correlating with MAJOR in semantic versioning). A BREAKING CHANGE can be part of
  commits of any type.
- Others: commit types other than fix: and feat: are allowed, for example @commitlint/config-conventional (based on the
  Angular convention) recommends build:, chore:, ci:, docs:, style:, refactor:, perf:, test:, and others.

## License

By contributing, you agree that your contributions will be licensed under its MIT License.

## References

This document was adapted from the open-source contribution guidelines for
[Facebook's Draft](https://github.com/facebook/draft-js/blob/master/CONTRIBUTING.md)
