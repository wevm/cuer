# Contributing

Thanks for your interest in contributing to Cuer! Please take a moment to review this document **before submitting a pull request.**

If you want to contribute, but aren't sure where to start, you can create a [new discussion](https://github.com/wevm/cuer/discussions).

## Rules

1. Significant changes to the API or implementation must be reviewed before a Pull Request is created. Create a [Feature Request](https://github.com/wevm/cuer/discussions/new?category=ideas) first to discuss any API changes or new ideas. 
2. Contributors must be humans, not bots.
3. Contributor GitHub Accounts must have at least one non-trivial contribution to another repository.

## Basic guide

This guide is intended to help you get started with contributing. By following these steps, you will understand the development process and workflow.

1. [Cloning the repository](#cloning-the-repository)
2. [Installing Node.js and pnpm](#installing-nodejs-and-pnpm)
3. [Installing Foundry](#installing-foundry)
4. [Installing dependencies](#installing-dependencies)
5. [Running the test suite](#running-the-test-suite)
6. [Writing documentation](#writing-documentation)
7. [Submitting a pull request](#submitting-a-pull-request)
8. [Versioning](#versioning)

---

### Cloning the repository

To start contributing to the project, clone it to your local machine using git:

```bash
git clone https://github.com/wevm/cuer.git --recurse-submodules
```

Or the [GitHub CLI](https://cli.github.com):

```bash
gh repo clone wevm/cuer -- --recurse-submodules
```

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

---

### Installing Node.js and pnpm

Cuer uses [pnpm workspaces](https://pnpm.io/workspaces) to manage multiple projects. You need to install **Node.js v22 or higher** and **pnpm v9.7.0 or higher**.

You can run the following commands in your terminal to check your local Node.js and pnpm versions:

```bash
node -v
pnpm -v
```

If the versions are not correct or you don't have Node.js or pnpm installed, download and follow their setup instructions:

- Install Node.js using [fnm](https://github.com/Schniz/fnm) or from the [official website](https://nodejs.org)
- Install [pnpm](https://pnpm.io/installation)

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

---

### Installing dependencies

Once in the project's root directory, run the following command to install the project's dependencies:

```bash
pnpm install
```

After the install completes, pnpm links packages across the project for development and [git hooks](https://github.com/toplenboren/simple-git-hooks) are set up.

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

---

### Submitting a pull request

When you're ready to submit a pull request, you can follow these naming conventions:

- Pull request titles use the [Imperative Mood](https://en.wikipedia.org/wiki/Imperative_mood) (e.g., `Add something`, `Fix something`).
- [Changesets](#versioning) use past tense verbs (e.g., `Added something`, `Fixed something`).

When you submit a pull request, GitHub will automatically lint, build, and test your changes. If you see an ❌, it's most likely a bug in your code. Please, inspect the logs through the GitHub UI to find the cause.

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

---

### Versioning

When adding new features or fixing bugs, we'll need to bump the package versions. We use [Changesets](https://github.com/changesets/changesets) to do this.

> **Note**
>
> Only changes to the codebase that affect the public API or existing behavior (e.g. bugs) need changesets.

Each changeset defines which package(s) should be published and whether the change should be a major/minor/patch release, as well as providing release notes that will be added to the changelog upon release.

To create a new changeset, run `pnpm changeset`. This will run the Changesets CLI, prompting you for details about the change. You’ll be able to edit the file after it’s created — don’t worry about getting everything perfect up front.

Even though you can technically use any markdown formatting you like, headings should be avoided since each changeset will ultimately be nested within a bullet list. Instead, bold text should be used as section headings.

If your PR is making changes to an area that already has a changeset (e.g. there’s an existing changeset covering theme API changes but you’re making further changes to the same API), you should update the existing changeset in your PR rather than creating a new one.

---

<br>

<div>
  ✅ Now you're ready to contribute to Cuer!
</div>

<div align="right">
  <a href="#advanced-guide">&uarr; back to top</a></b>
</div>

