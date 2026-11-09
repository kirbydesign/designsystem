# Kirby lookalikes and the component ladder

A Kirby component already follows the tokens, surfaces, states and accessibility rules, and gets fixes for free. A custom lookalike has to do all of that by hand, forever. So a lookalike is only built – or kept – when no Kirby component can do the job, and **only after the user agrees** (see SKILL.md step 3).

## The ladder

Stop at the first step that fits.

| Step         | What it means                                                                                                                           | Example                                                                                  |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 1. Use       | A Kirby component does it out of the box                                                                                                | `.tag` → `kirby-badge`                                                                   |
| 2. Configure | Inputs, variants, sizes, slots/content projection, or a `kirby-surface-*` class on the container                                        | dark promo box → `<kirby-card variant="brand">`, secondary button → `attentionLevel="2"` |
| 3. Compose   | Several Kirby components in a thin wrapper component. The wrapper adds layout (grid, flex, spacing) only – no colors, borders or states | account tile → `kirby-card` + `kirby-item` + `kirby-avatar` + `kirby-badge`              |
| 4. Customize | Public component variables, set on the Kirby component or a container                                                                   | `--kirby-card-padding-top`, `--kirby-button-padding-left`                                |
| 5. Custom    | A custom component styled with semantic tokens                                                                                          | a visual Kirby doesn't have, or behavior that would need Kirby's internals               |

Check before moving up a step:

- **Inputs and slots:** look up the component's API in the installed package (`node_modules/@kirbydesign/designsystem/<name>`, `node_modules/@kirbydesign/extensions-angular/<name>`) or the Cookbook showcase. Don't guess.
- **Component variables:** search for `--kirby-<component>-` in `node_modules/@kirbydesign/designsystem/fesm2022/kirbydesign-designsystem-<component>.mjs` (styles are inlined there).
- **Close enough?** Small visual differences from a design (a slightly different radius, padding or shadow) are not a reason to build a custom component. Point them out to the user – often the design should follow Kirby, not the other way around.

These are **not** valid ways to make a Kirby component fit: `::ng-deep`, targeting internal class names or Ionic parts, or wrapping it to override its colors. If the only way is through internals, the honest options are step 5 or a feature request to Kirby.

## Signs of a lookalike

A class or component name from the table below, a native control with custom styling, custom hover/active/focus/disabled styles, or hand-made status colors. Common patterns include, but are not limited to:

| Custom pattern                                          | Kirby candidate                                                        | Package                          |
| ------------------------------------------------------- | ---------------------------------------------------------------------- | -------------------------------- |
| box with border/shadow, `.card`, `.panel`, `.tile`      | `kirby-card` (`variant`: `base`, `raised`, `brand`)                    | designsystem                     |
| styled `<button>`, `<a class="btn">`, icon-only button  | `button[kirby-button]` (`attentionLevel`, `size`, `noDecoration`)      | designsystem                     |
| `<select>`, custom dropdown/listbox                     | `kirby-dropdown`, `kirby-x-combobox` (searchable)                      | designsystem, extensions-angular |
| text input/textarea with custom label/border/error      | `kirby-form-field` + `input[kirby-input]` / `textarea[kirby-textarea]` | designsystem                     |
| pill/tab group switching views, chips                   | `kirby-segmented-control` (`mode="chip"`)                              | designsystem                     |
| items with separators/sections                          | `kirby-list`, `kirby-item`                                             | designsystem                     |
| `<hr>`, `.divider`, `.separator`, `border-bottom` lines | `kirby-divider`                                                        | designsystem                     |
| illustration with status colors                         | `kirby-x-spot-illustration`                                            | extensions-angular               |

## What to tell the user

When you ask, include:

- which file or component it is (or what was requested) and what it does
- the lowest ladder step that fits: which Kirby component(s), and which inputs or variables cover the needed behavior
- which behavior Kirby doesn't cover (if any), so the user can judge whether it really matters
- the cost of each option: replacing changes templates and maybe tests; a custom component duplicates Kirby's styling, states and accessibility, and has to be maintained and migrated by the team

If the user chooses a custom component, record the reason – it goes into the report and, ideally, into a feature request to Kirby.
