# How to Contribute

SVGR is a small project, it is widely used but has not a lot of contributors. We're still working out the kinks to make contributing to this project as easy and transparent as possible, but we're not quite there yet. Hopefully this document makes the process for contributing clear and answers some questions that you may have.

## [Code of Conduct](https://github.com/gregberge/svgr/blob/master/CODE_OF_CONDUCT.md)

We expect project participants to adhere to our Code of Conduct. Please read [the full text](https://github.com/gregberge/svgr/blob/master/CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

## Open Development

All work on SVGR happens directly on [GitHub](/). Both core team members and external contributors send pull requests which go through the same review process.

### Online one click Setup

You can use Gitpod(An Online Open Source VS Code like IDE which is free for Open Source) for contributing online. With a single click it will start a workspace and automatically:

- clone the `svgr` repo.
- install all the dependencies in `/` and `/website`.
- run `yarn dev` in `/`.
- run `yarn dev` in `/website` to start the dev server.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/from-referrer/)

### Workflow and Pull Requests

_Before_ submitting a pull request, please make sure the following is done…

1.  Fork the repo and create your branch from `master`. A guide on how to fork a repository: https://help.github.com/articles/fork-a-repo/

    Open terminal (e.g. Terminal, iTerm, Git Bash or Git Shell) and type:

    ```sh-session
    $ git clone https://github.com/<your_username>/svgr
    $ cd svgr
    $ git checkout -b my_branch
    ```

    Note: Replace `<your_username>` with your GitHub username

2.  SVGR uses [Yarn](https://code.fb.com/web/yarn-a-new-package-manager-for-javascript/) for running development scripts. If you haven't already done so, please [install yarn](https://yarnpkg.com/en/docs/install).

3.  Run `yarn install`. On Windows: To install [Yarn](https://yarnpkg.com/en/docs/install#windows-tab) on Windows you may need to download either node.js or Chocolatey<br />

    ```sh
    yarn install
    ```

    To check your version of Yarn and ensure it's installed you can type:

    ```sh
    yarn --version
    ```

4.  If you've added code that should be tested, add tests. You can use watch mode that continuously transforms changed files to make your life easier.

    ```sh
    # in the background
    yarn run dev
    ```

5.  If you've changed APIs, update the documentation.

6.  Ensure the linting is good via `yarn lint`.

    ```sh-session
    $ yarn lint
    ```

7.  Ensure the test suite passes via `yarn test`.

    ```sh-session
    $ yarn test
    ```

## Bugs

### Where to Find Known Issues

We will be using GitHub Issues for our public bugs. We will keep a close eye on this and try to make it clear when we have an internal fix in progress. Before filing a new issue, try to make sure your problem doesn't already exist.

### Reporting New Issues

The best way to get your bug fixed is to provide a reduced test case. Please provide a public repository with a runnable example.

## Code Conventions

Please follow the `.prettierrc` in the project.

## Credits

This project exists thanks to all the people who [contribute](CONTRIBUTING.md). <a href="https://github.com/gregberge/svgr/graphs/contributors"><img src="https://opencollective.com/svgr/contributors.svg?width=890&button=false" /></a>

### [Backers](https://opencollective.com/svgr#backer)

Thank you to all our backers! 🙏

<a href="https://opencollective.com/svgr#backers" target="_blank"><img src="https://opencollective.com/svgr/backers.svg?width=890"></a>

### [Sponsors](https://opencollective.com/svgr#sponsor)

Support this project by becoming a sponsor. Your logo will show up here with a link to your website.

## License

By contributing to SVGR, you agree that your contributions will be licensed under its MIT license.
