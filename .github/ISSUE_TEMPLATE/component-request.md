---
name: Component request
about: Suggest a new component for Kirby Design System
title: "[COMPONENT] "
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
- [ ] Implement Skeleton Component:
    - [ ] Web implementation
    - [ ] {N} implementation
- [ ] [Implement Examples and Showcase](https://cookbook.kirby.design/home/showcase/button)
- [ ] Add link to showcase on Kirby Component Status (`component-status-items.ts => code.cookbookUrl`)
- [ ] Also remove `githubIssueNo` and set `status` to `ItemCodeStatus.ready`
- [ ] Push commits to GitHub
### Review:
- [ ] Open a pull request (remember to add `closes #issueno` to the description) and ask @kirbydesign/kirby-guild for review
- Merge to master and delete branch
