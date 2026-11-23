# Kirby Data Grid: Architectural Strategy

**Status:** Starting point for the POC. Not yet recorded as an ADR.

Names such as `kirby-data-grid-layout` and the slot names are working names. Code
samples use TanStack Table v9 (`@tanstack/angular-table` / `@tanstack/table-core`
`^9.3.1`). The building blocks in [section 5](#5-building-blocks), sorting and
row selection are implemented in `@kirbydesign/designsystem/data-grid`.

This document is self-contained: it summarizes the earlier research and
spikes, so it can be read without them.

## 1. Context

### Problem

Several Bankdata teams display complex, related data. Each has built its own
grid-like solution, so there's no consistency or reuse between them. AG Grid was
evaluated and rejected: it would become too expensive over time, and matching it
to the Kirby design would be hard. Kirby therefore builds its own data grid.

The first consumer is the COR team (business banking, Erhverv). Six other teams
(RSD, INV, CRC, CTR, ACO and IAT) have stated needs that the grid must be able
to grow into.

### Requirements That Shape the Architecture

- **Sizes:** `xs`, `sm`, `md` and `lg` make cells more or less compact.
- **Accessibility:** WCAG 2.2 AA, following the
  [APG grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/). The
  European Accessibility Act (EAA) makes this a legal requirement.
- **Server-side data:** sorting, filtering and paging can happen on the backend.
- **Diverging needs across seven teams:** the priority matrix lists 22 features.
  Kirby can't foresee every use, so the grid must be extensible without Kirby
  owning every combination of features.
- **Layout around the grid:** a toolbar or header area, a footer (selection
  summary, totals, bulk actions), and a side panel for row details.

### Decisions Carried Over

| Decision                                                                                                                                                                                                 | Source               |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| Build in-house rather than adopt AG Grid.                                                                                                                                                                | Earlier evaluation   |
| **TanStack Table is the engine** for sorting, filtering, selection, visibility, pagination and tree logic. It's widely used, well supported, MIT-licensed and headless, so Kirby fully controls the UI.  | ADR 0001             |
| TanStack's Angular adapter v9 requires Angular 19 or later, which is compatible with Kirby's supported Angular versions.                                                                                 | ADR 0001             |
| Composable over configurable: moving from composable to configurable later is additive, but the reverse is a rewrite. A configurable "preset grid" can be built _on top of_ these building blocks later. | Direction comparison |
| Server-side mode needs no Kirby helper: TanStack's manual modes plus Angular's `httpResource` cover it, documented as a cookbook recipe.                                                                 | Direction comparison |
| The side panel is specific to the data grid for now, not a general Kirby component. Its internals stay private, so a general component can be extracted later.                                           | Earlier proposal     |
| Performance (about 300 rows) is handled later, by fewer rows per page or virtual scrolling.                                                                                                              | Earlier proposal     |

## 2. The Strategy in One Paragraph

Kirby provides a **data grid container** (`kirby-data-grid`). The consumer
creates the TanStack table and **builds the table markup inside the container**
from **Kirby table building blocks** on native `<table>` elements. The container
owns what must be identical everywhere: size (density), the scroll container,
keyboard focus and the grid-level ARIA. The building blocks own the
per-element ARIA and styling, and Kirby ships ready-made blocks for decided
patterns such as the sort header, selection checkboxes and the column chooser.
Around the grid, Kirby provides an optional **data grid layout**
(`kirby-data-grid-layout`) with header, footer and side panel containers. Kirby
owns the containers' behavior; the consumer decides their content.

```
┌ kirby-data-grid-layout (optional) ─────────────────────────────────────┐
│ ┌ header slot ─────────────────────────────────────────────────────┐   │
│ │ consumer content: column chooser, filter controls, grid actions │   │
│ └──────────────────────────────────────────────────────────────────┘   │
│ ┌ kirby-data-grid  [table] [size] [label] ──┐ ┌ panel slot ─────────┐  │
│ │ <table>  ← consumer markup                │ │ consumer content    │  │
│ │   <thead>  Kirby header blocks            │ │ (open state is the  │  │
│ │   <tbody>  @for rows → Kirby row/cell     │ │  consumer's; inline │  │
│ │            blocks + consumer cell content │ │  vs overlay and     │  │
│ │ </table>                                  │ │  focus are Kirby's) │  │
│ └───────────────────────────────────────────┘ └─────────────────────┘  │
│ ┌ footer slot ─────────────────────────────────────────────────────┐   │
│ │ consumer content: selection summary, bulk actions, totals       │   │
│ └──────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

## 3. Responsibilities

| Layer                                 | Owner                         | Contents                                                                                                                                                      |
| ------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Engine**                            | TanStack                      | Row models, sorting, filtering, selection, visibility and pagination state and APIs.                                                                          |
| **Table instance**                    | Consumer                      | `injectTable(...)` with Kirby's feature preset, column definitions, data, state signals, and server calls.                                                    |
| **Container** (`kirby-data-grid`)     | Kirby                         | Size, scroll container, keyboard focus model, grid-level ARIA, provides the table to its content through DI.                                                  |
| **Building blocks**                   | Kirby builds, consumer places | Structural blocks (table, header row, header cell, row, cell) and decided parts (sort header, select-all and row checkboxes, column chooser, filter control). |
| **Table markup**                      | Consumer                      | The `<table>`, the `@for` over header groups, rows and cells, and the cell content.                                                                           |
| **Layout** (`kirby-data-grid-layout`) | Kirby                         | Header, footer and side panel containers; responsive side panel behavior; focus return.                                                                       |
| **Layout content**                    | Consumer                      | What goes in the header, footer and panel, and what opens the panel.                                                                                          |
| **Domain**                            | Consumer                      | Fetching, totals (for example per-currency sums), status meaning, actions.                                                                                    |

## 4. The Engine and Table Instance

**Decision:** the consumer creates the table with TanStack's `injectTable` and
passes it to `kirby-data-grid`. TanStack's types (`ColumnDef`, `Table`, `Row`,
`SortingState`, …) are part of Kirby's public API surface.

**Why:** a consumer who knows TanStack knows the engine side of this grid. Kirby
maintains no wrapper and no second vocabulary, and new TanStack features reach
teams without waiting for Kirby. TanStack's major versions have historically
been years apart (v8 in 2022, v9 in 2026), so exposing its types is an
acceptable coupling.

### Features Are Registered by the Consumer

TanStack v9 only includes the features registered in `features`, and removes
unregistered ones from the bundle. **Decision:** Kirby does not ship a feature
preset for now. Each team registers the features it uses, for example
`tableFeatures({ rowSortingFeature, rowSelectionFeature })`. A preset would
bundle client-side row models (`sortedRowModel`, `filteredRowModel`, …) that a
server-side table never uses.

- **Building blocks detect features at runtime.** A feature adds its methods to
  columns, rows and the table only when it is registered, so the building blocks
  use internal type guards (for example `hasSorting(column)`) and stay inert for
  features the table doesn't have.
- **Column helpers require their feature at compile time.** Using
  `kirbyDataGridSelectionColumn` in a table without `rowSelectionFeature` fails
  to compile, because adding the column is an explicit opt-in.
- **Kirby defaults** (the sort cycle, `getRowId`, the state wiring) may later come
  through TanStack's `createTableHook`; that is decided together with the
  guidelines.

### Consumer Sketch

```ts
const features = tableFeatures({ rowSortingFeature, rowSelectionFeature, columnFilteringFeature });

const columns: ColumnDef<typeof features, Payment>[] = [
  kirbyDataGridSelectionColumn({ rowLabel: (payment: Payment) => payment.recipient }),
  { accessorKey: 'recipient', header: 'Recipient' },
  { accessorKey: 'amount', header: 'Amount' },
  { accessorKey: 'status', header: 'Status', meta: { filter: 'values' } },
];

@Component({/* ... */})
export class PaymentsComponent {
  readonly size = signal<KirbyDataGridSize>('md');
  readonly sorting = signal<SortingState>([]);
  readonly columnFilters = signal<ColumnFiltersState>([]);
  readonly rowSelection = signal<RowSelectionState>({});

  readonly page = httpResource<PaymentPage>(() => ({
    url: '/api/payments',
    params: toParams(this.sorting(), this.columnFilters()),
  }));

  readonly table = injectTable(() => ({
    features,
    columns,
    data: this.page.value()?.items ?? [],
    rowCount: this.page.value()?.total,
    getRowId: (payment) => payment.id, // required: selection is keyed by row ID
    manualSorting: true,
    manualFiltering: true,
    state: {
      sorting: this.sorting(),
      columnFilters: this.columnFilters(),
      rowSelection: this.rowSelection(),
    },
    onSortingChange: (u) => this.sorting.set(functionalUpdate(u, this.sorting())),
    onColumnFiltersChange: (u) => this.columnFilters.set(functionalUpdate(u, this.columnFilters())),
    onRowSelectionChange: (u) => this.rowSelection.set(functionalUpdate(u, this.rowSelection())),
  }));
}
```

## 5. Building Blocks

**Decided:** the building blocks are placed on **native table elements**
(`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`). Native elements are
semantic by default, keep the browser's table layout (column widths align
across rows without extra work), and continue the existing `.kirby-table` styles.

**Decided:** the forms are mixed per block, as the options below allowed.

| Block                        | Form                                                              | Why                                                                                        |
| ---------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Table, header row, row, cell | Attribute directives, for example `<tr [kirbyDataGridRow]="row">` | They only decorate: ARIA, classes and positions through host bindings.                     |
| Header cell                  | Component on `th[kirbyDataGridHeaderCell]`                        | It renders the sort button when the column can sort.                                       |
| Selection checkboxes         | Internal components, rendered by a column helper                  | They need their own column (see [How a part reaches the grid](#decided-parts-ready-made)). |

Each block takes its TanStack object through its selector (`[kirbyDataGridRow]="row"`),
and injects the container for table-wide values such as positions and counts.
Styles that must reach the consumer's markup (the selected row, the selection
cell) live in `@kirbydesign/core`'s global styles next to `.kirby-table`. The
options as they were compared:

### What Every Building Block Must Do, Whatever Its Form

| Block            | Applies to                         | Responsibilities                                                                                                        |
| ---------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Table            | `<table>`                          | Registers with the container; `role="grid"`; `aria-rowcount`, `aria-colcount`; size styles.                             |
| Header row / row | `<tr>`                             | `aria-rowindex` (offset for server data); for rows: `aria-selected`, a selected style, the row's ID for focus tracking. |
| Header cell      | `<th>`                             | `aria-colindex`, `aria-sort` when sortable, alignment, size styles.                                                     |
| Cell             | `<td>`                             | `aria-colindex`, alignment, size styles, a focus target for the container's keyboard model.                             |
| Cell widget      | Interactive elements inside a cell | Registers with the focus model, so arrow keys skip it and Enter or F2 moves into it.                                    |

### Decided Parts (Ready-Made)

Kirby ships these as finished building blocks, because they are decided design
patterns and must look and behave the same in every team:

| Part                | Engine API                                          | Notes                                                                    |
| ------------------- | --------------------------------------------------- | ------------------------------------------------------------------------ |
| Sort header         | `column.getToggleSortingHandler()`, `getIsSorted()` | A button in the `<th>`; sets `aria-sort`.                                |
| Select-all checkbox | `getIsAllRowsSelected()`, `toggleAllRowsSelected()` | Selects all loaded rows that can be selected; revisited with pagination. |
| Row checkbox        | `row.getIsSelected()`, `row.toggleSelected()`       | Gets an accessible name from a consumer-supplied row label.              |
| Column chooser      | `column.getCanHide()`, `toggleVisibility()`         | For the layout header; lists columns by their `header` string.           |
| Filter control      | `column.setFilterValue()`, faceted values           | The UI form (value list or conditions) is open.                          |
| Selection summary   | `rowSelection` against the visible rows             | "12 selected, 4 not shown": counts hidden selected rows.                 |

**How a part reaches the grid depends on where its control lives:**

- **A control on an existing column is rendered automatically by its building
  block.** The header cell renders the sort button when the column can sort
  (`rowSortingFeature` registered, `enableSorting` not `false`). The consumer
  writes no extra markup.
- **A control that needs its own column comes as a column helper**, a function
  that returns a TanStack `ColumnDef`, for example
  `kirbyDataGridSelectionColumn({ rowLabel })`. The column exists in TanStack's
  column model, so indices, visibility, ordering and pinning include it, and the
  consumer decides whether and where to add it. Expand and tree toggles follow
  the same pattern.

Column helpers only render controls. What a control acts on (which rows can be
selected or expanded) is decided by TanStack's table options, and row-level ARIA
(`aria-selected`, later `aria-expanded` and `aria-level`) is set by the row
building block, whichever cell the control is in. The components a helper
renders read their row from TanStack's render context and stay internal, so
they can be exported later for combined cells (for example a tree cell with a
checkbox, a toggle and the value) without a rewrite.

### The Options

The same header and row, in each notation:

```html
<!-- A: CSS classes -->
<tr
  class="kirby-data-grid-row"
  [class.selected]="row.getIsSelected()"
  [attr.aria-selected]="row.getIsSelected()"
>
  <td class="kirby-data-grid-cell">…</td>
</tr>

<!-- B: Attribute directives -->
<tr kirbyDataGridRow [row]="row">
  <td kirbyDataGridCell [cell]="cell">…</td>
</tr>

<!-- C: Components with attribute selectors on native elements -->
<tr kirby-data-grid-row [row]="row">
  <td kirby-data-grid-cell [cell]="cell">…</td>
</tr>

<!-- C': Components with element selectors -->
<kirby-data-grid-row [row]="row">
  <kirby-data-grid-cell [cell]="cell">…</kirby-data-grid-cell>
</kirby-data-grid-row>
```

| Criterion                                                      | A: CSS classes                                                                                                                                           | B: Attribute directives                                     | C: Components (attribute selector)                                   | C′: Components (element selector)                                                                                                                                             |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Native table semantics                                         | Kept                                                                                                                                                     | Kept                                                        | Kept                                                                 | **Lost:** custom elements inside `<tbody>` aren't table rows, so ARIA roles and CSS grid or `display: contents` are needed instead. Conflicts with the native-table decision. |
| Applies ARIA automatically                                     | **No:** the consumer writes every attribute, which conflicts with the accessibility decision ([section 7](#7-accessibility)) unless combined with B or C | Yes, through host bindings                                  | Yes, through host bindings                                           | Yes                                                                                                                                                                           |
| Can register with the focus model                              | No                                                                                                                                                       | Yes, by injecting the container                             | Yes                                                                  | Yes                                                                                                                                                                           |
| Can render its own internal markup (a sort button, a checkbox) | No                                                                                                                                                       | No (decorates only)                                         | Yes                                                                  | Yes                                                                                                                                                                           |
| Styles                                                         | Global stylesheet                                                                                                                                        | Global stylesheet (directives have none)                    | Component styles                                                     | Component styles                                                                                                                                                              |
| Consumer can see the native element                            | Yes                                                                                                                                                      | Yes                                                         | Yes                                                                  | No                                                                                                                                                                            |
| Non-Angular use (for example a future web-components package)  | Works anywhere                                                                                                                                           | Angular only                                                | Angular only                                                         | Angular only                                                                                                                                                                  |
| Familiar from                                                  | Bootstrap, the existing `.kirby-table`                                                                                                                   | Angular CDK Table (`cdk-row`), the earlier composable spike | Angular Material (`button[mat-button]`), the existing `th[sortable]` | React Aria, MUI Table                                                                                                                                                         |
| Kirby's eslint `component-selector` rule                       | n/a                                                                                                                                                      | Directive prefix rule                                       | Needs a lint exception (as `th[sortable]` has today)                 | Default                                                                                                                                                                       |

Notes for the decision:

- **The forms can be mixed per block.** Structural blocks (row, cell) only
  decorate, while decided parts (sort header, checkbox) render their own markup.
  For example, the structural blocks could be directives and the parts
  components.
- **Global CSS classes can underlie any option.** B and C could add a class that
  carries the size styles, which keeps styling shared with `.kirby-table`.

## 6. `kirby-data-grid` (The Container)

### Inputs

| Input   | Type                               | Notes                                                                   |
| ------- | ---------------------------------- | ----------------------------------------------------------------------- |
| `table` | TanStack `Table<TFeatures, TData>` | Required. Provided to content and to the layout through DI.             |
| `label` | `string`                           | Required. The grid's accessible name (`aria-label`).                    |
| `size`  | `'xs' \| 'sm' \| 'md' \| 'lg'`     | An input that can change at runtime. Default: `md` (token values open). |

The container has **no feature flags**: sorting, filtering and selection come
from the table options and column definitions, so adding a feature never changes
the container's inputs.

### Responsibilities

- Provides the table through DI, so building blocks and parts don't need a
  `table` input.
- Owns a horizontal and vertical scroll container.
- Owns the keyboard focus model ([section 7](#7-accessibility)).
- Applies size ([section 8](#8-sizes)).
- In development mode, checks that the content follows the contract (exactly one
  table, rows and cells marked as building blocks, a label) and warns with a
  link to the documentation.

## 7. Accessibility

**Decision:** building blocks apply ARIA automatically, and the container owns
keyboard focus. Kirby, not each team, is responsible for meeting the APG grid
pattern.

| Concern                                                           | Owner                           | How                                                                           |
| ----------------------------------------------------------------- | ------------------------------- | ----------------------------------------------------------------------------- |
| `role="grid"`, accessible name                                    | Container and table block       | Required `label` input.                                                       |
| `aria-rowcount`, `aria-rowindex`                                  | Table and row blocks            | From `rowCount` (server total), so screen readers announce the full data set. |
| `aria-colcount`, `aria-colindex`                                  | Table and cell blocks           | From the visible leaf columns.                                                |
| `aria-sort`                                                       | Sort header part                | From `column.getIsSorted()`.                                                  |
| `aria-selected`                                                   | Row block                       | From `row.getIsSelected()`.                                                   |
| One tab stop; arrow keys, Home/End, Ctrl+Home/End, Page Up/Down   | Container                       | A roving focus model.                                                         |
| Enter or F2 into interactive cell content, Escape back out        | Container and cell widget block | Interactive elements in cells must use the cell widget block.                 |
| Announcements (for example "sorted ascending", "3 rows selected") | Container                       | CDK `LiveAnnouncer`.                                                          |

### Guidance for the Focus Model

- **Track focus by row ID and column ID, not by DOM element.** Focus then
  survives sorting, filtering and data reloads, and virtual scrolling stays
  possible later.
- **Use CDK utilities where they help:** `FocusMonitor`, `InteractivityChecker`
  and `LiveAnnouncer` from `@angular/cdk/a11y`. `@angular/cdk` is already a peer
  dependency.
- **Build it first in the POC, with a test harness**, because it carries the
  legal risk.

### The Risk of Consumer Markup

Because the consumer writes the markup, they can leave out a building block or
add their own interactive elements. Mitigations, from strongest to weakest:

1. **Decided parts** cover the common interactive cases (sorting, selection,
   column visibility, filtering), so consumers rarely write interactive cell
   content.
2. **The container's development-mode checks** warn about missing building blocks.
3. **A Kirby test harness** lets teams assert the grid's ARIA and keyboard
   behavior in their own tests.
4. **Lint rules** can flag, for example, a `<tr>` without a row block inside a
   `kirby-data-grid`.

## 8. Sizes

- `size` is an input on `kirby-data-grid` and can change at runtime.
- **The mechanism is CSS only:** the container reflects the size as a host
  attribute or class, which sets custom properties such as
  `--kirby-data-grid-row-height`, `--kirby-data-grid-cell-padding-block`,
  `--kirby-data-grid-cell-padding-inline` and `--kirby-data-grid-font-size`.
  Building blocks read these properties.
- **Changing the size doesn't re-render** the table and keeps focus and scroll
  position.
- **Kirby components inside cells follow the size** (checkbox, flag, button,
  avatar): each size maps to a component size. Flag and checkbox sizes above `md`
  don't exist today and must be designed.
- **Values come from design tokens.** Today's `.kirby-table` corresponds to one
  size (row height 44px, cell padding `--kirby-spacing-xxxs`
  `--kirby-spacing-s`, font size `--kirby-font-size-s`). Which size that is, and
  the values for the others, must be agreed with design.

| Size | Row height         | Cell padding | Font size | Nested component size |
| ---- | ------------------ | ------------ | --------- | --------------------- |
| `xs` | TBD                | TBD          | TBD       | TBD                   |
| `sm` | TBD                | TBD          | TBD       | TBD                   |
| `md` | TBD (today: 44px?) | TBD          | TBD       | TBD                   |
| `lg` | TBD                | TBD          | TBD       | TBD                   |

## 9. `kirby-data-grid-layout`

The layout is **optional**: `kirby-data-grid` works on its own.

```html
<kirby-data-grid-layout [(panelOpen)]="panelOpen">
  <div header>
    <!-- consumer content, for example Kirby's column chooser and filter controls -->
  </div>

  <kirby-data-grid [table]="table" label="Payments to approve" [size]="size()">
    <table><!-- consumer markup with Kirby building blocks --></table>
  </kirby-data-grid>

  <div footer>
    <!-- for example Kirby's selection summary, and the team's own totals -->
  </div>

  <div panel>
    <!-- for example the team's payment details -->
  </div>
</kirby-data-grid-layout>
```

### Slots

| Slot     | Kirby owns                                                                  | Consumer owns                          |
| -------- | --------------------------------------------------------------------------- | -------------------------------------- |
| `header` | Placement, spacing, wrapping on narrow screens                              | All content                            |
| `footer` | Placement, spacing, wrapping on narrow screens                              | All content                            |
| `panel`  | Inline or overlay presentation, width, focus handling, the close affordance | Content, the open state, what opens it |

### Table Context in the Slots

Kirby's parts in the slots (column chooser, filter controls, selection summary)
need the table. The layout provides a context, the grid inside it registers its
table there, and parts read it through DI, so they take no `table` input.
Outside a layout, parts would need another way to get the table (see
[section 13](#13-open-questions)).

### Side Panel Behavior

**Decision:** the consumer controls the open state and content; Kirby owns the
behavior.

- **Inline** beside the grid when there is room; the grid narrows.
- **Overlay** when space is tight, with Escape to close.
- **Focus** moves into the panel when it opens and returns to the trigger
  (typically the row or cell that opened it) when it closes.
- `panelOpen` is a two-way binding, because Kirby's close affordance and Escape
  also close the panel.
- The panel is specific to the data grid for now. Its internals stay private, so
  a general Kirby component can be extracted later without breaking changes.

## 10. Scope

### First Iteration

| Feature                                 | TanStack                                                                     | Kirby building block                                                         | Consumer                                                                                        |
| --------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Sorting**                             | `rowSortingFeature`; `sorting` state; `manualSorting`                        | Sort header part                                                             | Chooses sortable columns (`enableSorting`), passes sorting to the backend in server mode.       |
| **Row selection** (multi, across pages) | `rowSelectionFeature`; `RowSelectionState` keyed by `getRowId`               | Select-all and row checkboxes, the selected-row style, the selection summary | Supplies `getRowId` and a row label; uses the selected IDs in actions.                          |
| **Column visibility**                   | `columnVisibilityFeature`; `columnVisibility` state                          | Column chooser part                                                          | Places the chooser (typically in the layout header); chooses hideable columns (`enableHiding`). |
| **Filtering**                           | `columnFilteringFeature`, faceting; `columnFilters` state; `manualFiltering` | Filter control part, filter chips (open)                                     | Chooses filterable columns; in server mode, supplies the filter values.                         |
| **Server-side mode**                    | `manualSorting`, `manualFiltering`, `manualPagination`, `rowCount`           | None: a cookbook recipe with `httpResource`                                  | Fetching and mapping state to request parameters.                                               |

Selection survives filtering and data reloads, because it is keyed by row ID.
Hidden selected rows (selected but not currently shown) are counted in the
selection summary.

### Later (Not in the First Iteration)

The architecture must not block any of these. For each, the change it needs:

| Feature                                 | Change                                                                                                            |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Pagination UI                           | The consumer registers `rowPaginationFeature`; a paginator part for the footer.                                   |
| Global search                           | Add `globalFilteringFeature`, and a search part for the header.                                                   |
| Row actions ("⋯" menu) and bulk actions | Parts that take actions as data.                                                                                  |
| Tree / expanding rows                   | Add `rowExpandingFeature`; an expand toggle and `aria-level`/`aria-expanded` in the row block; `role="treegrid"`. |
| Column pinning, sticky header           | Add `columnPinningFeature`; sticky styles in the cell blocks.                                                     |
| Loading and empty state                 | Container slots or inputs.                                                                                        |
| Resizing, reordering                    | Add the TanStack feature; a handle in the header cell block.                                                      |
| Inline editing                          | Edit variants of cells and an edit mode in the focus model: the biggest change.                                   |
| Virtual scrolling                       | `aria-rowcount`/`aria-rowindex` must keep describing the full data set; focus tracking by ID already allows it.   |
| Export                                  | Only the visual flow is in scope; generating files is the backend's job.                                          |

## 11. Public API

These become contracts, and changing them is a breaking change:

- `kirby-data-grid`: `table`, `label`, `size`.
- `kirby-data-grid-layout`: the `header`, `footer` and `panel` slots, and
  `panelOpen`.
- The building blocks and their inputs: `kirbyDataGridTable`,
  `kirbyDataGridHeaderRow`, `kirbyDataGridHeaderCell`, `kirbyDataGridRow` and
  `kirbyDataGridCell`.
- The column helpers and their options: `kirbyDataGridSelectionColumn({ rowLabel })`.
- The CSS classes they set: `selected` on rows, `sortable` and `active` on header
  cells.
- The size custom properties, if consumers may read them in their own cell
  content.
- The test harness.
- TanStack's types, as used in table options and column definitions.

## 12. Rules

1. **A decided design pattern becomes a ready-made part.** Consumers don't build
   their own sort buttons, selection checkboxes or column choosers.
2. **Custom cell content is for domain content.** Interactive elements in cells
   must use the cell widget building block.
3. **The container has no feature flags.** Behavior comes from table options and
   column definitions.
4. **Grid behavior comes from TanStack.** Kirby adds rendering, not engine
   features of its own.
5. **A new part needs a decided design pattern**, so the catalog grows with
   decisions rather than with every wish.

## 13. Open Questions

1. ~~**Building block form**~~ Decided: mixed per block ([section 5](#5-building-blocks)).
2. **Default size,** and the token values per size, agreed with design.
3. **Does the layout's header and footer follow the grid's size?**
4. **Nested component sizes:** checkbox and flag sizes above `md`.
5. **Select-all scope:** decided for now as all loaded rows. Revisit when the
   choice between pagination, load on demand and virtual scrolling is made; "all
   rows on the server" needs backend support.
6. **Selection under `manualPagination`:** confirm that selected IDs persist as
   expected when pages are fetched.
7. **Filter UI:** value filters versus condition filters, and where the distinct
   values for a server-side value filter come from. Start the backend
   conversation early.
8. **Parts outside a layout:** an optional `table` input, or a directive that
   connects them to a grid by reference.
9. **Side panel:** the inline-to-overlay threshold and panel width, agreed with
   design.
10. **How strictly to enforce the markup contract:** development-mode warnings
    only, or also lint rules?

## 14. Risks

| Risk                                                                             | Mitigation                                                                                                                 |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Consumers bypass building blocks, which breaks accessibility (a legal risk).     | Decided parts, development-mode checks, a test harness and lint rules ([section 7](#7-accessibility)).                     |
| Consumer markup drifts between teams (7 teams, 7 grids).                         | Decided parts for every decided pattern; cookbook recipes for the common screens.                                          |
| TanStack's types are public API, so a major TanStack version affects every team. | Accepted: TanStack's major versions are years apart. Kirby pins the supported range.                                       |
| The focus model is complex, and must work with consumer markup.                  | Built first in the POC, tracked by ID, covered by a test harness and a screen-reader pass.                                 |
| Repeating `@for` markup in every screen is boilerplate.                          | A cookbook recipe to copy; a convenience component can be added later on top of the building blocks without breaking them. |

## 15. POC Plan

1. **Container and size:** `kirby-data-grid` with `table`, `label` and `size`,
   and size custom properties on a native table. Switch the size at runtime in
   the cookbook.
2. **Building blocks:** prototype the structural blocks in at least two of the
   candidate forms, and decide ([open question 1](#13-open-questions)).
3. **Accessibility:** ARIA from the blocks, then the focus model by row and column
   ID, with a test harness and one screen-reader pass.
4. **Decided parts:** sort header, select-all and row checkboxes, column chooser,
   then the filter control.
5. **Layout:** header, footer and panel slots, table context through DI, then
   the side panel's inline and overlay behavior.
6. **Server mode:** a cookbook recipe with `httpResource` and manual sorting and
   filtering, with selection across reloads.
7. **Record** the decisions as ADRs: the strategy, the building block form, and
   the accessibility ownership.

## Glossary

**Building block:** a Kirby-provided piece the consumer places in their table
markup, either structural (row, cell) or a decided part.

**Bulk action:** an action applied to all selected rows.

**Container:** `kirby-data-grid`, the Kirby element the consumer's table lives in.

**Decided part:** a ready-made building block for a design pattern Kirby has
decided, such as the sort header.

**Engine:** the logic that derives the visible rows from data and state; here,
TanStack Table.

**Hidden selected row:** a selected row that the current filter, search or page
doesn't show.

**Layout:** `kirby-data-grid-layout`, the optional frame with header, footer and
side panel containers.

**Row action:** an action applied to one row, typically from a "⋯" menu.

**Selection:** the set of rows a user has chosen, identified by stable row ID.

**Side panel:** a content area beside the grid, whose content and opening the
consumer decides.

**Size:** the density of the grid (`xs`, `sm`, `md` or `lg`), controlling row
height, padding and font size.

## References

- [TanStack Table](https://tanstack.com/table/latest), and its
  [Angular adapter](https://tanstack.com/table/latest/docs/framework/angular/angular-table).
- [APG grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/).
- [Angular CDK Table](https://material.angular.dev/guide/cdk-table): directive
  building blocks on native elements.
- [React Aria Table](https://react-aria.adobe.com/Table): composable blocks with
  built-in accessibility.
- [Angular CDK a11y](https://material.angular.dev/cdk/a11y/overview):
  `FocusMonitor`, `InteractivityChecker` and `LiveAnnouncer`.
