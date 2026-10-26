# Kirby lookalikes

Custom UI that re-implements a Kirby component should be replaced, not re-tokenized: the Kirby component already follows the new tokens, surfaces, states and accessibility rules. **Never decide this alone – always ask the user** (see SKILL.md step 3).

Signs of a lookalike: a class or component name from the table, a native control with custom styling, custom hover/active/focus/disabled styles, or hand-made status colors.

| Custom pattern                                               | Kirby candidate                                                        | Package                          |
| ------------------------------------------------------------ | ---------------------------------------------------------------------- | -------------------------------- |
| clickable box with border/shadow, `.card`, `.panel`, `.tile` | `kirby-card` (`variant`: `base`, `raised`, `brand`)                    | designsystem                     |
| styled `<button>`, `<a class="btn">`, icon-only button       | `button[kirby-button]` (`attentionLevel`, `size`, `noDecoration`)      | designsystem                     |
| on/off pill buttons                                          | `kirby-toggle-button`                                                  | designsystem                     |
| switch                                                       | `kirby-toggle`                                                         | designsystem                     |
| `<input type="checkbox">` / `type="radio">` with custom box  | `kirby-checkbox`, `kirby-radio-group` + `kirby-radio`                  | designsystem                     |
| `<input type="range">`, slider                               | `kirby-range`                                                          | designsystem                     |
| `<select>`, custom dropdown/listbox                          | `kirby-dropdown`, `kirby-x-combobox` (searchable)                      | designsystem, extensions-angular |
| text input/textarea with custom label/border/error           | `kirby-form-field` + `input[kirby-input]` / `textarea[kirby-textarea]` | designsystem                     |
| pill/tab group switching views, chips                        | `kirby-segmented-control` (`mode="chip"`)                              | designsystem                     |
| tabs/underlined nav                                          | `kirby-tab-navigation`                                                 | designsystem                     |
| count/status dot, `.badge`, `.pill`, `.tag`                  | `kirby-badge`                                                          | designsystem                     |
| colored label/status chip, `.flag`, `.status`                | `kirby-flag`                                                           | designsystem                     |
| round image/initials, `.avatar`                              | `kirby-avatar`                                                         | designsystem                     |
| row with icon + text + chevron/detail                        | `kirby-item` (+ `kirby-label`), in `kirby-list`                        | designsystem                     |
| list with separators/sections                                | `kirby-list`, `kirby-item-group`, `kirby-section-header`               | designsystem                     |
| swipe-to-reveal actions                                      | `kirby-item-sliding`                                                   | designsystem                     |
| expandable section                                           | `kirby-accordion` + `kirby-accordion-item`                             | designsystem                     |
| `<hr>`, `.divider`, `.separator`, `border-bottom` lines      | `kirby-divider`                                                        | designsystem                     |
| spinner/loader                                               | `kirby-spinner`, `kirby-loading-overlay`                               | designsystem                     |
| placeholder shimmer blocks                                   | `kirby-x-skeleton-loader`                                              | extensions-angular               |
| progress ring/percentage circle                              | `kirby-progress-circle`                                                | designsystem                     |
| "nothing here" block with icon and text                      | `kirby-empty-state`                                                    | designsystem                     |
| illustration with status colors                              | `kirby-x-spot-illustration`                                            | extensions-angular               |
| hero/promo banner with image and dismiss                     | `kirby-x-image-banner`                                                 | extensions-angular               |
| side navigation                                              | `kirby-x-sidebar` + `kirby-x-sidebar-menu`                             | extensions-angular               |
| dialog, bottom sheet, confirm box                            | `kirby-modal`, `ModalController`, `kirby-alert` / `AlertController`    | designsystem                     |
| snackbar/notification                                        | `ToastController` (`messageType`: `success`, `warning`)                | designsystem                     |
| popover/context menu                                         | `kirby-menu`, `kirby-popover`                                          | designsystem                     |
| page title row with value/unit/actions                       | `kirby-header`, `kirby-page`                                           | designsystem                     |
| table with hover rows/sorting                                | `table.kirby-table` (+ `th[sortable]`)                                 | designsystem                     |
| date picker grid                                             | `kirby-calendar`                                                       | designsystem                     |
| sticky bottom action bar                                     | `kirby-page-footer` / `kirby-modal-footer`                             | designsystem                     |
| carousel/pager dots                                          | `kirby-slides`                                                         | designsystem                     |
| slide-to-confirm                                             | `kirby-slide-button`                                                   | designsystem                     |

Before you suggest a candidate, check that it exists in the installed version: `node_modules/@kirbydesign/designsystem/<name>` or `node_modules/@kirbydesign/extensions-angular/<name>`. Look up its inputs in the Cookbook rather than guessing.

## What to tell the user

When you ask, include:

- which file or component it is and what it looks like it does
- which Kirby component could replace it, and which inputs would cover the custom behavior
- which custom behavior Kirby might not cover (if you can see any), so the user can judge
- the cost of each option: replacing changes templates and maybe tests; migrating keeps the duplicate
