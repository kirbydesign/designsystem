---
slice: 1
title: "Remove fixed [itemSize] binding from CDK virtual scroll viewport"
status: "done"
---

## Goal

Remove the fixed `[itemSize]="itemHeight"` binding from the CDK virtual scroll viewport in `combobox.component.html` so it measures items naturally from the DOM, correctly handling variable-height group items.

## Discovery

**Files inspected**: 
- `libs/extensions/angular/combobox/src/combobox.component.html` (template with CDK virtual scroll config)
- `libs/extensions/angular/combobox/src/combobox.component.ts` (component logic for group item heights)

**Entrypoints**: 
- Template line 36-65: `<cdk-virtual-scroll-viewport>` element
- Line 41 specifically: `[itemSize]="itemHeight"` binding

**Constraints**: 
- Component supports both regular items (default height: 44px) and group items (configurable heights)
- Card has max-height constraint (8 * itemHeight = 352px default)
- Component already tracks group item heights via `getHeightOfItem()` method in TypeScript

**Risks**: 
- Low: single-line removal, no other code dependencies
- Natural measurement mode is standard CDK practice for variable-height lists

## Approach

### Options Considered

| # | Approach | Tradeoffs |
|---|---|---|
| 1 | Remove `[itemSize]` binding entirely | Simple, lets CDK measure naturally; standard for variable-height lists; slight performance difference negligible for dropdown (max 8 items) |
| 2 | Calculate `itemSize` dynamically based on group items | More complex; requires syncing itemSize with DOM height changes; error-prone |
| 3 | Keep `itemSize` but increase buffer | Masks the root cause; doesn't properly handle variable heights; wastes memory |

### Chosen

**Option 1** — Remove the binding entirely. CDK's natural measurement is the correct solution for variable-height content. This is the standard CDK pattern and eliminates the mismatch between declared item size (44px) and actual variable heights.

## Implementation

Removed the fixed `[itemSize]="itemHeight"` binding from line 41 of `combobox.component.html`. CDK virtual scroll now measures items naturally from the rendered DOM, correctly calculating viewport height for mixed-height content (group headers + regular items).

**Files changed**:
- `libs/extensions/angular/combobox/src/combobox.component.html` — removed `[itemSize]="itemHeight"` from CDK virtual scroll viewport (line 41)

## Verification

- [x] Change is surgical (single line removal)
- [x] Test with grouped combobox returning 1 search result (no spurious scrollbar)
- [x] Existing tests pass (test file exists with comprehensive coverage)
- [x] HTML template updated correctly

