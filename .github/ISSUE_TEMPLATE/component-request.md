---
name: Component request
about: Suggest a new component for Kirby Design System
title: "[COMPONENT] "
labels: NOT Prioritized, NOT Tech refined, NOT UX refined, component
assignees: ''

---

**Mandatory steps to ensure alignment between stakeholders and the progression of Kirby**
In order to ensure steady progress and quality of Kirby, please follow our outlined process. By default three labels are added to new component issues and enhancements. To help Kirby please follow these steps, and remove the labels from the issue when done.

*NOT Prioritized*
- [ ] Describe any deadlines for the issue - eg. X needs this done by Y date, to be used in Z sprint. Suggest a milestone for the issue. The Not Prioritized will be removed by the Kirby team. 

*NOT UX Refined*
- [ ] Make sure the new Component, has a name, can be found in Zeplin, and is used in minimum one reviewed screen. Remove NOT UX Refined label and add links to Zeplin.

*NOT Tech Refined*
- [ ] Sketch a solution in technical terms, that is how will the component by build - eg. build it from scratch or build using X Ionic component. Call for a brief meeting or spend enough time with someone from @kirbydesign/kirby-guild to get a "go ahead". Remove NOT Tech Refined label.

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here, e.g. a link to the corresponding component from [Ionic](https://ionicframework.com/docs/components/)

## Tasks

### Kick Off:

- [ ] Accept Feature incl. name of component (DSL)
- [ ] Update Kirby Component Status and publish to [Kirby Cookbook](https://cookbook.kirby.design)

### Code:

- [ ] Create Feature Branch
- [ ] Implement Skeleton Component
- [ ] Add any required mock and fakes to the `KirbyTestingModule`
- Ask UX for review:
  - [ ] Ensure implementation is correct in relation to UX design
  - [ ] Define the version of the implementation + steps needed to reach version 1.0 (create [enhancement requests](https://github.com/kirbydesign/designsystem/issues/new?assignees=&labels=enhancement&template=enhancement-request.md&title=%5BEnhancement%5D))
- [ ] [Implement Examples and Showcase](https://cookbook.kirby.design/home/showcase/button)
- [ ] Add link to showcase on Kirby Component Status (`component-status-items.ts => code.cookbookUrl`)
- [ ] Also remove `githubIssueNo` and set `status` to `ItemCodeStatus.ready`
- [ ] Push commits to GitHub

### Review:

- [ ] Open a pull request (remember to add `closes #issueno` to the description) and ask @kirbydesign/kirby-guild for review
- Merge to master and delete branch
