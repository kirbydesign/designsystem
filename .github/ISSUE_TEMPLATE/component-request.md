---
name: Component request
about: Suggest a new component for Kirby Design System
title: '[COMPONENT] '
labels: component
assignees: ''
---

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
