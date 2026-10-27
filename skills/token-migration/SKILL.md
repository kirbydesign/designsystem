---
name: token-migration
description: Migrates consumer code from Kirby's legacy color tokens (--kirby-primary, --kirby-white, --kirby-text-color-*, get-color(), interaction-state mixins) to the semantic surface tokens (--kirby-color-fill|content|border-*, kirby-surface-* classes). Use when the user wants to migrate, upgrade or convert to the new Kirby design tokens, or mentions legacy/old Kirby colors, surfaces, or interaction-state in an app built on @kirbydesign/designsystem.
---

# Kirby token migration

Migrates custom components in a consumer app to the new Kirby tokens, one component at a time. Legacy tokens are still emitted, so the app works throughout.

**Core rule: never re-tokenize something that could be a Kirby component without asking.** If custom UI looks like a Kirby component, stop and ask the user before changing that file.

## Workflow

Copy this checklist and track progress:

```
- [ ] 1. Check prerequisites
- [ ] 2. Scan
- [ ] 3. For each component: check for Kirby lookalikes → ask
- [ ] 4. For each component: migrate
- [ ] 5. Verify
- [ ] 6. Report
```

### 1. Check prerequisites

`node_modules/@kirbydesign/core/src/scss/themes/default-brand.css` must exist. If it does not, the installed Kirby version has no new tokens: stop and tell the user to upgrade first. Read that file whenever you need to confirm a token exists.

### 2. Scan

```bash
node <skill-dir>/scripts/find-legacy-tokens.mjs <src-dir>
```

Categories: `lookalike` (possible Kirby component), `override` (assignments to Kirby variables), `token` (legacy CSS variable), `scss` (legacy functions/mixins), `typescript` (legacy color helpers), `hardcoded` (literal colors). `⇒ var(--kirby-color-…)` marks a no-brainer replacement. Use `--json` for machine-readable output, `--all-lookalikes` to also list lookalikes in files without other findings.

Group findings by component (directory) and work through them one at a time. With more than a handful, ask the user which components or folders to start with.

### 3. Check for Kirby lookalikes – ask before you migrate

For each component, consider the scanner's `lookalike` findings **and** your own reading of the template and styles. Compare against [references/kirby-lookalikes.md](references/kirby-lookalikes.md).

If the component (or a part of it) could be a Kirby component, **stop before editing it** and ask the user with the question tool:

- **Replace with `<kirby-…>`** – explain which inputs cover the custom behavior and what might not be covered.
- **Migrate tokens anyway** – keep the custom implementation.
- **Skip for now** – leave the file unchanged and list it in the report.

Ask once per candidate. Never replace a component without an explicit "replace" answer. On "replace": check the component's API in the installed package or the Cookbook, swap the markup, and delete the custom styles that Kirby now covers.

### 4. Migrate

For each remaining finding:

1. **Decide the surface.** Does the component establish an area (panel, card, sidebar) or is it a control on one? Containers get a `kirby-surface-*` class and use `-base` tokens. Controls use `-raised`/`-brand-loud` tokens. See [references/patterns.md](references/patterns.md#surfaces).
2. **Map each color by role**, not by name, using [references/token-mapping.md](references/token-mapping.md). Pair fill, content and border with the same role and emphasis. Apply no-brainers (`⇒` in the scanner output) directly.
3. **Migrate the old theming system.** Replace reads of `--kirby-inputs-*`/`--kirby-divider-color` with the mapped tokens. Assignments to them (and to legacy palette tokens such as `--kirby-primary`) no longer affect Kirby components – find the intent (usually a surface class) instead of keeping them. See [token-mapping.md](references/token-mapping.md#input-theme-variables).
4. **Keep component variable overrides** (`--kirby-card-*`, `--kirby-button-*`, …), including custom colors. Only migrate a legacy value; replace it when a no-brainer exists, otherwise ask. See [token-mapping.md](references/token-mapping.md#component-variable-overrides).
5. **Convert states:** `interaction-state.*` → `utils.hover` + `&:active` with `-hover`/`-active` tokens; disabled → `opacity: 0.4`; focus/error → ring variables. See [patterns.md](references/patterns.md).
6. **Replace color math and dark-context hacks:** `color-mix()` instead of Sass color functions, surface classes instead of `.kirby-color-brightness-*`.
7. Leave spacing, typography, radius and z-index tokens alone. Keep elevation for floating elements only; resting elements get a quiet border instead (see patterns.md).

When the mapping is ambiguous (decoration colors, brand colors used as accents, overlays, TS color helpers), **ask the user** – don't guess. If they can't decide now, leave the legacy token with a `// TODO(design-tokens): …` comment.

### 5. Verify

- Re-run the scanner on the migrated paths: no `token`/`scss` findings and no `override` findings with `⇒` left (except agreed TODOs).
- Build the app or run its style lint to catch broken SCSS.
- If the project has Storybook or a dev server, check the component on all three surfaces by wrapping it in `kirby-surface-base`, `-raised` and `-brand` containers, including hover, active, focus and disabled.

### 6. Report

Summarize per component: migrated, replaced with Kirby (which component), skipped, kept component overrides, removed dead overrides, open questions/TODOs, and visual changes the user should review (borders instead of shadows, opacity for disabled, new link colors).

## Anti-patterns

- Search-and-replace of one legacy token with one new token: the same legacy token maps to different tokens by context.
- Hardcoding a surface's value (e.g. `--kirby-system-color-white-00` or `--kirby-brand-color-*` primitives) instead of a semantic `--kirby-color-*` token.
- Mixing legacy and new color tokens in one component.
- Styling Kirby components' internals (`::ng-deep`, internal class names, Ionic parts) instead of their inputs (`variant`, `attentionLevel`, `themeColor`) or public component variables.
- Trusting the `kirby/use-design-tokens` stylelint autofix – it rewrites `get-color()` to _legacy_ tokens.
