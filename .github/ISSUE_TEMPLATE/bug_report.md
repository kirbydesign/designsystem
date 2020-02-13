---
name: Bug report
about: Create a report to help us improve
title: "[BUG]"
labels: NOT Prioritized, NOT Tech refined, bug
assignees: ''

---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Kirby version**

- [e.g. 0.0.55]

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Please complete the following information:**

- OS: [e.g. Windows, MacOS, iOS]
- Browser [e.g. Chrome, Safari]
- Version [e.g. 22]

**Additional context**
Add any other context about the problem here.

**Process around fixing and prioritization**
In order to fix bugs in a timely fashion please follow these few steps when relevant

*NOT Prioritized*
- [ ] Consider urgency of the Bug and be specific if it is blocking for your project. Describe any deadlines for the issue - eg. X needs this done by Y date, to be used in Z sprint. Suggest a milestone for the issue. The Not Prioritized will be removed by the Kirby team. If the bug has "low" priority it will be solved eventually - typically when working with the effected component in a different context.

*NOT Tech Refined*
- [ ] Sketch a solution in technical terms, that is how will the bug will be fixed. Call for a brief meeting or spend enough time with someone from @kirbydesign/kirby-guild to get a "go ahead". Remove NOT Tech Refined label. (Move issue from "Backlog" -> "Ready to do" on our [project board](https://github.com/kirbydesign/designsystem/projects/1)

*Solve*
- [ ] Move issue from "Ready to do" -> "in progress" on our [project board](https://github.com/kirbydesign/designsystem/projects/1)
- [ ] Create Fix Branch
- [ ] Create test reproducing the error
- [ ] Add any required mock and fakes to the `KirbyTestingModule`
- [ ] Fix
- [ ] If relevant [Update Examples and Showcase](https://cookbook.kirby.design/home/showcase/button)
- [ ] Push commits to GitHub
- [ ] Open a pull request (remember to add `closes #issueno` to the description) and ask @kirbydesign/kirby-guild for review
- Merge to master and delete branch
