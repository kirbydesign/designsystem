---
name: Enhancement request
about: Suggest an idea for this project
title: "[Enhancement]"
labels: New, NOT Prioritized, NOT Tech refined, NOT UX refined, enhancement
assignees: ''

---

<!--**Mandatory steps to ensure alignment between stakeholders and the progression of Kirby**-->

<!--In order to ensure steady progress and quality of Kirby, please follow our outlined process. By default three labels are added to new component issues and enhancements. To help Kirby please follow these steps, and remove the labels from the issue when done.-->

<!--*NOT Prioritized*-->
<!--Describe any deadlines for the issue - eg. X needs this done by Y date, to be used in Z sprint. Suggest a milestone for the issue. The `Not Prioritized` label will be removed by the Kirby team. -->

<!--*NOT UX Refined*-->
<!--Make sure the new Component, has a name, can be found in Zeplin, and is used in minimum one reviewed screen. Remove the `NOT UX Refined` label and add links to Zeplin.-->

<!--*NOT Tech Refined*-->
<!--Sketch a solution in technical terms, that is how will the component be enhanced - eg. build it from scratch or build using X Ionic component. Call for a brief meeting or spend enough time with someone from @kirbydesign/kirby-guild to get a "go ahead". Remove the `NOT Tech Refined` label.-->


**Please add a short description of your enhancement request**
A clear and concise description of what the enhancement is. I.e: I would like Component X to be able to [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or enhancement you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.

## Tasks

### Kick Off:

- [ ] Ensure the enhancement is `UX refined` and aligned with UX 
_The component and/or enhancement should be published and available in the [Kirby Styleguide on Zeplin](https://zpl.io/258pXGj)_
- [ ] Ensure the enhancement has been `Tech refined` with @kirbydesign/kirby-guild and this issue is updated with a clear implementation description  
_This issue should be in the [Ready to do](https://github.com/kirbydesign/designsystem/projects/1#column-4590936) column of the [Kirby kan-ban board](https://github.com/kirbydesign/designsystem/projects/1) before starting implementation)_
- [ ] Assign yourself to this issue and move it to the [In progress](https://github.com/kirbydesign/designsystem/projects/1#column-4590937) column of the [Kirby kan-ban board](https://github.com/kirbydesign/designsystem/projects/1)

### Code:

- [ ] Create Feature Branch from [master branch](https://github.com/kirbydesign/designsystem/tree/master)
- [ ] Create a draft implementation and push to Github
- [ ] Ask a member of @kirbydesign/kirby-guild for a WIP review by creating a draft Pull Request
- [ ] Implement unit tests
- [ ] Update Cookbook Examples and Showcase, i.e. see [Radio](https://cookbook.kirby.design/home/showcase/radio)  
_Also remember to add any relevant new API documentation_

### Review:

- UX review:
  - [ ] Ensure implementation is correct in relation to the UX design and the [Kirby Styleguide on Zeplin](https://zpl.io/258pXGj)
  - [ ] With UX agree on the version of the implementation
- Code review:
  - [ ] Open a pull request (or mark the existing draft PR as `Ready for review`) and ask @kirbydesign/kirby-guild for a review  
_Remember to add `closes #issueno` to the description of the PR._
  - [ ] Once approved, merge feature branch/PR to master
- [ ] Ask a member of @kirbydesign/kirby-guild to add a link to component showcase from Kirby Component Status and update the version number

:tada: Celebrate
