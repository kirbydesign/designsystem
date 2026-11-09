---
name: kirby-custom-component
description: Builds new and converts existing custom components that look like Kirby components (lookalikes) with Kirby's semantic color tokens (--kirby-color-fill|content|border-*, kirby-surface-* classes) – as a last resort, after ruling out using, configuring or composing existing Kirby components. Use when the user wants custom UI that resembles a Kirby component (card, button, chip, tabs, dropdown …), wants to convert a hand-rolled one from legacy Kirby colors (--kirby-primary, get-color(), interaction-state) to the new tokens, or says Kirby doesn't have the component they need, in an app built on @kirbydesign/designsystem.
---

# Kirby custom components

Custom UI that looks like a Kirby component duplicates styling, states and accessibility that Kirby already maintains. This skill makes sure such a component is only built – or kept – when no Kirby component can do the job, and that it then follows Kirby's token system.

**Core rule: a custom lookalike is the last resort.** Climb the component ladder first, and never build or re-tokenize a lookalike without the user's explicit go-ahead.

**Only semantic color tokens.** Custom components use `--kirby-color-*` tokens for color. The color primitives behind them (`--kirby-brand-color-*`, `--kirby-system-color-*`) are out of scope: they are not part of Kirby's semantic versioning and may be renamed or removed in any release. If no semantic token fits, ask the user – don't fall back to a color primitive. All other tokens (opacity, spacing, font, radius …) are fine to use.

## Workflow

Copy this checklist and track progress:

```
- [ ] 1. Check prerequisites
- [ ] 2. Find candidates
- [ ] 3. Climb the component ladder → ask
- [ ] 4. Build or convert with tokens (only if approved)
- [ ] 5. Verify
- [ ] 6. Report
```

### 1. Check prerequisites

Find the token file of the installed Kirby version, `@kirbydesign/core/scss/themes/default-brand.css`. `@kirbydesign/core` is installed with `@kirbydesign/designsystem`, but is not always hoisted to the top of `node_modules`. Look in `node_modules/@kirbydesign/core/` first, then in `node_modules/.pnpm/@kirbydesign+core@*/node_modules/@kirbydesign/core/` (pnpm).

The package directory you find is `<kirby-core>` in the references. If the file is not found, the installed Kirby version has no semantic tokens: stop and tell the user to upgrade first. Read that file whenever you need to confirm a token exists.

### 2. Find candidates

