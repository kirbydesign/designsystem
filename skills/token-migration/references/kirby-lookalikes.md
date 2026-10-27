# Kirby lookalikes

Custom UI that re-implements a Kirby component should be replaced, not re-tokenized: the Kirby component already follows the new tokens, surfaces, states and accessibility rules. **Never decide this alone – always ask the user** (see SKILL.md step 3).

Signs of a lookalike: a class or component name from the table, a native control with custom styling, custom hover/active/focus/disabled styles, or hand-made status colors.

Some custom patterns could be, but are not limited to, the following:

| Custom pattern                                          | Kirby candidate                                                        | Package                          |
| ------------------------------------------------------- | ---------------------------------------------------------------------- | -------------------------------- |
| box with border/shadow, `.card`, `.panel`, `.tile`      | `kirby-card` (`variant`: `base`, `raised`, `brand`)                    | designsystem                     |
| styled `<button>`, `<a class="btn">`, icon-only button  | `button[kirby-button]` (`attentionLevel`, `size`, `noDecoration`)      | designsystem                     |
| `<select>`, custom dropdown/listbox                     | `kirby-dropdown`, `kirby-x-combobox` (searchable)                      | designsystem, extensions-angular |
| text input/textarea with custom label/border/error      | `kirby-form-field` + `input[kirby-input]` / `textarea[kirby-textarea]` | designsystem                     |
| pill/tab group switching views, chips                   | `kirby-segmented-control` (`mode="chip"`)                              | designsystem                     |
| items with separators/sections                          | `kirby-list`,                                                          | designsystem                     |
| `<hr>`, `.divider`, `.separator`, `border-bottom` lines | `kirby-divider`                                                        | designsystem                     |
| illustration with status colors                         | `kirby-x-spot-illustration`                                            | extensions-angular               |

Before you suggest a candidate, check that it exists in the installed version: `node_modules/@kirbydesign/designsystem/<name>` or `node_modules/@kirbydesign/extensions-angular/<name>`. Look up its inputs in the Cookbook rather than guessing.

## What to tell the user

When you ask, include:

- which file or component it is and what it looks like it does
- which Kirby component could replace it, and which inputs would cover the custom behavior
- which custom behavior Kirby might not cover (if you can see any), so the user can judge
- the cost of each option: replacing changes templates and maybe tests; migrating keeps the duplicate
