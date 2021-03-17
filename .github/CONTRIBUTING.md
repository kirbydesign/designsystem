<!-- We should probably link to this file in #kirby-guild -->
First of all - thank you for your interest in contributing to Kirby! 🥳
<!-- Early on show that we are here to help if necessary and to educate people in how to get help -->
If you at any point have any questions please read: [I have a question related to Kirby](#i-have-a-question-related-to-kirby)

- [Glossary](#glossary)
  - [Tech Refinement](#tech-refinement)
  - [UX review](#ux-review)
  - [Self review](#self-review)
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
  - [Self-review](#self-review)
  - [Pull-request](#pull-request)
  - [Test](#test)
- [I have a question related to Kirby](#i-have-a-question-related-to-kirby)
  - [Submit an inquiry request on github](#submit-an-inquiry-request-on-github)
  - [Ask in the kirby-guild slack channel](#ask-in-kirby-guild)

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

## The contribution model
<!-- This section has the purpose of explaining why we do it like we do, in order to have people 
symphatize with the process -->
- What are we trying to achieve with this contribution model
  - Issues for trackability and history
  - Why do we do Tech refinement
  - Why we do UX refinement
  - Why we do UX reviews
- General description of the contribution model

<!-- The following "I have/would" sections has the role of easily guiding the reader 
on how to do their specific task, and explain them what the process is for that task -->
### I have a component request 
<!--- Submit issue using the component request template--> 
If you got an idea for a component that you think should be part of Kirby you should: 
1. **Make sure you have read "[the good: issue](#issue)"** - following the guidelines in there eases the process and helps both you and team Kirby by avoiding common misunderstandings and gotchas we have experienced. 
2. **Open a new issue using the "component request"-template** - make sure to read through- and fill out the template. 
3. **Notify the #Kirby-guild slack channel to get it UX refined**
4. **Notify the #Kirby-guild slack channel to get it tech refined**  
- Contact kirby-guild to get it tech refined 
- If you would like to implement it:
  - please read the following before continuing: 
    - "[Setup environment and tooling for contribution](#setup-environment-and-tooling-for-contribution)" to get properly setup 
    - "[Creating pull-requests](#creating-pull-requests)" to get informed on how to most easily get your changes merged
  - assign yourself to the issue to signal to others you are working on it
  - if you at any point have questions while solving the issue please see: [I have a question related to Kirby](#i-have-a-question-related-to-kirby)

### I have an enhancement 
- Submit issue using the enhancement request template
  - please read "[the good: issue](#issue)"
- Contact kirby-guild to get it tech refined 
- If you would like to implement issue: 
  -please read: 
    - "[Setup environment and tooling for contribution](#setup-environment-and-tooling-for-contribution)" to get properly setup 
    - "[Creating pull-requests](#creating-pull-requests)" to get informed on how to most easily get your changes merged
  - assign yourself to the issue to signal to others you are working on it
  - if you at any point have questions while solving the issue please see: [I have a question related to Kirby](#i-have-a-question-related-to-kirby)

### I would like to report a bug 
- Submit issue using the bug template  
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
- Don't commit and exit - make sure to stay responsive and come back to answer comments on your code review

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

If you do not have access you should: __who should be contacted for access?__
