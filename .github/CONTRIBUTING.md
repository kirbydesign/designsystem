<!-- We should probably link to this file in #kirby-guild -->
First of all - thank you for your interest in contributing to Kirby! 🥳
<!-- Early on show that we are here to help if necessary and to educate people in how to get help -->
If you at any point have any questions please read: [I have a question related to Kirby](#i-have-a-question-related-to-kirby)

**Beware:** We reserve the right to close issues and pull-requests that does not follow the steps outlined in [the contribution model](#the-contribution-model). This is not because we want to be mean or micro-manage the way things are done - but a project of this size requires some consistency in the way we cooperate in order to be manageable. 

* [Introduction to the contribution model](#introduction-to-the-contribution-model)
  + [The process of contributing](#the-process-of-contributing)
  + [Before you get coding](#before-you-get-coding)
  + [Checklist: I have a component request](#checklist-i-have-a-component-request)
  + [Checklist: I have an enhancement](#checklist-i-have-an-enhancement)
  + [Checklist: I have found a bug](#checklist-i-have-found-a-bug)
* [Setup environment and tooling for contribution](#setup-environment-and-tooling-for-contribution)
  + [Clone and install repository](#clone-and-install-repository)
  + [Node](#node)
  + [TSlint](#tslint)
  + [Prettier](#prettier)
* [The good:](#the-good:)
  + [Issue](#issue)
  + [Branch](#branch)
  + [Commit](#commit)
  + [Self-review](#the-good-self-review)
  + [Pull-request](#pull-request)
  + [Test](#test)
* [I have a question related to Kirby](#i-have-a-question-related-to-kirby)
  + [Submit an inquiry request on github](#submit-an-inquiry-request-on-github)
  + [Ask in the kirby-guild slack channel](#ask-in-kirby-guild)
* [Glossary](#glossary)
  + [Tech Refinement](#tech-refinement)
  + [UX review](#ux-review)
  + [Self review](#self-review)

## Introduction to the contribution model

<!-- Introduction and motivation -->
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

### The process of contributing

<!-- General description of the contribution model -->

In broad strokes the process is:

1. Submit an issue
2. Get it refined
3. Implement a solution
4. Get the solution reviewed and approved

Once a pull-request has been approved it will be automatically merged. 

Actionable checklists for these steps can be found [here](#checklist-i-have-a-component-request). The following highlight some of the steps in the checklists, to explain what they are and why they exist. Our experience is that pull-requests with a troublesome and drawn out review process have not followed one or more of these steps. 

<!-- Why we do UX refinement?-->

#### UX Refinement

> Planning and deciding how the issue can be solved in a way that aligns with the design system visually and UX-wise.

Every issue must be UX refined before implementation - unless it does not involve any visual changes. This consists of UXers planning how the issue can be solved in a way that aligns with the design system. The `NOT UX refined` label will be removed from the issue by team Kirby, once this has been done.

If a pull-request with visual changes is submitted for an issue that has not been UX refined; the UX review process may result in a bunch of changes, that can delay the process of getting your PR approved.

<!--- Why do we do Tech refinement? -->

#### Tech Refinement

> Discussion and agreement on technical solution(s) for the implementation of the issue.

Every issue must be tech refined. Here it is discussed and agreed on how an issue should be implemented the best; the agreed upon solution should be documented in a comment on the issue. How long it takes depends on the scope of the issue. For small issues it might be nothing more than an agreement via a direct message. Other times it is a full-blown meeting with multiple participants.

⚠️ _No code should be written before this step is complete_.

Once the issue has been properly tech refined Team Kirby will remove the `NOT Tech refined` label from the issue. If a pull-request is submitted for an issue that has not been tech refined; changes and problems that could have been tackled from the beginning, might arise from the code-review.

#### Publish a WIP draft

> Draft pull-request intented for getting timely feedback before too much implementation has been done.

We encourage contributors to publish a draft pull-request with a WIP implementation of their issue to get feedback. This can advantageously be done before tests are written. By doing this misunderstandings and issues can be tackled early on; here they are often easier to correct. If this is not done, they might not be discovered until the code-review. Tests might have to be changed. So therefore we encourage contributors to use the opportunity to get some timely feedback.

<!-- Why do a self-review? -->

#### Self-review

> Reviewing your own pull-request like you would review someone else's pull-request.

This consists of code-reviewing your own pull-request, following guidelines found in [The good: Self-review](#the-good-self-review). This is your chance to catch any low-hanging fruits and common issues before the reviewer does. If this is not done, an unneccessary amount of minor changes might be required during code review. This wastes both yours and the reviewers time.

<!-- Why we do UX reviews? -->

#### UX review

> Confirmation from UXers that the implementation complies with what was decided during UX Refinement.

If the implementation of the issue resulted in visual changes - then it has to be UX reviewed. This is to make sure that the introduced changes align with the design system. We strive to have every issue that introduces visual changes UX reviewed. If this is not done and the changes are merged to master, we might recieve issues about components not being properly aligned with the design system anymore from the users of Kirby.

<!-- - Issues for trackability and history -->

### Before you get coding

Skim through the "[The good](#the-good)"-section. We are a lot of people working together on this project, all with varying prefrences both in terms of how we work and code. This might lead to frustrations during code-reviews. In an effort to avoid this and be transparent; we have specified our preferences on various subjects in that section. 

Alternative ways of doing things are not wrong. But we strive for consistency across the Kirby codebase. 

You should also get properly setup before you write any code. To do so have a look at: "[Setup environment and tooling for contribution](#setup-environment-and-tooling-for-contribution)".

<!-- The following "I have/would" sections has the role of easily guiding the reader 
on how to do their specific task, and explain them what the process is for that task -->

### Checklist: I have a component request 

<!--- Submit issue using the component request template--> 
If you got an idea for a component that you think should be part of Kirby you should follow these steps: 

1. **Open a [new issue](https://github.com/kirbydesign/designsystem/issues/new/choose) using the "component request"-template** (See guidelines on how to write "[The good: Issue](#issue)").
2. **Refinement:**
    - Request that the issue is [UX refined](#ux-refinement) in [#kirby-guild](#getting-access-to-the-kirby-guild-slack-channel); do not proceed until this is done.
    - Request that the issue is [tech refined](#tech-refinement) in [#kirby-guild](#getting-access-to-the-kirby-guild-slack-channel); do not proceed until this is done.
    - Move the issue to the "Ready to do"-column in the "[Kirby kan-ban board](https://github.com/kirbydesign/designsystem/projects/1)"-project.
3. **Implementation:**
    - Make sure you have read: "[Before you get coding](#before-you-get-coding)".
    - Signal to others you are working on the issue by assigning yourself.
    - Create a "feature"-branch from the [master branch](https://github.com/kirbydesign/designsystem/tree/master). 
    - Publish a WIP implementation to Github as a draft PR and ask [#kirby-guild](#getting-access-to-the-kirby-guild-slack-channel) for feedback. <!--This will let you know early on if you are going in the right direction.-->
    - Make sure you have implemented tests following the guidelines in: "[The good: Test](#test)".
    - Update the [cookbook](https://cookbook.kirby.design) with examples and showcases.
4. **Review:**
    - Do a [self-review](#self-review). 
    - Create a pull-request. If you created a draft PR in step 3 you can just mark that as "ready for review".
    - Request that the pull-request is code-reviewed in [#kirby-guild](#getting-access-to-the-kirby-guild-slack-channel).
    - Request that the pull-request is [UX reviewed](#ux-review) in [#kirby-guild](#getting-access-to-the-kirby-guild-slack-channel).
    - When the pull-request has been approved it will be automatically merged to master via [automerge](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/automatically-merging-a-pull-request).
5. **Celebrate! 🎉**

### Checklist: I have an enhancement 

If you have an idea for Kirby that is not a brand new component or aimed at improving code quality; then you should submit an enhancement request!
The process is the same as submitting a component request just using another issue-template: 

1. **Open a [new issue](https://github.com/kirbydesign/designsystem/issues/new/choose) using the "enhancement request"-template** (See: "[The good: Issue](#issue)").
2. **Follow steps 2 to 5 in "[Checklist: I have a component request](#checklist-i-have-a-component-request)".**

### Checklist: I have found a bug 

If you have found a bug in Kirby you should follow these steps: 

1. **Report it by opening a [new issue](https://github.com/kirbydesign/designsystem/issues/new/choose) using the "bug report"-template** (See: "[The good: Issue](#issue)").
2. **Get the bug verified** 
    - To make sure the bug is not intended behaviour contact [#kirby-guild](#getting-access-to-the-kirby-guild-slack-channel) to have it verified; do not proceed until this is done. 
3. **Implementation:** 
    - Signal to others you are working on the issue by assigning yourself.
    - Create a "fix"-branch from the [master branch](https://github.com/kirbydesign/designsystem/tree/master). 
    - Create a test that reproduces the bug following guidelines in: "[The good: Test](#test)". 
    - Write code to fix the bug
4. **Follow steps 4 and 5 in "[Checklist: I have a component request](#checklist-i-have-a-component-request)".**

## Setup environment and tooling for contribution

<!-- The following section is responsible for teaching people how to get setup with 
the repo such that they can get coding -->
This section will help you get going with Kirby such that you can begin contributing. 

### Clone and install the repository

<!-- how to clone and get going with the kirby repo-->
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

### Node 

<!-- Which version should people use, and perhaps a recommendation on which tool people can use to manage versions. -->
[Node](https://nodejs.org/en/) is the runtime used for development. 

It is recommended to use `v12` for development as we currently do not support node LTS (see issue: [#1443](https://github.com/kirbydesign/designsystem/issues/1443)). 

If you need to have multiple versions of node installed then a version manager such as [NVM](https://github.com/nvm-sh/nvm) can be used. 

### TSlint 

<!-- People should make sure to have it enabled to avoid unnecessary comments during code review-->
**Note:** Work is being done to migrate from TSLint to ESLint (see issue: [#1317](https://github.com/kirbydesign/designsystem/issues/1317)). 

TSLint is used for linting which helps keep up the quality of the submitted code for Kirby. 

Scripts for running TSLint can be found in `package.json` . We however recommend that you install a TSLint plugin for your editor. It can be useful to enable "fix on save"-functionality such that simple errors are fixed automatically. 

**Useful resources:**

* [TSLint extension for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin).
* [Enabling "fix on save" in VSCode](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin#auto-fix-and-auto-fix-on-save).

#### VSCode "workspace library execution"-issue

An issue might occur where TSLint will randomly disable for the current workspace and has to be enabled again using the command `TSLint: Manage workspace library execution`. 

To solve this: 

1. Open a typescript file in VScode. 
2. Open the command pallette (<kbd>ctrl/cmd</kbd> + <kbd>shift</kbd> + <kbd>p</kbd>) and enter: `typescript: select typescript version`

4. Select: `use workspace version 3.6.5`.
5. Open the command pallette and enter: `TSLint: Manage workspace library execution` .

6. Select: `always enable workspace library execution`.

This will cause changes to be made in the file `.vscode/settings.json` ; do not commit these.

### Prettier

Prettier is used for consistent code formatting and avoiding unnecessary discussions about this during reviews.

As with TSLint, we  strongly recommend installing Prettier as a plugin for your editor. You should also enable "format on save".

It can however be used without an editor plugin; run `npm run prettier` to check for formatting errors, fix them by running `npm run prettier:fix`. 

If there are changes only concerning formatting, in files you did not create - do not commit these. There is most likely something wrong with your Prettier settings. 
Make sure that Prettier uses the config file that is shipped with the repository ([`.prettierrc.json`](https://github.com/kirbydesign/designsystem/blob/master/.prettierrc.json)) and not a global configuration located on your machine. 

To check if the config file from the repository is used, try to alter the configuration in `.prettierrc.json` and format a file using Prettier - for example by changing `"singleQuote": true,` to `"singleQuote": false,`. 
If all quotation marks are changed to `"` instead of `'` when you format, it means the repository config file is used by Prettier. Remember to revert the changes made to `.prettierrc.json`.

**Useful resources:**

* [Prettier extension for VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
* [Enabling "format on save" in VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode#format-on-save)


## The good:

<!-- The following sections have the responsibility of explaining contributors our best pratices such that they can more easily have their changes implemented in kirby --> 
<!-- Ideally we should be able to refer to these sections if people break the guidelines in their issue or pull-requests, to make sure we are all preaching the same guidelines -->

### Issue 

> A good idea is an orhpan without effective communication. 
>  
> _Topic 7, The Pragmatic Programmer_

Writing a good issue is all about effective communication. This leads to fewer questions and discussions, which in turn results in a quicker process from new issue to approved PR. 

The following is a series of points that we believe can help to communicate more effectively when writing issues. 

#### The good issue only contains one issue

While this might seem obvious it can be easy to fall into the trap of bundling two issues together. 

Consider the following issue: 

> Hovering a `kirby-button` with attention level 2 in IE11 does not activate the hover-effect. It works when i use attention level 1, but i get warnings in the console.

If that issue is closed, how is the reader supposed to know what was actually fixed? 
Was it the issue of the hover-effect not activating? The issue of warnings being thrown when using attention level 1? Both? 

To solve this, the issue should be split into two seperate issues which refer to each other: 

Issue #1:

> Hovering a `kirby-button` with attention level 2 in IE11 does not activate the hover-effect. This might be related to issue #2.

Issue #2:

> I am not able to use a `kirby-button` with attention level 1 without a warning being thrown in the console. This might be related to issue #1.

If you feel like you are "complaining" too much by creating several issues; don't! 
It is only helpful of you to split up your issues - you are saving time and easing organization. 

#### The good issue is self-contained 

It can not be assumed that the reader of your issue has any knowledge of your work outside of Kirby. 

The reader might be: 

* a contributor outside of Bankdata 
* someone who is not in your team 
* potentially a new hire

This also goes for Kirby maintainers - some of which has been hired to specifically work on Kirby. 

Therefore: 

* Do not use internal lingo 
* Do not assume the reader can access the application you are working on - include screenshots instead.
* Do not assume the reader can access the repository you are working in - include code snippets instead (if possible). 

#### The good issue is specific & unambigious

The wording of an issue should be as specific and unambigious as possible. This will help the reader understand exactly what you mean. This can be done in many ways. Therefore we have compiled some examples to demonstrate:

##### Example #1: Referring to files 

If you are referring to a file in the repository do not refer to it as `_typography.css` use the full path instead: `libs/designsystem/src/lib/scss/base/_typography.scss` .

It can also be helpful to directly link to the file such that the reader easily can access it: [ `libs/designsystem/src/lib/scss/base/_typography.scss` ](https://github.com/kirbydesign/designsystem/blob/master/libs/designsystem/src/lib/scss/base/_typography.scss).

While it might be obvious for you and experienced contributors, what and where `_typography.css` is; it is not obvious for newcomers. 

If you already have refered to the full path earlier in the issue, it is okay to refer to the file as `_typography.css` without linking to it.

##### Example #2: Writing reproducible steps for bug reports

The steps should be unambigously specific. This can be done for example by changing the step: 

> 2. Type some text 

to: 

> 2. Type: 'text'

 
There could be something with the _exact_ way you are doing it, that triggers the behaviour you are experiecing. 

##### Example #3: Using code snippets to explain what and how

When reporting a bug or similar do not write something along the lines of: 

> Whenever i use a `kirby-button` with attention level 1 on the frontpage, a warning is thrown

Specify exactly where and how the button is inserted with a code snippet, along with exact details of the warning and where it can be found:

> Inserting a `kirby-button` with attention level 1 as shown in the code-snippet, results in the following warning being logged in the browser console: `TypeError: undefined is not an object` .

The latter is pure maintainer poetry. 

These are but three examples of how issues can be specific and unambigious. Always keep in the back of your mind, how you can be more specific and unambigious when describing issues. 

#### The good issue follows the template 

Do not ignore the template text when creating an issue. Use it. 

The issue templates exist to ease collaboration by providing structure and reminding you of which information other contributors are looking for. 
They also provide helpful checklists that help you follow [the process of contributing](#the-process-of-contributing) and let others know how far you have come. 

If you experience that no template matches your specific need; well there is a good opportunity to contribute. Create an issue for a new template to be created! 

#### The good issue has a good title

The title of an issue is the part being read the most, as issues usually are viewed in some sort of list.
It can therefore be a good idea to spend some time formulating one. 

A good title is short without too much detail. Details should be presented in the actual description. 

If possible try to make the title compelling. While an open-source repository is not a newspaper where readers must be enganged at any cost, you still want to catch the interest of contributors. 

The following title: 

> Input causes error when you type over 50 characters and press enter 

could be improved by writing: 

> Input error on 50-character submit

Having a hard time coming up with a good title? It can sometimes be easier to formulate a brief but comprehensive title _after_ you have written the issue description. 

#### The good issue is easy to read

There are MANY ways to improve the readability of a text. The following is just some ways to do it, that we think can add value when writing an issue:

* Use proper punctuation (to the best of your abilities at least. We are not experts at , it either)
* Use proper capitalisation
* Spend some time proof-reading the issue before it is submitted
* Use available formatting such as lists and code blocks to aid easy skimming 
* Explain abbrevations being used 

For example the text: 

> I went to the RDL the other day, I think that the RDL is very nice! They have a huge selectin of books such as: the old man and the sea, 1984, Brave new world and the count of monte cristo 

Is much harder to read than: 

> I went to the royal danish library (RDL) the other day. The RDL is very nice. They have a huge selection of books, such as: 
> - The Old Man and the Sea 
> - 1984 
> - Brave New World 
> - The Count of Monte Cristo

#### The good issue contains screenshots and screen recordings if possible 

Kirby is a design system, hence it is a very visual project! So do not be shy of using images and screen recordings to explain yourself. 

If you are requesting a new component, perhaps add a sketch showing how you are imagining it. While every component must have a UX refined sketch before it can be implemented; adding one yourself can help others understand what you are thinking. 

When reporting a bug, you could add a screen recording to show exactly what you are experiencing. 

Suggesting an enhancement? Add before and after images portraying what you would like, just make sure to clearly state which is "before" and which is "after". 

#### The good issue is closed when there i no need for it (except bug reports!)

If an issue you have submitted is no longer necessary and no work has been done on it, go ahead and close it.

While suggestions from contributors always are valueable, we want to eliminate as much "noise" as possible, by removing issues that are outdated or redundant. 
Otherwise they might take away attention from more important issues.  

If someone else has a need for your issue again they can request that it is reopened or go ahead and open a new one. No harm done (issues cost nothing to create afterall). 

This does not go for bug reports however, as we want to unearth and solve as many bugs as possible.

### Branch 

The good branch only contain changes related to one issue and follows our branch naming convention:

 `[issue-type]/[issue-id]-[name]`

Besides the structure, notice that the branch name:

* Is kebab cased (`kebab-casing-uses-hyphens-for-space`)
* Only uses lowercased letters

Examples:

* `documentation/1472-the-good-branch`
* `enhancement/1483-sticky-only-page-header`
* `housekeeping/1360-ci-cache-node-modules`

The issue type and id can be found on the [issues page](https://github.com/kirbydesign/designsystem/issues).

![](images/how-to-find-issue-type-and-id.png)

The name part should give an idea of what the changes in the branch is related to, without having to look up the issue. 

As of now, Kirby does not utilise any advanced branching strategies. We always branch out from `master` and request that the new branch is merged back into `master` using a PR; no matter the issue type.

You should now be ready to create a _good_ branch that follows our branch naming convention. But if you are interested in why we have decided on this convention - read on. 

#### Why this branch naming convention?

While a branch is ephemeral, we believe it is important to have informative and consistent naming in order to: 

* Be able to easily identify what is contained in a branch
* Determine if it is safe to delete a branch
* Organize branches 

To achieve this - it has been decided that a branch must contain the following three items:
<dl>
<dt>Issue type</dt>
<dd>
  
Should be part of the branch name to ease organization and grouping. 
  
When viewing the branch overview on Github, which is sorted alphabetically - all branches of the same issue type will be shown next to each other. When the issue type is followed by a `/` , tools that visualise branches as a tree (such as a Git GUI or an IDE), will group all branches belonging to the same type together.

The entire name of the issue type  is to be used, such that contributors does not have to remember a bunch of arbitary abbrivations (is it: doc, docs or docu? Something fourth?) 
</dd>

<dt>Issue id</dt>
<dd>
  
Should be part of the branch name, such that others know which issue the changes on the branch is related to. 

If this was not included and a branch is created for which a pull-request is never submitted - questions can arise, such as: _is it safe to delete the branch? Is the issue for this branch closed? Is this branch even related to an issue?_

It also functions as a reminder for contributors to only work on one issue per branch. 

If a contributor is working on something for which no issue has been submitted, they will not be able to follow the naming convention. 
This hopefully nudges them towards creating a [good issue](#issue) and follow [the process for contribution](#the-process-for-contribution).
</dd>

<dt>Name</dt>
<dd>
  Should be part of the branch name such that it (hopefully) is possible to get an idea what the changes on the branch is related to, without looking up issues.</dd>
</dl>

Lowercasing and the use of kebab case exists to keep the branch names consistent. 

This makes it easier to change branch as it is not necessary to remember whether the branch was named using: camel case, kebab case, or something third. Which words were capitalized and which were not?

Instead a contributor should simply remember to always use kebab- and lowercase for branch names.

### Commit

You may have encountered statements like

> Commit early, Commit often

We agree. Apart from acting as checkpoints, good commits support collaboration by providing an overview of your changes and make navigating them easy. But only as long the commits are good.

#### The good commit follows Git best practices

You are encouraged to follow commonly adopted Git best practices. We would especially like to highlight:

1. **Try to make each commit a logically separate changeset**
    - Make changes in each commit _atomic_ &ndash; focus on one thing
    - Keep your commits as small as possible and keep your changes in each commit related
    - Utilize `git add --patch` if you need to split non-related changes into separate commits.
2. **Commit often**
    - It is easier to get an overview with multiple small changes than one large commit containing lots of changes
    - If you need to roll back to a previous commit, you can do it incrementally instead of reverting every change
3. **Strive for each commit to compile/build and pass tests**
4. **Regularly push your commits to remote**
    - Early peer reviews are easier
    - In case something happens to your machine it reduces the amount of work lost
    - Makes it easier to hand over the issue to other developers if needed

#### The good commit has good commit messages

> Keep in mind: [This](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html) &middot; [has](https://www.git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project#_commit_guidelines) &middot; [all](https://github.com/torvalds/subsurface-for-dirk/blob/master/README.md#contributing) &middot; [been](http://who-t.blogspot.co.at/2009/12/on-commit-messages.html) &middot; [said](https://github.com/erlang/otp/wiki/writing-good-commit-messages) &middot; [before](https://github.com/spring-projects/spring-framework/blob/30bce7/CONTRIBUTING.md#format-commit-messages)
>
> _&mdash; Chris Beams, [The seven rules of a great Git commit message](https://chris.beams.io/posts/git-commit/#seven-rules)_

All commits from your branch are squashed when merged with the main branch (see [commits](https://github.com/kirbydesign/designsystem/commits/master)). Commit messages from individual commits end up in a list of changes in the message body of the merge commit. Try to keep that in mind when writing your commit messages.

Ideally, a good commit message will be structured into three parts:

1. Subject line
2. Message body
3. Closing line

The most important part is the subject line. The message body should be used if elaboration is necessary. We rarely use a closing line, but if you want to add useful meta-data related to your commit &ndash; such as GitHub issue number and co-author names &ndash; this is where to put it.

##### A good subject line

* will complete the sentence "If applied, this commit will..."
* is written in [imperative mood](https://www.thoughtco.com/imperative-mood-grammar-1691151) (_Fix_, not ~~_Fixed_~~, ~~_Fixes_~~ etc.)
* is limited to 50 characters

If you cannot fit your message into a 50 character subject line, consider if you've included too many changes that makes it difficult to describe concisely. Try to rephrase the subject line and use the [message body](#a-good-message-body) for elaboration.

In addition we use [gitmoji](https://gitmoji.dev) when possible to prefix the subject line with an illustrative emoji. There are several [tools](https://gitmoji.dev/related-tools) available (including a [VSCode extension](https://github.com/vtrois/gitmoji-vscode) and a [CLI tool](https://github.com/carloscuesta/gitmoji-cli)). It's optional, but very helpful when skimming through the git log.

Good verbs to use as the first word of your subject line:

* Add
* Create
* Refactor
* Fix
* Release
* Document
* Modify
* Update
* Remove
* Delete

🟢 Good subject line examples:

> 📝 Update getting started documentation

> 🔥 Remove deprecated methods

> ✅  Add tests for dropdown component

🔴 Bad subject line examples:

> ~~fixes a bug.~~

> ~~more changes~~

> ~~added file~~

> ~~fix code review comments~~

##### A good message body

We don't often use message bodies, but we encourage you to do so if you need to elaborate on your changes. Here is some pointers on how to write a good one:

* Always separate the message body from the subject line with a blank line.
* You should use the message body to describe _what_ was done and _why_, but not how (see for example [this commit from Bitcoin Core](https://github.com/bitcoin/bitcoin/commit/eb0b56b19017ab5c16c745e6da39c53126924ed6)).
* Be aware that if you need to write a lot in the message body it may also be a sign of too many changes in one commit.
* Wrap lines in the message body at 72 characters

#### Read more about good commits

For more on good git commits, see (among _many_ other):

* [Distributed Git - Contributing to a Project](https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project)
* [Git Best Practices](https://sethrobertson.github.io/GitBestPractices/)
* [Stop Writing Bad Commit Messages](https://betterprogramming.pub/stop-writing-bad-commit-messages-8df79517177d)
* [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)
* [Turbo Git Commit Message Standard](https://gist.github.com/turbo/efb8d57c145e00dc38907f9526b60f17)
* [Check Out These 5 Git Tips Before Your Next Commit](https://medium.com/walmartglobaltech/check-out-these-5-git-tips-before-your-next-commit-c1c7a5ae34d1)

### The Good: Self-Review

A lot of comments and requests for change during review of a pull request can sometimes feel demotivating. Doing a good self-review can save yourself and the reviewer from frustrations during code review.

A self-review removes gravel in the road, leading to a smooth and focused code review - while avoiding unnecessary discussions. It should be done before the pull request is published and marked as _Ready for review_.

We collected a bunch of common issues that often come up during code reviews.

#### Do not commit unrelated changes

Avoid unrelated changes in files that are not directly part of your pull-request. For example, don't commit changes like formatting or reordering imports if they're the _only_ changes made in those files. It will clutter the git history and make it hard to understand why the latest change made to a particular line of code is in a commit that is not related to the change at all. E.g., when using [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) or similar tools.

If you have already committed unrelated changes try to revert them before asking for code review.

#### Make sure files are formatted

Use Prettier to format the files you are changing. If you are editing a file that for some reason has not already been properly formatted, you will probably see a lot of changes when you diff the file after you format it. Try to put the formatting changes in a separate commit if possible e.g., by creating a _formatting commit_ before committing your other changes. It will be easier for the reviewer to see your actual changes if they have the option to ignore the formatting changes.

#### Look out for linting warnings

The linting rules are configured to help you fix things that are easily forgotten, like sorting imports and removing unused variables, imports etc. Linting may also help you identify and remove dead code. Use the linting tools to avoid having to fix these issues during code review.

#### Delete temporary changes

Look for temporary changes you have used during development, like:

* leftover `console.log()` statements
* code that has been commented out
* TODO comments

They do not belong in the codebase and should be removed. TODOs should either be implemented right away or you should create a new issue for solving it later.

#### Concluding questions

From the perspective of a reviewer, ask yourself:

* Is it obvious what the changes made in the pull request are and what the result of merging the pull request will be?
* Is the issue solved by the changes? Read the issue description and the tech refinement comment(s) again to confirm you have solved the issue.
* Does the [pull request](#pull-request) description contain the appropriate information necessary to perform a code review?

### Pull-request

* How is a pull-request that is easily reviewed constructed?

### Test

Tests helps us avoid regressions and provides peace of mind to other contributors when making changes to the code by ensuring that nothing is accidentally broken. Sometimes more time is spent on writing tests than the actual code - but it provides value everytime it is executed and is an important tool for collaboration.

A good well written test also acts as a sort of documentation by documenting functional requirements of the code.

That is three benefits for the price of one - so do not skimp on testing!

For testing we use: 
* [Karma](https://karma-runner.github.io/latest/index.html) - as our test runner
* [Jasmine](https://jasmine.github.io) - as the framework for writing tests 
* [Spectator](https://github.com/ngneat/spectator) - as a tool for reducing boilerplate that gives us mocking capabilities and provide spying functionality 

The following is not a guide on how to use these tools (if you are not familiar with Jasmine & Spectator have a look at the linked documentation above). Rather it is a list of points we believe can help you create tests that are helpful in avoiding regression, making others feel safe changing code and that can assist documenting your code.

#### The good test is located in the right file
In Kirby we seperate integration tests from unit tests - so make sure to know which kind of testing you are doing before writing them. 

Unit tests are located in `*.spec.ts` files such as [`button.component.spec.ts`](https://github.com/kirbydesign/designsystem/blob/master/libs/designsystem/src/lib/components/button/button.component.spec.ts) and integration tests in `*.spec.integration.ts` files such as [`button.component.integration.spec.ts`](https://github.com/kirbydesign/designsystem/blob/master/libs/designsystem/src/lib/components/button/button.component.integration.spec.ts).

Remember that unit tests, tests a single unit - so if you find yourself relying on other components or functions without them being mocked or stubbed, then you are most likely writing an integration test. 

#### The good test can be read as a sentence 
Being able to read a test as a sentence, makes it clear what has gone wrong when the test fails and makes it act as a functional requirement. 

As an example, which one of these two tests best communicates intention while being easy to read and understand? 

Example #1: 

![](images/bad-test-example.png)

Example #2: 

![](images/good-test-example.png)

Probably #2. 

The first can make sense when you have seen #2, but without you will have to interpret what is actually meant by "ButtonComponent + Kirby page Page Actions background-color: #fff".
What is it exactly that should have the white backgound color here? 

To achieve this, you can follow these pointers:

##### Use the [Given-When-Then](https://www.agilealliance.org/glossary/gwt/#q=~(infinite~false~filters~(postType~(~'page~'post~'aa_book~'aa_event_session~'aa_experience_report~'aa_glossary~'aa_research_paper~'aa_video)~tags~(~'given*20when*20then))~searchTerm~'~sort~false~sortDirection~'asc~page~1)) formula
For example have a look at example #1: 
* (Given) ButtonComponent in Kirby Page 
* (When) inside Page Actions 
* (Then) [it] should render with correct background-color

The missing _it_ comes from the `it()` blocks used when writing the tests: 
![](images/it-code-example.png)

##### Start `describe` and `it` blocks with a lowercase letter 
For example write `describe('inside Page Actions', () => {...})` not `describe('Inside Page Actions', () => {...})`.

Not following this, causes the capitalisation to be wrong when the test is read as a sentence: 
> "ButtonComponent in Kirby Page Inside Page Actions Should render with correct background color".

##### Avoid values in the description 
Notice how the above test says "should render with correct background-color" instead of "should render with background-color #fff". 

For someone running the tests, it is not relevant what the color should be, they care about if the color is _correct_. If they ever need to see what the correct color is, they can look up the test. 

This also reduces the likeliness of forgetting to correct the test description, if the color ever was to change - resulting in uncertainaity to what the correct color actually is. 

#### The good test follows the Arrange, Act, Assert (AAA) pattern
Following the [AAA pattern](https://medium.com/@pjbgf/title-testing-code-ocd-and-the-aaa-pattern-df453975ab80) makes your tests well structured and easy to understand. 

A test will not always have all parts of AAA - sometimes it may only be necessary to assert, as is the case in the following test:
```
  it('should render with correct background-color', () => {                                                                                                                                                                                             
       expect(element).toHaveComputedStyle({                                                                                                                                                                                                               
         'background-color': getColor('primary'),                                                                                                                                                                                                          
       });                                                                                                                                                                                                                                                 
  });
```

We do not denote each part of AAA with a comment but use spacing to seperate the different parts of the test.

You might notice tests in Kirby that do not use the AAA pattern - that is a good opportunity to do some girl/boy scouting and fix it if you are making other changes related to your issue in that file anyways.

#### The good test prioritizes readability above efficient code 
<!-- This section might be a bit redundant IMO -->
When writing tests prioritise the readability of the test above all. 
It should be easy for future developers to visually parse and understand what is going on in the test. 

The following points can help you improve the readability of your tests:
- Making proper spacing between `it` blocks 
- Group related tests under common `describe` blocks 
- Keeping your test isolated (more on this here: [The good test is isolated](#the-good-test-is-isolated))
- Follow the AAA pattern as described above

Here is two examples, which one is easiest to read? 

![](images/unreadable-tests.png)

![](images/readable-tests.png)

#### The good test is isolated and flat
The tests should be isolated and flat, therefore writing tests is one of the few places, where it is okay to be WET instead of DRY - it is rather important actually. 

Future contributors should be able to read the test without having to jump around the code and do too much logic, therefore: 
* Avoid reusing code by using functions, keep your tests flat instead 
* Avoid the use of shared variables between tests, all state should be isolated to the test 
* Use `beforeEach` instead of `beforeAll`; it will cause potential changes made by previous tests to be overwritten, and you start with the same state each time

Not following the above points, makes it more likely that there is something wrong with the actual test and not the code being tested when they fail. Changing a shared function can cause several tests to fail/change unexpectedly. If it happens too often that the test is the problem, not the code; it can cause mistrust in these.

Therefore be WET - it will lower the chance of the tests being the problem and give a better overview of what is going on when reading the test. 

When doing unit tests, further isolation has to be done by stubbing and mocking everything else than what is being tested. 

#### The good test uses test scenarios when appropiate 
If you find yourself writing several tests that have identical arrange, act and assess sections - just with different variables, then you might benefit from using test scenarios. 

An array of scenarios are used to programatically create tests for each using the `forEach` function. Each test scenario contains the variables making up the scenario and then the expected outcome of this. 

Take for example the [`kirby-button`](https://cookbook.kirby.design/home/showcase/button) directive which is used to render buttons. Depending on which size is passed as an input property, it is rendered with different values for `font-size`, `height` and `min-width`. When testing this, the tests for each size is identical. They only differ in which value is given for size and the expected outcome. This can be expressed as an array of test scenarios: 

```
const testScenarios: { size: ButtonSize; expected: any }[] = [
  {
    size: ButtonSize.SM,
    expected: { fontSize: fontSize('xs'), height: size('l'), minWidth: '44px' },
  },
  {
    size: ButtonSize.MD,
    expected: { fontSize: fontSize('s'), height: size('xl'), minWidth: '88px' },
  },
  {
    size: ButtonSize.LG,
    expected: { fontSize: fontSize('n'), height: size('xxl'), minWidth: '220px' },
  },
];
```

These scenarios can then be used to generate the actual tests when combined with string interpolation: 
```
testScenarios.forEach((scenario) => {
  describe(`when configured with size = ${scenario.size}`, () => {
    beforeEach(() => {
      spectator = createHost(
        `<button kirby-button size="${scenario.size}"><span>Text</span></button>`
      );
      element = spectator.element as HTMLButtonElement;
    });

    it('should render with correct font-size', () => {
      expect(element).toHaveComputedStyle({ 'font-size': scenario.expected.fontSize });
    });

    it('should render with correct height', () => {
      expect(element).toHaveComputedStyle({ height: scenario.expected.height });
    });

    it('should render with correct min-width', () => {
      expect(element).toHaveComputedStyle({ 'min-width': scenario.expected.minWidth });
    });
  });
});
```

This generates a total of 9 tests for us, but we only had to write 3! This is actually a simplified example taken from [`button.component.spec.ts`](https://github.com/kirbydesign/designsystem/blob/master/libs/designsystem/src/lib/components/button/button.component.spec.ts). In the actual file 9 tests are written; resulting in 27 tests being created programatically.

It is less WET than writing them all out by hand but each test is still flat, structured and self-contained. Actually it often reads better as the intention is clearer and gives a better overview of what is going on.

#### The good test prefers the use of Spectator over Angular testbed 
If you examine the test files, you will notice that almost every file uses the functions `createHostFactory` or `createComponentFactory` as part of their setup. These two functions are given the component being tested along with configuration such as declarations, imports, providers and more.

They then respectively return a `createHost` or `createComponent` function that can be used to create a fresh component in your `beforeEach` blocks. 

For example see: 
```
describe('ButtonComponent', () => {    
  let spectator: SpectatorHost<ButtonComponent>;    
  let element: HTMLButtonElement;    
    
  const createHost = createHostFactory({    
    component: ButtonComponent,    
    declarations: [MockComponent(IconComponent)],    
  });    
    
  describe('by default', () => {    
    beforeEach(() => {    
      spectator = createHost('<button kirby-button>Test</button>');    
      element = spectator.element as HTMLButtonElement;    
    });    
    
    it('should create', () => {    
      expect(spectator.component).toBeTruthy();    
    });
  })
})
```

Angular Test Bed is a nice tool for configuring and initializing the environment for unit tests. It unfortunately involves quite a bit of boilerplate code to use in testing. Therefore the use of Spectator is preferred.

For more on `createHostFactory`, `createComponentFactory`, `createHost` and `createComponent` see [the Spectator documentation](https://github.com/ngneat/spectator#testing-components). 

#### The good test prefers fakeAsync over Async & Done 
While the `it` function is provided with a `done` callback as an argument and support the `async`/`await` syntax for testing asynchronous behavior; we encourage the use of the [`fakeAsync`](https://angular.io/api/core/testing/fakeAsync) function instead. 

Using the `done` function might send you straight to [callback hell](https://image.slidesharecdn.com/promisesandchaininginangularjs-141027044455-conversion-gate02/95/promises-and-chaining-in-angularjs-into-callback-hell-and-back-again-17-638.jpg) while the `async`/`await` syntax slows down execution of tests. 

`fakeAsync` combined with the [`tick`](https://angular.io/api/core/testing/tick) function on the other hand, simulates the asynchronous passage of time without actually taking any additional time and avoiding callback hell.

When using `fakeAsync` remember to not mix it with the `done` function or the `async`/`await` syntax. Using `fakeAsync` we want to simulate that time is passing - not actually wait for the time to pass. 

#### The good test uses ionicModuleForTest instead of IonicModule
When working with ionic you might have to import the `IonicModule` as part of your `createComponent` or `createHost` factory.   
Here you should use the [`TestHelper`](https://github.com/kirbydesign/designsystem/blob/master/libs/designsystem/src/lib/testing/test-helper.ts) property `ionicModuleForTest` like so: 

```
const createComponent = createComponentFactory({
  component: RadioComponent,
  imports: [TestHelper.ionicModuleForTest],
});
```

This ensures that each test uses the same config for the `IonicModule`. 

There might be files where `IonicModule` is used directly instead of `TestHelper.ionicModuleForTest` - this is a good chance to do some girl/boy scouting and fix it, but only if you are making changes to those files anyways.  

#### The good test combines tests when appropiate
In Kirby there is defined a [`toHaveComputedStyle`](https://github.com/kirbydesign/designsystem/blob/master/libs/designsystem/src/lib/testing/element-css-custom-matchers.d.ts) custom matcher that checks the value of CSS properties an element is rendered with, like so: 
```
it('should render with correct border-width', () => {
  expect(element).toHaveComputedStyle({
    'border-width': '1px',
  });
});
```

When doing unit tests it can seem to be straightforward to create seperate tests for different CSS properties - we are only testing one thing per test after all. Consider the above example, where the only assessment is if `border-width` is correct. There might then be additional tests assessing if the element also has the correct `border-color` & `border-style`.  

In that case, we would actually prefer if the test was created as a single _"should render with correct border"_ test; this is really what the reader of your test needs to know in the end. Here all three properties are assessed together like so:
```
it('should render with correct border', () => {
  expect(element).toHaveComputedStyle({
    'border-width': '1px',
    'border-style': 'solid',
    'border-color': 'transparent'
  });
});
```

This makes the intention more clear and also saves some time writing tests. Should the test fail due to one of the properties being rendered with an unexpected value; the error message will display which property is wrong. 

We are aware that this requires a bit of gut feel. Testing for example if an element has `position: relative` & `background-color: #ffffff` would most likely not make sense. What would the test say? _Should have correction position and background-color_? There is really no relation between these two properties.

Testing the properties `position`, `left`, `right`, `bottom` and `top` could make better sense as it could be tested as _"should be positioned correctly"_. As an additional example `font-family`, `font-size`, `font-weight` & `font-style` could be tested as _"should have correct typography"_.

A rule of thumb is to test properties together whenever they have the same prefix such as `font-`. 
This will however not always be the case as can be seen in the positioning example.

## I have a question related to Kirby

<!-- This section is responsible for teaching contributors how to get help with Kirby, we should probably link to this section from the readme.md -->
We have **Kirby Open Office** every Tuesday and Thursday between 9:15 to 10:15. During these timeslots we will answer questions asked in the @kirby-design/kirby-guild slack channel and inquiry requests submitted on github. You are always welcome to ask questions outside these timeslots and we will answer it when we got time. 

**Do not send direct messages to members of team-kirby:** This is not because we do not want to talk to you - we however prefer questions to be asked in public, such that everyone can benefit from the answers. 

### Submit an inquiry request on github 

You should submit an inquiry request if __If what? What are we trying to achieve with inquiry requests that we do not get from the slack channel?__ 

To do this create a [new issue](https://github.com/kirbydesign/designsystem/issues/new/choose) using the inquiry-template. Make sure to read and fill out the template correctly, as this will ease our work in answering your question.

### Ask in the kirby-guild slack channel

You should ask a question in the @kirby-design/kirby-guild slack channel if: __Same question as above__. 

### Getting access to the #Kirby-guild slack channel

__instructions go here__

<!-- What would be a good way of making this more of an 'aside' thing? -->
