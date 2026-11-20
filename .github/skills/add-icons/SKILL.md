---
name: add-icons
description: Add SVG icons or spot illustrations from GitHub issues to Kirby and create pull requests. Finds all open icon/spot illustration issues without an open PR, or uses the issue number provided. Use when asked to add icons or spot illustrations.
---

Add icons or spot illustrations from GitHub issues. If the user provides an issue number, `gh issue view <NUMBER> --repo kirbydesign/designsystem --json number,title,body` and process only that issue. Otherwise find all candidate issues.

## Find issues

1. `gh issue list --repo kirbydesign/designsystem --state open --search "icon OR illustration in:title" --limit 100 --json number,title,body` — the bodies are reused below; don't fetch issues again.
2. Keep issues whose body contains `<img ... src="https://github.com/user-attachments/assets/...">`. This drops feature requests and housekeeping issues.
3. `gh pr list --repo kirbydesign/designsystem --state open --limit 200 --json number,url,headRefName,body,closingIssuesReferences` — drop issues referenced by an open PR (in `closingIssuesReferences`, `#<NUMBER>` in the body, or `<NUMBER>` in the head branch).
4. List the remaining issues (number, title, asset names) to the user. Stop if none.

## Add assets

Collect assets from all issues and group them by type. Create one branch and one PR per type, covering all issues of that type. This keeps changes to the shared registry in a single PR and avoids merge conflicts.

### Parsing assets

The asset name is the nearest non-empty line above each `<img>`, without `**`. Known formats:

- Icon: `<name>` as plain text + `<img>` (e.g. `bold`, #4939)
- Spot illustration: `**<name>.<size>**` + `<img>`
- Spot illustration: `**<name>**` once, then `**small**`/`**medium**`/... + `<img>` per size. Combine as `<name>.<size>`.

|              | Icon                                                     | Spot illustration                                                             |
| ------------ | -------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Detect       | default                                                  | name ends with `.small`, `.medium`, `.large` or `.xlarge` after parsing        |
| SVG path     | `libs/designsystem/icon/src/icons/svg/<name>.svg`        | `libs/extensions/angular/spot-illustration/src/svgs/<name>.<size>.svg`        |
| Registry     | `libs/designsystem/icon/src/kirby-icon-settings.ts`      | `libs/extensions/angular/spot-illustration/src/spot-illustrations.ts`         |
| Entry        | `{ name: '<name>', svg: '<name>.svg' },`                 | `'<name>': { <key>: '<name>.<size>.svg' },` (`sm`/`md`/`lg`/`xl`), sorted     |
| Branch       | `feat/add-icons-<NUMBERS>`                               | `feat/add-spot-illustrations-<NUMBERS>`                                       |
| Title prefix | `Icon`                                                   | `Spot Illustration`                                                           |

`<NUMBERS>` = issue numbers in ascending order joined with `-`, e.g. `feat/add-spot-illustrations-4922-4923`.

1. Extract name and image URL for each asset from the bodies already fetched. If an issue has none, stop and ask (single issue) or skip it and report it (multiple issues).
2. Pick the type from the table. Skip assets already in the registry. Warn if name parts aren't kebab-case.
3. Checkout the branch, creating it from `develop` if it doesn't exist locally or remotely. Do steps 3–7 per type and return to `develop` in between.
4. `curl -sL -H "Authorization: Bearer $(gh auth token)" "<URL>" -o "<SVG path>"` for each asset. Verify each file starts with `<svg`.
5. Add an entry per asset to the registry. For spot illustrations, add the size key to an existing entry if the name already exists.
6. `git add <SVG dir> <registry> && git commit -m "<Title prefix>: Add <names> (fixes #<N1>, fixes #<N2>)" && git push -u origin <branch>`
7. If `gh pr list --head <branch> --state open --json url` finds a PR, report it. Otherwise `gh pr create --base develop --title "<Title prefix>: Add <names>" --body "Closes #<N1>, closes #<N2>" --assignee @me --label "feature"` and report the URL.
