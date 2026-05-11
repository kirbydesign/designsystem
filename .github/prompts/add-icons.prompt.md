---
agent: agent
description: Read a GitHub issue and produce a ready-to-merge PR that adds SVG icons to Kirby.
---

Add icons from GitHub issue number provided by the user:

1. `gh issue view <NUMBER> --repo kirbydesign/designsystem --json number,title,body` — extract each icon's name and asset URL from the body. Stop and ask if none found.
2. Skip any name already in `libs/designsystem/icon/src/kirby-icon-settings.ts`. Warn if names are not kebab-case.
3. Checkout `feat/add-icons-<NUMBER>`, creating it from `develop` if it doesn't exist locally or remotely.
4. `curl -sL -H "Authorization: Bearer $(gh auth token)" "<URL>" -o "libs/designsystem/icon/src/icons/svg/<name>.svg"` for each icon. Verify each file is non-empty.
5. Add `{ name: '<name>', svg: '<name>.svg' },` for each icon inside the `sortIconsByName([...])` array in `libs/designsystem/icon/src/kirby-icon-settings.ts`.
6. `git add libs/designsystem/icon/src/icons/svg/ libs/designsystem/icon/src/kirby-icon-settings.ts && git commit -m "Icon: Add <names> (fixes #<NUMBER>)" && git push -u origin feat/add-icons-<NUMBER>`
7. Check for an existing open PR: `gh pr list --head feat/add-icons-<NUMBER> --state open --json number,url`. If found, report that URL. Otherwise `gh pr create --base develop --title "Icon: Add <names>" --body "Closes #<NUMBER>" --assignee @me --label "feature"` and report the new URL.