- **Creating new UI:** the candidate is what the user asked for. Write down what it must look like and do (content, variants, states, interaction) – that is what you check Kirby against.
- **Converting existing UI:** run the scanner:

  ```bash
  node <skill-dir>/scripts/find-lookalikes.mjs <src-dir>
  ```

  It lists `lookalike` findings (possible Kirby components), plus styling in the same directories that needs converting: `override`, `color-primitive`, `token`, `scss`, `typescript`, `hardcoded`. `⇒ var(--kirby-color-…)` marks a no-brainer replacement. Use `--all-findings` to get styling findings outside lookalike directories (e.g. when the user names a component the heuristics miss) and `--json` for machine-readable output. Also read templates and styles yourself – the scanner only matches names and native controls. Look especially for groups of `kirby-item` outside `kirby-card`/`kirby-list`: items no longer have a background of their own (see [kirby-lookalikes.md](references/kirby-lookalikes.md#items)).

  Work through one component at a time. With more than a handful, ask the user which ones to start with.

### 3. Climb the component ladder – ask before you build

For each candidate, go through the ladder in [references/kirby-lookalikes.md](references/kirby-lookalikes.md) and stop at the first step that fits:

1. **Use** a Kirby component as is.
2. **Configure** it with its inputs, variants, slots and surface classes.
3. **Compose** it from several Kirby components in a thin wrapper that only adds layout.
4. **Customize** a Kirby component through its public component variables (`--kirby-card-*`, `--kirby-button-*` …).
5. **Custom lookalike** with tokens – only if steps 1–4 can't do it.

Verify every candidate component and input in the installed package or the Cookbook – don't guess. Then ask the user, recommending the lowest step that fits:

- **Use/configure `<kirby-…>`** – which inputs cover the needed behavior, and what (if anything) is not covered.
- **Compose from Kirby components** – which ones, and what the wrapper does.
- **Customize `<kirby-…>` via component variables** – which `--kirby-<component>-*` variables, and their values.
- **Build/keep a custom component with tokens** – what Kirby is missing that makes this necessary.
- **Skip for now** (converting only) – leave the file unchanged and list it in the report.

If the user picks a Kirby component (ladder steps 1–3), swap the markup, delete the custom styles Kirby now covers and, once unused, the custom component. If they pick customizing (ladder step 4), set the component variables on the Kirby component and delete the custom styles they replace. Only continue to workflow step 4 (Build or convert with tokens) on an explicit "custom" answer, and record the reason the user accepted.

### 4. Build or convert with tokens

Only for approved custom components:

1. **Decide the surface.** A container (panel, card, sidebar) gets a `kirby-surface-*` class and uses `-base` tokens. A control on a surface uses `-raised`/`-brand-loud` tokens. See [references/patterns.md](references/patterns.md#surfaces).
2. **Pick colors by role**, not by name, using the token anatomy in [references/token-mapping.md](references/token-mapping.md) – `--kirby-color-*` only. Pair fill, content and border with the same role and emphasis. When converting, map each legacy color and each color primitive by the role it plays and apply no-brainers (`⇒`) directly.
3. **Style every state** the Kirby equivalent has: `utils.hover` + `&:active` with `-hover`/`-active` tokens, focus and error rings, disabled → `opacity: var(--kirby-opacity-40)`. See [patterns.md](references/patterns.md#hover-and-active).
4. **Match Kirby's look** with Kirby's spacing, radius and typography tokens/classes (see the `consumer` skill). When converting, leave those tokens alone. Use elevation for floating elements only; resting elements get a quiet border.
5. **Converting only:** replace `interaction-state.*`, Sass color math (→ `color-mix()`), dark-context hacks (→ surface classes) and reads of `--kirby-inputs-*`/`--kirby-divider-color`. Keep overrides of Kirby component variables and migrate only their legacy values. See [token-mapping.md](references/token-mapping.md#input-theme-variables).

When the mapping is ambiguous (decoration colors, brand colors used as accents, overlays, TS color helpers), **ask the user** – don't guess. If they can't decide now, leave the legacy token with a `// TODO(design-tokens): …` comment.

### 5. Verify

- Re-run the scanner on the changed paths with `--all-findings`: no `color-primitive`/`token`/`scss` findings, no `override` findings with `⇒` (except agreed TODOs), and only approved custom components among the `lookalike` findings.
- Build the app or run its style lint to catch broken SCSS.
- If the project has Storybook or a dev server, check custom components on all three surfaces (`kirby-surface-base`, `-raised`, `-brand` wrappers) in every state: hover, active, focus, error and disabled.

### 6. Report

Per candidate: the outcome (used/configured/composed Kirby component – which one; customized via variables; custom component with tokens – and why; skipped), open questions/TODOs, and visual changes to review (borders instead of shadows, opacity for disabled, new link colors, items without their own background). For each custom component, suggest raising the missing capability as a feature request with Kirby, so the lookalike can be replaced later.

## Anti-patterns

- Building a custom component because a Kirby component "almost" fits, without checking its inputs, slots and component variables.
- Styling Kirby components' internals (`::ng-deep`, internal class names, Ionic parts) to make them fit, instead of inputs or public component variables.
- Search-and-replace of one legacy token with one new token: the same legacy token maps to different tokens by context.
- Using color primitives (`--kirby-brand-color-*`, `--kirby-system-color-*`) – reading them, assigning them, or hardcoding their values – instead of a semantic `--kirby-color-*` token. They are outside semantic versioning and may break without notice.
- Mixing legacy and new color tokens in one component.
- Prefixing custom selectors or classes with `kirby-` – they look like Kirby's own and are hidden from the scanner.
- Trusting the `kirby/use-design-tokens` stylelint autofix – it rewrites `get-color()` to _legacy_ tokens.
