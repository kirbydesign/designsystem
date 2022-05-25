First of all - thank you for your interest in contributing to Kirby! 🥳

If you are looking for help or at any point have questions, check out "[Help!: i have a question related to kirby](SUPPORT.md)". 

**Beware:** We reserve the right to close issues and pull requests that do not follow the steps outlined in: [Introduction to the contribution model](#introduction-to-the-contribution-model). This is not because we want to be mean or micro-manage the way things are done - but a project of this size requires some consistency in the way we cooperate in order to be manageable. 

* [Introduction to the contribution model](#introduction-to-the-contribution-model)
  + [The process of contributing](#the-process-of-contributing)
  + [Before you get coding](#before-you-get-coding)
  + [Checklist: I have a component request](#checklist-i-have-a-component-request)
  + [Checklist: I have an enhancement](#checklist-i-have-an-enhancement)
  + [Checklist: I have found a bug](#checklist-i-have-found-a-bug)
* [Setup environment and tooling for contribution](#setup-environment-and-tooling-for-contribution)
  + [Clone and install the repository](#clone-and-install-the-repository)
  + [Node](#node)
  + [TSlint](#tslint)
  + [Prettier](#prettier)

# Introduction to the contribution model

Despite Kirby stemming from an internal Bankdata project - it has been decided to open source it, such that others than team Kirby can contribute to it. 
Allowing for Kirby to be used in multiple projects without team Kirby being the bottleneck. 

If you have a problem, an issue you want resolved, or even got brand new ideas for components. Well. There is no need to sit around and wait for team Kirby to get it implemented. 
You can contribute yourself! And no matter your role, you can probably contribute with something. May it be a helpful comment or a bug report.

We think that is neat. 

There is still need for managing Kirby however. We need to make sure that the project is moving in the right direction. That submitted code is: high quality, not duplicating anything and consistent with the rest of the codebase.
To do so a series of steps has been created that an issue must go through. All of these aim at making sure that the process of cooperating from idea to implementation is smooth for contributors. With as little time wasted as possible.

> Simplicity—the art of maximizing the amount of work not done—is essential.
>  
> _[Principles behind the Agile Manifesto](https://agilemanifesto.org/principles.html)_

## The process of contributing

In broad strokes the process is:

1. Submit an issue
2. Get it refined
3. Implement a solution
4. Get the solution reviewed and approved

Once a pull request has been approved it will be automatically merged. 

Actionable checklists for these steps can be found [here](#checklist-i-have-a-component-request). The following highlight some of the steps in the checklists, to explain what they are and why they exist. Our experience is that pull requests with a troublesome and drawn out review process have not followed one or more of these steps. 

### UX Refinement

> Planning and deciding how the issue can be solved in a way that aligns with the design system visually and UX-wise.

Every issue must be UX refined before implementation - unless it does not involve any visual changes. This consists of UXers planning how the issue can be solved in a way that aligns with the design system. The `NOT UX refined` label will be removed from the issue by team Kirby, once this has been done.

If a pull request with visual changes is submitted for an issue that has not been UX refined; the UX review process may result in a bunch of changes, that can delay the process of getting your PR approved.


### Tech Refinement

> Discussion and agreement on technical solution(s) for the implementation of the issue.

Every issue must be tech refined. Here it is discussed and agreed on how an issue should be implemented the best; the agreed upon solution should be documented in a comment on the issue. How long it takes depends on the scope of the issue. For small issues it might be nothing more than an agreement via a direct message. Other times it is a full-blown meeting with multiple participants.

⚠️ _No code should be written before this step is complete_.

Once the issue has been properly tech refined Team Kirby will remove the `NOT Tech refined` label from the issue. If a pull request is submitted for an issue that has not been tech refined; changes and problems that could have been tackled from the beginning, might arise from the code-review.

### Publish a WIP draft

> Draft pull request intended for getting timely feedback before too much implementation has been done.

We encourage contributors to publish a draft pull request with a WIP implementation of their issue to get feedback. This can advantageously be done before tests are written. By doing this misunderstandings and issues can be tackled early on; here they are often easier to correct. If this is not done, they might not be discovered until the code-review. Tests might have to be changed. So therefore we encourage contributors to use the opportunity to get some timely feedback.

### Self-review

> Reviewing your own pull request like you would review someone else's pull request.

This consists of code-reviewing your own pull request, following guidelines found in [The good: Self-review](https://github.com/kirbydesign/designsystem/wiki/The-Good%3A-Self-review). This is your chance to catch any low-hanging fruits and common issues before the reviewer does. If this is not done, an unneccessary amount of minor changes might be required during code review. This wastes both yours and the reviewers time.

### UX review

> Confirmation from UXers that the implementation complies with what was decided during UX Refinement.

If the implementation of the issue resulted in visual changes - then it has to be UX reviewed. This is to make sure that the introduced changes align with the design system. We strive to have every issue that introduces visual changes UX reviewed. If this is not done and the changes are merged to `main`, we might recieve issues about components not being properly aligned with the design system anymore from the users of Kirby.

## Before you get coding

Skim through the headlines found in the sidebar of "[the Kirby Designsystem wiki](https://github.com/kirbydesign/designsystem/wiki)". We are a lot of people working together on this project, all with varying prefrences both in terms of how we work and code. This might lead to frustrations during code-reviews. In an effort to avoid this and be transparent; we have specified our preferences on various subjects in those articles. 

Alternative ways of doing things are not wrong. But we strive for consistency across the Kirby codebase. 

You should also get properly setup before you write any code. To do so have a look at: "[Setup environment and tooling for contribution](#setup-environment-and-tooling-for-contribution)".


## Checklist: I have a component request 

If you got an idea for a component that you think should be part of Kirby you should follow these steps: 

1. **Open a [new issue](https://github.com/kirbydesign/designsystem/issues/new/choose) using the "component request"-template** (See guidelines on how to write "[The good: Issue](https://github.com/kirbydesign/designsystem/wiki/The-Good%3A-Issue)").
2. **Refinement:**
    - Request that the issue is [UX refined](#ux-refinement); do not proceed until this is done.
    - Request that the issue is [tech refined](#tech-refinement); do not proceed until this is done.
3. **Implementation:**
    - Make sure you have read: "[Before you get coding](#before-you-get-coding)".
    - Signal to others you are working on the issue by assigning yourself.
    - Create a branch from the [develop branch](https://github.com/kirbydesign/designsystem/tree/develop) following our [branch naming convention](https://github.com/kirbydesign/designsystem/wiki/The-Good%3A-Branch). 
    - Publish a WIP implementation to Github as a draft PR and ask for feedback. 
    - Make sure you have implemented tests following the guidelines in: "[The good: Test](https://github.com/kirbydesign/designsystem/wiki/The-Good%3A-Test)".
    - Update the [cookbook](https://cookbook.kirby.design) with examples and showcases.
4. **Review:**
    - Do a [self-review](https://github.com/kirbydesign/designsystem/wiki/The-Good%3A-Self-review). 
    - Create a pull request. If you created a draft PR during implementation you can just mark that as "ready for review".
    - Request that the pull request is code-reviewed.
    - Request that the pull request is [UX reviewed](#ux-review).
    - When the pull request has been approved it will be merged to `develop` by Team Kirby.
5. **Celebrate! 🎉**

## Checklist: I have an enhancement 

If you have an idea for Kirby that is not a brand new component or aimed at improving code quality; then you should submit an enhancement request!
The process is the same as submitting a component request just using another issue-template: 

1. **Open a [new issue](https://github.com/kirbydesign/designsystem/issues/new/choose) using the "enhancement request"-template** (See: "[The good: Issue](https://github.com/kirbydesign/designsystem/wiki/The-Good%3A-Issue)").
2. **Follow steps 2 to 5 in "[Checklist: I have a component request](#checklist-i-have-a-component-request)".**

## Checklist: I have found a bug 

If you have found a bug in Kirby you should follow these steps: 

1. **Report it by opening a [new issue](https://github.com/kirbydesign/designsystem/issues/new/choose) using the "bug report"-template** (See: "[The good: Issue](https://github.com/kirbydesign/designsystem/wiki/The-Good%3A-Issue)").
2. **Get the bug verified** 
    - To make sure the bug is not intended behaviour the bug should be verified by a member of team Kirby; do not proceed until this is done. 
3. **Implementation:** 
    - Make sure you have read: "[Before you get coding](#before-you-get-coding)".
    - Signal to others you are working on the issue by assigning yourself.
    - Create a branch from the [develop branch](https://github.com/kirbydesign/designsystem/tree/develop) following our [branch naming convention](https://github.com/kirbydesign/designsystem/wiki/The-Good%3A-Branch). 
    - Create a test that reproduces the bug following guidelines in: "[The good: Test](https://github.com/kirbydesign/designsystem/wiki/The-Good%3A-Test)". 
    - Write code to fix the bug
4. **Follow steps 4 and 5 in "[Checklist: I have a component request](#checklist-i-have-a-component-request)".**
# Setup environment and tooling for contribution

This section will help you get going with Kirby such that you can begin contributing. 

## Clone and install the repository

**Note:** make sure you have the right version of Node installed before installing the repository (see: [Node](#node)).

1. Clone the repository: 

```

git clone https://github.com/kirbydesign/designsystem
```

2. Install dependencies: 

```

npm install
```

3. Start the cookbook server:

```

npm start
```

You should now be able to open `http://localhost:4200` in a browser to access the cookbook.

## Node 

[Node](https://nodejs.org/en/) is the runtime used for development. 

The supported version of NodeJS can be found in the file [`package.json`](https://github.com/kirbydesign/designsystem/blob/main/package.json) under `engines`. At the time of writing it for example looks like this: 

```Javascript
...
"engines": {
  "node": "^14.16"
},
...
```

Meaning that as a minimum `v14.16` should be used for development. 

If you need to have multiple versions of node installed then a version manager such as [NVM](https://github.com/nvm-sh/nvm) can be used. 

## TSlint 

**Note:** Work is being done to migrate from TSLint to ESLint (see issue: [#1317](https://github.com/kirbydesign/designsystem/issues/1317)). 

TSLint is used for linting which helps keep up the quality of the submitted code for Kirby. 

Scripts for running TSLint can be found in `package.json` . We however recommend that you install a TSLint plugin for your editor. It can be useful to enable "fix on save"-functionality such that simple errors are fixed automatically. 

**Useful resources:**

* [TSLint extension for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin).
* [Enabling "fix on save" in VSCode](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin#auto-fix-and-auto-fix-on-save).

### VSCode "workspace library execution"-issue

An issue might occur where TSLint will randomly disable for the current workspace and has to be enabled again using the command `TSLint: Manage workspace library execution` . 

To solve this: 

1. Open a typescript file in VScode. 
2. Open the command pallette (<kbd>ctrl/cmd</kbd> + <kbd>shift</kbd> + <kbd>p</kbd>) and enter: `typescript: select typescript version`

4. Select: `use workspace version 3.6.5`.
5. Open the command pallette and enter: `TSLint: Manage workspace library execution` .

6. Select: `always enable workspace library execution`.

This will cause changes to be made in the file `.vscode/settings.json` ; do not commit these.

## Prettier

Prettier is used for consistent code formatting and avoiding unnecessary discussions about this during reviews.

As with TSLint, we  strongly recommend installing Prettier as a plugin for your editor. You should also enable "format on save".

It can however be used without an editor plugin; run `npm run prettier` to check for formatting errors, fix them by running `npm run prettier:fix` . 

If there are changes only concerning formatting, in files you did not create - do not commit these. There is most likely something wrong with your Prettier settings. 
Make sure that Prettier uses the config file that is shipped with the repository ([ `.prettierrc.json` ](https://github.com/kirbydesign/designsystem/blob/main/.prettierrc.json)) and not a global configuration located on your machine. 

To check if the config file from the repository is used, try to alter the configuration in `.prettierrc.json` and format a file using Prettier - for example by changing `"singleQuote": true,` to `"singleQuote": false, ` . 
If all quotation marks are changed to `"` instead of `'` when you format, it means the repository config file is used by Prettier. Remember to revert the changes made to `.prettierrc.json` .

**Useful resources:**

* [Prettier extension for VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
* [Enabling "format on save" in VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode#format-on-save)

