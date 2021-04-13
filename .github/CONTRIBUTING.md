<!-- We should probably link to this file in #kirby-guild -->
First of all - thank you for your interest in contributing to Kirby! 🥳
<!-- Early on show that we are here to help if necessary and to educate people in how to get help -->
If you at any point have any questions please read: [I have a question related to Kirby](#i-have-a-question-related-to-kirby)

**Beware:** We reserve the right to close issues and pull-requests that does not follow the steps outlined in [the contribution model](#the-contribution-model). This is not because we want to be mean or micro-manage the way things are done - but a project of this size requires some consistency in the way we cooperate in order to be manageable. 

- [The contribution model](#the-contribution-model)
  - [I have a feature request](#i-have-a-feature-request)
  - [I have an enhancement](#i-have-an-enhancement)
  - [I would like to report a bug](#i-would-like-to-report-a-bug)
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

## The contribution model
<!-- This section has the purpose of explaining why we do it like we do, in order to have people 
symphatize with the process -->
- What are we trying to achieve with this contribution model
  - Cooperation! - UXers, tech people, and contributors should all be contributing to make the best possible design system
  - Issues for trackability and history
  - Why do we do Tech refinement?
  - Why we do UX refinement?
  - Why we do UX reviews?
  - Why do a self-review?
- General description of the contribution model

### Before you get coding
You should as a minimum skim through the "[the good](#the-good)"-section. This is because we are a lot of people working together on this project, all with varying prefrences both in terms of how we work and code. At the same time we strive for consistency in the Kirby codebase which might lead to some frustrations during code-reviews. In an effort to avoid this; we have attempted to specify our preferences on various subjects in that section. 

In the end, it might just save you some time. 

<!-- The following "I have/would" sections has the role of easily guiding the reader 
on how to do their specific task, and explain them what the process is for that task -->
### I have a component request 
<!--- Submit issue using the component request template--> 
If you got an idea for a component that you think should be part of Kirby you should follow these steps: 

1. **Open a [new issue](https://github.com/kirbydesign/designsystem/issues/new/choose) using the "component request"-template** (See guidelines on how to write [the good issue](#issue)).
2. **Get the issue kicked-off:**
    - Request that the issue is [UX refined](#ux-refinement) in [#kirby-guild](#getting-access-to-the-kirby-guild-slack-channel); do not proceed until this is done.
    - Request that the issue is [tech refined](#tech-refinement) in [#kirby-guild](#getting-access-to-the-kirby-guild-slack-channel); do not proceed until this is done.
    - Move the issue to the "Ready to do"-column in the "Kirby kan-ban board"-project.
3. **Get coding:**
    - For a smooth review process read [Before you get coding](#before-you-get-coding).
    - Signal to others you are working on the issue by assigning yourself to it.
    - Create a feature branch from the [master branch](https://github.com/kirbydesign/designsystem/tree/master). 
    - Publish a WIP implementation to Github as a draft PR and ask [#kirby-guild](#getting-access-to-the-kirby-guild-slack-channel) for feedback. <!--This will let you know early on if you are going in the right direction.-->
    - Make sure you have implemented unit tests following the [the good test](#test) guidelines.
    - Update the [cookbook](https://cookbook.kirby.design) with examples and showcases.
4. **Get your changes reviewed:**
    - Create a pull-request (see [creating pull-requests](#creating-pull-requests)).
    - Request that the pull-request is code-reviewed in #kirby-guild. <!--Please stay responsive to comments and suggestions that might be submitted.-->
    - Request that the pull-request is [UX reviewed](#ux-review).
    - When the pull-request has been approved it will be automatically merged to master via [automerge](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/automatically-merging-a-pull-request).
5. **Celebrate! 🎉**

### I have an enhancement 
If you have an idea for Kirby that is not a brand new component or aimed at improving code quality; then you should submit an enhancement request!
The process is the same as submitting a component request just using another issue-template: 

1. **Open a [new issue](https://github.com/kirbydesign/designsystem/issues/new/choose) using the "enhancement request"-template** (See guidelines on how to write [the good issue](#issue)).
2. **Follow steps 2 to 5 in [i have a component request](#i-have-a-component-request).**


<!--- Submit [new issue](https://github.com/kirbydesign/designsystem/issues/new/choose) using the enhancement request template
  - please read "[the good: issue](#issue)"
- Contact kirby-guild to get it tech refined 
- If you would like to implement issue: 
  -please read: 
    - "[Setup environment and tooling for contribution](#setup-environment-and-tooling-for-contribution)" to get properly setup 
    - "[Creating pull-requests](#creating-pull-requests)" to get informed on how to most easily get your changes merged
  - assign yourself to the issue to signal to others you are working on it
  - if you at any point have questions while solving the issue please see: [I have a question related to Kirby](#i-have-a-question-related-to-kirby)-->

### I would like to report a bug 
- Submit [new issue](https://github.com/kirbydesign/designsystem/issues/new/choose) using the bug template  
  - please read "[the good: issue](#issue)"
- Contact kirby-guild to get it verified 
  - we verify because it might be a feature not a bug 🐛
- If you would like to implement issue: 
  -please read: 
    - "[Setup environment and tooling for contribution](#setup-environment-and-tooling-for-contribution)" to get properly setup 
    - "[Creating pull-requests](#creating-pull-requests)" to get informed on how to most easily get your changes merged
  - assign yourself to the issue to signal to others you are working on it
  - if you at any point have questions while solving the issue please see: [I have a question related to Kirby](#i-have-a-question-related-to-kirby)

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

