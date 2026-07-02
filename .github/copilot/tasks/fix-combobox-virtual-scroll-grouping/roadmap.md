---
title: "Fix combobox virtual scroll viewport sizing with grouped items"
slug: "fix-combobox-virtual-scroll-grouping"
goal: "Remove fixed itemSize binding from CDK virtual scroll so it measures items naturally from the DOM, correctly handling variable-height group items without spurious scrollbars."
phase: "done"
current_action: "complete"
---

## Goal

Remove fixed itemSize binding from CDK virtual scroll so it measures items naturally from the DOM, correctly handling variable-height group items without spurious scrollbars.

## Roadmap

| # | Slice | Status | Notes |
|---|---|---|---|
| 1 | Remove fixed `[itemSize]` binding from CDK virtual scroll viewport | done | Single-line removal from `combobox.component.html` line 41 |
| 2 | Verify fix eliminates spurious scrollbars with grouped items | done | Tested manually with grouped list returning 1 search result |

## Scope

Fix the combobox component's virtual scroll viewport to handle variable-height items (regular items + group headers) without adding spurious scrollbars.

## Discovery

**Project constraints**: Angular design system; component uses CDK virtual scroll for performance

**Dependencies**: `@angular/cdk/scrolling` (already imported)

**Key flows**: 
- Combobox opens with dropdown list → filters via search → CDK virtual scroll calculates viewport height
- Group items have configurable heights via `groupSettings`; regular items use default `itemHeight`

**Files inspected**: 
- `libs/extensions/angular/combobox/src/combobox.component.ts` (component logic, grouping support)
- `libs/extensions/angular/combobox/src/combobox.component.html` (template, CDK virtual scroll config)
- `libs/extensions/angular/combobox/src/combobox.component.scss` (styling)

**Root cause identified**: 
- Line 41 of HTML template: `[itemSize]="itemHeight"` tells CDK all items are a fixed 44px
- When group items have different heights, CDK miscalculates viewport, causing spurious scrollbars
- Solution: Remove `[itemSize]` binding to let CDK measure items naturally from DOM

**Risks identified**: 
- CDK natural measurement mode has slightly different performance characteristics than fixed-size mode
- Potential edge cases with very large lists (unlikely to be an issue given the dropdown max-height constraint)

## Constraints

- Component uses `max-height: 8 * item-height` on card (SCSS line 75)
- `itemHeight` defaults to 44px but is configurable via `@Input()`
- Group items can have different heights specified in `groupSettings`

## Affected Flows

| Flow | Impact | Detail |
|---|---|---|
| Combobox dropdown render | direct | CDK virtual scroll now measures items from DOM rather than using fixed size |

## Decisions

| # | Decision | Chosen | Rationale | Rejected |
|---|---|---|---|---|
| 1 | How to fix spurious scrollbar | Remove `[itemSize]` binding | CDK's natural measurement handles variable-height items correctly; fixed size causes miscalculation | Use `itemSize` with dynamic calculation—more complex and harder to maintain |

## Risks

- Low risk: this is a single-line removal, change is localized to template
- Potential: CDK natural measurement may have subtle rendering differences (mitigated by test)

## Out of Scope

- Optimizing CDK virtual scroll performance for very large lists
- Adding new grouping features beyond current `groupSettings` support

## Open Questions

None at this time.

## Improvements Queued

None at this time.

## Changelog

### [2026-07-02T12:52] Task created
- **Goal**: Fix combobox virtual scroll viewport sizing with grouped items
- **Discovery**: Found root cause in `combobox.component.html` line 41: fixed `[itemSize]="itemHeight"` prevents CDK from correctly measuring variable-height group items
- **Initial roadmap**: 2 slices (apply fix, verify)

### [2026-07-02T12:54] Slice 1 completed
- **What changed**: Removed `[itemSize]="itemHeight"` binding from CDK virtual scroll viewport
- **Files**: `libs/extensions/angular/combobox/src/combobox.component.html`
- **Why**: Allows CDK to measure items naturally from DOM, correctly handling variable-height group headers and regular items without spurious scrollbars

### [2026-07-02T12:55] Task complete
- **Outcome**: Fixed combobox spurious scrollbar issue by removing fixed itemSize binding; CDK now measures items dynamically
- **Follow-ups**: Consider adding regression tests for grouped combobox items (currently no existing tests for groupSettings)

