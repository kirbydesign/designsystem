<!-- We should probably link to this file in #kirby-guild -->
First of all - thank you for your interest in contributing to Kirby! 🥳
<!-- Early on show that we are here to help if necessary and to educate people in how to get help -->
If you at any point have any questions please read: [I have a question related to Kirby](#i-have-a-question-related-to-kirby)

**Beware:** We reserve the right to close issues and pull-requests that does not follow the steps outlined in [the contribution model](#the-contribution-model). This is not because we want to be mean or micro-manage the way things are done - but a project of this size requires some consistency in the way we cooperate in order to be manageable. 

- [Introduction to the contribution model](#introduction-to-the-contribution-model)
  - [Checklist: I have a component request](#checklist-i-have-a-component-request)
  - [Checklist: I have an enhancement](#checklist-i-have-an-enhancement)
  - [Checklist I would like to report a bug](#checklist-i-would-like-to-report-a-bug)
- [Setup environment and tooling for contribution](#setup-environment-and-tooling-for-contribution)
  - [Clone and install repository](#clone-and-install-repository)
  - [Node](#node)
  - [Tslint](#tslint)
  - [Prettier](#prettier)
- [Creating pull-requests](#creating-pull-requests)
  - [Before you submit](#before-you-submit)
  - [After you submit](#after-you-submit)
- [The good:](#the-good:)
  - [Issue](#issue)
  - [Commit](#commit)
  - [Self-review](#self-review)
  - [Pull-request](#pull-request)
  - [Test](#test)
- [I have a question related to Kirby](#i-have-a-question-related-to-kirby)
  - [Submit an inquiry request on github](#submit-an-inquiry-request-on-github)
  - [Ask in the kirby-guild slack channel](#ask-in-kirby-guild)
- [Glossary](#glossary)
  - [Tech Refinement](#tech-refinement)
  - [UX review](#ux-review)
  - [Self review](#self-review)

## Introduction to the contribution model
<!-- Introduction and motivation -->
Despite Kirby stemming from an internal Bank Data project - it has been decided to open source it, such that others than team Kirby can contribute to it. 
Allowing for Kirby to be used in multiple projects without team Kirby being the bottleneck. 

If you have a problem, an issue you want resolved, or even got brand new ideas for components. Well. There is no need to sit around and wait for team Kirby to get it implemented. 
You can contribute yourself! And no matter your role, you can probably contribute with something. May it be a helpful comment or a bug report.

We think that is neat. 

There is still need for managing Kirby however. We need to make sure that the project is moving in the right direction. That submitted code is: high quality, not duplicating anything and consistent with the rest of the codebase.
To do so a series of steps has been created that an issue must go through. All of these aim at making sure that the process of cooperating from idea to implementation is smooth for contributors. With as little time wasted as possible.

<!-- General description of the contribution model -->
In broad strokes the process is: 
1. submit an issue 
2. get it refined 
3. implement a solution 
4. get the solution reviewed and approved

Once a pull-request has been approved it will be automatically merged. 

Actionable checklists for these steps can be found [here](#checklist-i-have-a-component-request). The following highlight some of the steps in the checklists, to explain what they are and why they exist: 

<!-- Why we do UX refinement?-->
<dl>
<dt>UX Refinement</dt> 
<dd>Every issue must be UX refined before implementation - unless it does not involve any visual changes. This consists of UXers planning how the issue can be solved in a way that aligns with the design system. The `NOT UX refined`-label will be removed from the issue by team Kirby, once this has been done. If a pull-request with visual changes is submitted for an issue that has not been UX refined; the UX review process may result in a bunch of changes, that can delay the process of getting your PR approved.</dd>

<!--- Why do we do Tech refinement? -->
<dt>Tech Refinement</dt> 
<dd>Every issue must be tech refined. Here it is discussed and agreed on how an issue should be implemented the best; the agreed upon solution should be documented in a comment on the issue. How long it takes depends on the scope of the issue. For small issues it might be nothing more than an agreement via a direct message. Other times it is a full-blown meeting with multiple participants. Once the issue has been properly tech refined Team Kirby will remove the `NOT Tech refined`-label from the issue. <em>No code should be written before this step is complete</em>. If a pull-request is submitted for an issue that has not been tech refined; changes and problems that could have been tackled from the beginning, might arise from the code-review.</dd>

<dt>Publish a WIP draft</dt> 
<dd>We encourage contributors to publish a draft pull-request with a WIP implementation of their issue to get feedback. This can advantageously be done before tests are written. By doing this misunderstandings and issues can be tackled early on; here they are often easier to correct. If this is not done, they might not be discovered until the code-review. Tests might have to be changed. So therefore we encourage contributors to use the opportunity to get some timely feedback.</dd>

<!-- Why do a self-review? -->
<dt>Self-review</dt> 
<dd>This consists of code-reviewing your own pull-request, following guidelines found in: [The good self review](#self-review). This is your chance to catch any low-hanging fruits and common issues before the reviewer does. If this is not done, an unneccessar amount of minor changes might be required during code review. This wastes both yours and the reviewers time.</dd>

<!-- Why we do UX reviews? -->
<dt>UX review</dt> 
<dd>If the implementation of the issue resulted in visual changes - then it has to be UX reviewed. This is to make sure that the introduced changes align with the design system. We strive to have every issue that introduces visual changes UX reviewed. If this is not done and the changes are merged to master, we might recieve issues about components not being properly aligned with the design system anymore from the users of Kirby.</dd>
</dl>

Our experience is that pull-requests with a troublesome and drawn out review process has not followed one or more of these steps. 

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
    - Create a pull-request (see: "[Creating pull-requests](#creating-pull-requests)").
    - Request that the pull-request is code-reviewed in [#kirby-guild](#getting-access-to-the-kirby-guild-slack-channel).
    - Request that the pull-request is [UX reviewed](#ux-review).
    - When the pull-request has been approved it will be automatically merged to master via [automerge](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/automatically-merging-a-pull-request).
5. **Celebrate! 🎉**

### Checklist: I have an enhancement 
If you have an idea for Kirby that is not a brand new component or aimed at improving code quality; then you should submit an enhancement request!
The process is the same as submitting a component request just using another issue-template: 

1. **Open a [new issue](https://github.com/kirbydesign/designsystem/issues/new/choose) using the "enhancement request"-template** (See: "[The good: Issue](#issue)").
2. **Follow steps 2 to 5 in "[I have a component request](#i-have-a-component-request)".**

### Checklist: I would like to report a bug 
If you have found a bug in Kirby you should follow these steps: 
1. **Report it by opening a [new issue](https://github.com/kirbydesign/designsystem/issues/new/choose) using the "bug report"-template** (See: "[The good: Issue](#issue)").
2. **Get the bug verified** 
    - To make sure the bug is not intended behaviour contact [#kirby-guild](#getting-access-to-the-kirby-guild-slack-channel) to have it verified; do not proceed until this is done. 
3. **Implementation:**: 
    - Signal to others you are working on the issue by assigning yourself.
    - Create a "fix"-branch from the [master branch](https://github.com/kirbydesign/designsystem/tree/master). 
    - Create a test that reproduces the bug following guidelines in: "[The good: Test](#test)". 
    - Write code to fix the bug
5. **Follow steps 4 and 5 in "[I have a component request](#i-have-a-component-request)".**

## Setup environment and tooling for contribution
<!-- The following section is responsible for teaching people how to get setup with 
the repo such that they can get coding -->

### Clone and install repository 
- how to clone and get going with the kirby repo

### Node 
- Which version should people use, and perhaps a recommendation on which tool people can use to manage versions. 

### Tslint 
- People should make sure to have it enabled to avoid unnecessary comments during code review

### Prettier
- It is a good idea to use format-on-save

## Creating pull-requests 
<!-- This section is responsible for guiding contributors on how they should submit pull-requests in a way that ensures the most swift process and teach them how to catch low-hanging issues there might come up in code-review. -->

### Before you submit  
- Make sure you have completed the steps in: [Setup tooling for contribution](#setup-tooling-for-contribution)
- Make sure you have written tests according to the guidelines described in [The good: test](#test)
- Do a self-review <!-- We could link to self-review in the templates and have people check it off? -->

### After you submit 
- Post in Kirby-guild 
- Code reviews are meant to align your code with existing code 
  - While your implementation might be perfectly valid, we are aiming for uniformity across the codebase. 
- Please don't fire & forget, i.e. commit & run - make sure to stay responsive and come back to answer comments on your code review :)
## The good:
<!-- The following sections have the responsibility of explaining contributors our best pratices such that they can more easily have their changes implemented in kirby --> 
<!-- Ideally we should be able to refer to these sections if people break the guidelines in their issue or pull-requests, to make sure we are all preaching the same guidelines -->

### Issue 
- General properties we are looking for and how to achieve them 
  - Readability 
  - Easily understandable 
    - No internal lingo 
  - Proof-read
  - Self-contained
    - Screenshots if necessary
    <!-- I think the following point is important if Kirby is to be spread out amongst several teams -->
    - Don't assume people have knowledge outside of Kirby - contributors might come from many different projects 

### Commit
- Focus on one thing per commit 
- Keep changes as small as possible 
- Only commit related functinoality for each commit 
- Commit often
- Strive for each commit to compile/build and pass tests 
- Use [gitmoji](https://gitmoji.dev) when possible - point to VSCode extension and CLI tool
- sidenote: when merging the CI pipeline combines each commit to a merge commit containing all commit messages

### Self-review 
- Don't change files that is not related to your pull-request
  - for example don't reorder imports in files that is not directly related to the issue at hand
- Check for unused imports
- Other self review points go here

### Pull-request
- How is a pull-request that is easily reviewed constructed?

### Test
- How should testing be done 

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
## Glossary 
Some of the terms used in the context of Kirby might be unfamiliar or have a different meaning in the context of this project. 
Therefore to avoid misconceptions and misunderstandings this section explains these terms - please let us know, if there are any terms in the context of Kirby you think should be added to this list.
### UX Refinement
- Explain what UX refinement is 
### Tech Refinement
- Explain what tech refinement is
### UX review 
- Explain what an UX review is
### Self review 
- Explain what a self review is

