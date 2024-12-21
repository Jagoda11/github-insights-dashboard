# 🚀 React TypeScript Template

![License: Commercial](https://img.shields.io/badge/license-Commercial-pink)
![Open Issues](https://img.shields.io/github/issues/Jagoda11/react-template?style=flat-square&color=orange)
![Last Commit](https://img.shields.io/github/last-commit/Jagoda11/react-template/main?style=flat-square&color=yellow)
![Build Status](https://github.com/Jagoda11/react-template/actions/workflows/🚀ci.yml/badge.svg?branch=main)
![React](https://img.shields.io/github/package-json/dependency-version/Jagoda11/react-template/react?label=React)
![TypeScript](https://img.shields.io/github/package-json/dependency-version/Jagoda11/react-template/dev/typescript?label=TypeScript)
![Build Status](https://github.com/Jagoda11/react-template/actions/workflows/⬆️npm-upgrade.yml/badge.svg?branch=main)

## 📝 Summary

This React TypeScript template is designed for a quick start in new projects. It comes pre-configured with essential tools and libraries to streamline the development process. The template includes:

- React ⚛️ for building user interfaces.
- Babel 🐵
- TypeScript 🔵
- ESLint 🛠️
- Prettier 🖋️
- Jest 🃏
- Husky 🐶

This setup aims to provide a robust starting point, allowing you to focus on building your application without the hassle of setting up a development environment from scratch.

## 🚀 Initial Setup

First, install the project dependencies:

```bash
npm install
```

## ⚠️ Note on Commits

If you're having trouble making a commit, it might be due to the `precommit` hook, which runs the `lint` and `test` scripts before each commit. If these scripts find any errors, the commit will be blocked. Check the output for any lint or test errors and fix them before trying to commit again.

## 📜 Scripts

To run these scripts, use `npm run <script-name>`:

- `start`: 🚀 Builds the TypeScript code and starts the application.
- `build`: 🔨 Compiles the TypeScript code using the TypeScript compiler (`tsc`).
- `test`: 🧪 Runs tests using Jest and generates a coverage report.
- `format`: 🖋️ Formats the code using Prettier.
- `lint`: 🧹 Lints all JavaScript and TypeScript files in the project using ESLint.
- `precommit`: 🔒 Runs the `lint` and `test` scripts before each commit to ensure code quality. This is managed by Husky 🐶.
- `pretest`: 🔍 Lints the code before running tests.
- `watch`: 👀 Runs tests in watch mode using Jest.
- `debug`: 🐞 Starts the application in debug mode using `nodemon`.
- `clean`: 🧽 Removes the `node_modules` directory and `package-lock.json` file.
- `prepare`: 🐾 Sets up Husky for managing git hooks.

## 🤖 GitHub Actions Workflows

This template includes several GitHub Actions workflows that automate various tasks:

- `ci.yml`: Runs your project's continuous integration (CI) tasks.
- `close-merged-pull-requests.yml`: Automatically closes pull requests that have been merged.
- `close-stale-issues-and-prs.yml`: Closes stale issues and pull requests.
- `label-new-pull-requests.yml`: Automatically adds labels to new pull requests.
- `thank-contributors-on-issue-close.yml`: Thanks contributors when an issue they commented on is closed.
- `welcome-new-pull-requests.yml`: Posts a welcome message on new pull requests.
- `welcome.yml`: Posts a welcome message on new issues.
- `npm-upgrade.yml`: checks for new versions of the dependencies and updates package.json and package-lock.json, scans with
  [Debricked](https://debricked.com/) for vulnerabilities before it pushes the changes.

These workflows use the `secrets.GITHUB_TOKEN` secret, which GitHub automatically creates for every repository. You can create a personal access token and add it as a secret in your repository. For more information, see [Creating and storing encrypted secrets](https://docs.github.com/en/actions/reference/encrypted-secrets).

## 🌐 GitHub Codespaces Support

This project includes a `.devcontainer.json` file which allows you to work on this project in a Docker container using [GitHub Codespaces](https://github.com/features/codespaces). This helps to maintain a consistent development environment, making it easier for you to collaborate with others without having to worry about individual setup.

GitHub Codespaces configures your development environment based on your project's needs using this file. When you create a new codespace for this project, the Codespaces environment is automatically configured as per the settings defined in `.devcontainer.json`.

To use GitHub Codespaces:

1. Navigate to the main page of the repository.
2. Click the Code button and then click "Open with Codespaces".
3. Click "+ New codespace".

Your development environment is now set up and running in a Docker container in the cloud. All commands you run in the Codespaces terminal will be executed inside the container. Any changes you make to the project will be reflected in the container and vice versa.

## 💖 Support

If you like this hassle-free and easy setup, and if it saved you some time, please consider obtaining a commercial license and sponsoring me on [GitHub Sponsors](https://github.com/sponsors/Jagoda11). Your support is greatly appreciated and helps me continue my contributions to open source and volunteer work.

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md).
for details on our code of conduct and the process for submitting pull requests.

## 📜 Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) to keep our community approachable and respectable.

## 📝 License

This project is licensed under the terms of the Commercial License Agreement. For more details, see the [LICENSE](LICENSE.md) file.
© 2024 Jagoda11

## 📖 Related Articles

For more insights and detailed guides, check out these related articles:

- [The Power of Project Templates: Boosting Efficiency in Development](https://medium.com/code-like-a-girl/the-power-of-project-templates-boosting-efficiency-in-development-1a61cb6bcdae)
- [How to Set Up a Template Repository on GitHub](https://medium.com/new-writers-welcome/how-to-set-up-a-template-repository-on-github-0e7446a46817)
