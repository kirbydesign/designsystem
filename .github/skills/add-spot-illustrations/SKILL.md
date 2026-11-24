---
name: add-spot-illustrations
description: Add spot illustrations from GitHub issues to Kirby and create pull requests. Finds all open spot illustration issues without an open PR, or uses the issue number provided. Use when asked to add spot illustrations.
---

Add spot illustrations from GitHub issues. If the user provides an issue number, `gh issue view <NUMBER> --repo kirbydesign/designsystem --json number,title,body` and process only that issue. Otherwise find all candidate issues.

## Find issues

1. `gh issue list --repo kirbydesign/designsystem --state open --search "illustration in:title" --limit 100 --json number,title,body` — the bodies are reused below; don't fetch issues again.
2. Keep issues whose body contains `<img ... src="https://github.com/user-attachments/assets/...">`. This drops feature requests and housekeeping issues.
3. `gh pr list --repo kirbydesign/designsystem --state open --limit 200 --json number,url,headRefName,body,closingIssuesReferences` — drop issues referenced by an open PR (in `closingIssuesReferences`, `#<NUMBER>` in the body, or `<NUMBER>` in the head branch).
4. List the remaining issues (number, title, asset names) to the user. Stop if none.

## Add assets

Collect assets from all issues. Create one branch and one PR covering all issues. This keeps changes to the shared registry in a single PR and avoids merge conflicts.

### Parsing assets

The asset name is the nearest non-empty line above each `<img>`, without `**`. Known formats:

- Single size: `**<name>.<size>**` + `<img>`
- Multiple sizes: `**<name>**` once, then `**small**`/`**medium**`/... + `<img>` per size. Combine as `<name>.<size>`.

Valid sizes are `small`, `medium`, `large` and `xlarge`. Skip and report any asset without a recognised size.

| Item         | Value                                                                       |
| ------------ | --------------------------------------------------------------------------- |
| SVG path     | `libs/extensions/angular/spot-illustration/src/svgs/<name>.<size>.svg`      |
| Registry     | `libs/extensions/angular/spot-illustration/src/spot-illustrations.ts`       |
| Entry        | `'<name>': { <key>: '<name>.<size>.svg' },` (`sm`/`md`/`lg`/`xl`), sorted  |
| Branch       | `feat/add-spot-illustrations-<NUMBERS>`                                     |
| Title prefix | `Spot Illustration`                                                         |

`<NUMBERS>` = issue numbers in ascending order joined with `-`, e.g. `feat/add-spot-illustrations-4922-4923`.

1. Extract name, size and image URL for each asset from the bodies already fetched. If an issue has none, stop and ask (single issue) or skip it and report it (multiple issues).
2. Skip assets already in the registry. Warn if name parts aren't kebab-case.
3. Checkout the branch, creating it from `develop` if it doesn't exist locally or remotely.
4. `curl -sL -H "Authorization: Bearer $(gh auth token)" "<URL>" -o "<SVG path>"` for each asset. Verify each file starts with `<svg`.
5. Add an entry per asset to the registry. If the name already exists, add the size key to the existing entry instead.
6. `git add <SVG dir> <registry> && git commit -m "Spot Illustration: Add <names> (fixes #<N1>, fixes #<N2>)" && git push -u origin <branch>`
7. If `gh pr list --head <branch> --state open --json url` finds a PR, report it. Otherwise `gh pr create --base develop --title "Spot Illustration: Add <names>" --body "Closes #<N1>, closes #<N2>" --assignee @me --label "feature"` and report the URL.
