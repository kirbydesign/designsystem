# Changelog

Notable changes to the project will be documented in this file.

## [7.2.1](https://github.com/kirbydesign/designsystem/compare/v7.1.1...v7.2.1) (28-10-2022)

### Features

- **data table** - introduce new Kirby Data Table component ([#2517](https://github.com/kirbydesign/designsystem/pull/2517))
- **dropdown** - enable keyboard navigation in the dropdown ([#2424](https://github.com/kirbydesign/designsystem/pull/2424))
- **formfield** - introduce affix functionality (pre- and suffix) ([#2545](https://github.com/kirbydesign/designsystem/pull/2545))
- **icon** - add update icon ([#2558](https://github.com/kirbydesign/designsystem/pull/2558))
- **local navigation** - introduce **experimental** local navigation component ([#2501](https://github.com/kirbydesign/designsystem/pull/2501))
- **modal** - Add option to show an alert before dismissing modal ([#2514](https://github.com/kirbydesign/designsystem/pull/2514))
- **tabs** - change position of badges([#2555](https://github.com/kirbydesign/designsystem/pull/2555))

### Bugfixes

- **chart** - upgrade Chart.js dependency to avoid chart-annotations version warning ([#2548 ](https://github.com/kirbydesign/designsystem/pull/2548))
- **dropdown** - prevent dropdown focus ring on click ([#2544](https://github.com/kirbydesign/designsystem/pull/2544))
- **dropdown** - fix opening direction when button intersects bottom of viewport ([#2544](https://github.com/kirbydesign/designsystem/pull/2544))
- **fab-sheet** - fix no automatic close of fab-sheet on item click([#2472](https://github.com/kirbydesign/designsystem/pull/2472))

## [7.1.1](https://github.com/kirbydesign/designsystem/compare/v7.1.0...v7.1.1) (12-10-2022)

Fixes missing stylesheets in core packages. Due to modified publish flow made in v7.1.0. This only affects the published npm packages.

## [7.1.0](https://github.com/kirbydesign/designsystem/compare/v7.0.0...v7.1.0) (07-10-2022)

### Features

- **icons** - new icons: help-decoration, information-decoration, notification, transfer-ownership ([#2504](https://github.com/kirbydesign/designsystem/pull/2504))
- **list** - sub sections ([#2478](https://github.com/kirbydesign/designsystem/pull/2478))

### Bugfixes

- **accordion** - always close accordion when disabled ([#2499](https://github.com/kirbydesign/designsystem/pull/2499))
- **item** - toggles inside kirby item placed too high ([#2518](https://github.com/kirbydesign/designsystem/pull/2518))
- **page** - fix memory leak in kirby-page ([#2519](https://github.com/kirbydesign/designsystem/pull/2519))
- **toolbar** - use kirby black on ion-toolbar and ion-content ([#2520](https://github.com/kirbydesign/designsystem/pull/2520))

## [7.0.0](https://github.com/kirbydesign/designsystem/pull/2442) (16-09-2022)

### Breaking Changes

- **button** - deprecate attention-level 4 on kirby-button ([#1993](https://github.com/kirbydesign/designsystem/pull/1993))
- **chart** - remove deprecated Highchart variants ([#2334](https://github.com/kirbydesign/designsystem/pull/2334))

### Deprecations

- **chip** - deprecate chip component ([#2391](https://github.com/kirbydesign/designsystem/pull/2391))

### Features

- **card** - make it possible to use alternative hover and active on dark cards ([#2469](https://github.com/kirbydesign/designsystem/pull/2469))
- **stock-chart** - add stock chart component ([#2377](https://github.com/kirbydesign/designsystem/pull/2377))
- **interaction-states** - hover, active, pressed and focussed state for our interative components has been implemented where relevant:

  | Component         | Hover | Active | Focus `TAB` | `ENTER` / `SPACE` |
  | :---------------- | :---: | :----: | :---------: | :---------------: |
  | Accordion         |  ✅   |   ✅   |     ✅      |        ✅         |
  | Action Sheet      |  ✅   |   ✅   |     ✅      |        ✅         |
  | Alert             |  ✅   |   ✅   |     ✅      |        ✅         |
  | Button            |  ✅   |   ✅   |     ✅      |        ✅         |
  | Calendar          |  ✅   |   ✅   |             |                   |
  | Card              |  ✅   |   ✅   |     ✅      |        ✅         |
  | Chart             |  ✅   |        |             |                   |
  | Checkbox          |  ✅   |   ✅   |     ✅      |                   |
  | Chip              |  ✅   |   ✅   |     ✅      |        ✅         |
  | Dropdown          |  ✅   |   ✅   |     ✅      |        ✅         |
  | Fab Sheet         |  ✅   |   ✅   |             |                   |
  | Form Field        |  ✅   |   ✅   |     ✅      |                   |
  | Item - Picker     |  ✅   |   ✅   |             |        ✅         |
  | Link              |  ✅   |   ✅   |     ✅      |        ✅         |
  | List              |  ✅   |   ✅   |     ✅      |        ✅         |
  | List Swipe        |       |        |             |                   |
  | Modal             |       |        |             |                   |
  | Radio             |  ✅   |   ✅   |     ✅      |        ✅         |
  | Range             |  ✅   |   ✅   |     ✅      |        ✅         |
  | Reorder List      |       |        |             |                   |
  | Segmented Control |  ✅   |   ✅   |     ✅      |        ✅         |
  | Slide Button      |  ✅   |   ✅   |             |                   |
  | Slides            |       |        |             |                   |
  | Tabs              |  ✅   |   ✅   |     ✅      |        ✅         |
  | Toggle            |  ✅   |   ✅   |     ✅      |        ✅         |
  | Toggle Button     |  ✅   |   ✅   |     ✅      |        ✅         |

## [6.4.1](https://github.com/kirbydesign/designsystem/pull/2470) (09-09-2022)

### Bugfixes

- **accordion** - add note for using Accordion in microfrontends (#2436)
- **fab-sheet** - fix backdrop showing up when fab is closed (#2459)
- **page** - fix emission of enter and leave events (#2387)
- **segmented-control** - add option for setting selectedIndex in segmentSelect call-back (#2407)

### Features

- **accordion** - add option to disable accordion items (#2451)
- **calendar** - add option to specify which dates should be enabled (#2454)

## [6.3.1](https://github.com/kirbydesign/designsystem/pull/2421) (16-08-2022)

- Upgrade to Ionic 6

## [6.2.1](https://github.com/kirbydesign/designsystem/pull/2414) (11-08-2022)

### Bugfixes

- **dropdown** - fix scroll problem on touch devices ([#2396](https://github.com/kirbydesign/designsystem/pull/2396))
- **fabsheet** - add missing close icon ([#2403](https://github.com/kirbydesign/designsystem/pull/2403))
- **fabsheet** - fix missing backdrop on mobile devices ([#2401](https://github.com/kirbydesign/designsystem/pull/2401))
- **item** - fix slotted items being unclickable ([#2381](https://github.com/kirbydesign/designsystem/pull/2381))
- **modal** - refactor moving of modal elements, solves multiple issues ([#2238](https://github.com/kirbydesign/designsystem/pull/2238))
- **segmented-control** - avoid removing focus on embedded badge click ([#2400](https://github.com/kirbydesign/designsystem/pull/2400))

### Features

- **icons** - add menu icons ([#2409](https://github.com/kirbydesign/designsystem/pull/2409))

## [6.1.1](https://github.com/kirbydesign/designsystem/pull/2373) (27-06-2022)

### Bugfixes

- **chart** - fix problem where chart.js plugins imported as default are not loading ([#2369](https://github.com/kirbydesign/designsystem/pull/2369))
- **dropdown** - experimental popover feature: fix item-selection on dropdown with popover in safari ([#2356](https://github.com/kirbydesign/designsystem/pull/2356))
- **flag** - calculate total height correctly using line height ([#2365](https://github.com/kirbydesign/designsystem/pull/2365))
- **modal** - fix modal `closeButton` and `supplementaryButton` too small ([#2350](https://github.com/kirbydesign/designsystem/pull/2350))

### Features

- **flag** - allow flag notification colors to be overridden ([#2361](https://github.com/kirbydesign/designsystem/pull/2361))
- **page** - add backButtonClicked event to page component ([#2316](https://github.com/kirbydesign/designsystem/pull/2316))
- **icons** - add 'insurance' icon ([#2360](https://github.com/kirbydesign/designsystem/pull/2360))

## [6.0.0](https://github.com/kirbydesign/designsystem/pull/2337) (15-06-2022)

### Bugfixes

- **button** - change size of icon on icon-only buttons ([#2306](https://github.com/kirbydesign/designsystem/pull/2306))
- **form-field** - medium sized date type inputfield layout error ([#2314](https://github.com/kirbydesign/designsystem/pull/2314))

### Features

**[multiple components](https://github.com/kirbydesign/designsystem/blob/main/MIGRATION.md#additional-performance-notice)** - OnPush change detection enabled for simplest components ([#2169](https://github.com/kirbydesign/designsystem/pull/2169))

- **icons** - pension icons ([#2299](https://github.com/kirbydesign/designsystem/pull/2299))
- **icons** - replace arrow icons ([#2298](https://github.com/kirbydesign/designsystem/pull/2298))
- **modal** - add `collapsibleTitle` functionality to modal config ([#2154](https://github.com/kirbydesign/designsystem/pull/2154))
- **page** - add option for sub-title to page-title ([#2030](https://github.com/kirbydesign/designsystem/pull/2030))

### Breaking Changes

For a more comprehensive list of changes needed in v6 see the [migration notes](https://github.com/kirbydesign/designsystem/blob/main/MIGRATION.md).

- **alert** - remove deprecated `okBtnText` and `cancelBtnText` from `AlertConfig` ([#2175](https://github.com/kirbydesign/designsystem/pull/2175))
- **chart** - remove deprecated 'dataLabels' property ([#2178](https://github.com/kirbydesign/designsystem/pull/2178))
- **icons** - remove option to inject IconSettings via IconRegistryService constructor ([#2171](https://github.com/kirbydesign/designsystem/pull/2171))
- **list** - remove deprecated list directives ([#2184](https://github.com/kirbydesign/designsystem/pull/2184))
- **modal** - remove deprecated ModalConfig title ([#2155](https://github.com/kirbydesign/designsystem/pull/2155))
- **modal** - remove deprecated dim property on ModalConfig ([#2177](https://github.com/kirbydesign/designsystem/pull/2177))
- **segmented-control** - remove deprecated 'checked' property on SegmentItem interface ([#2190](https://github.com/kirbydesign/designsystem/pull/2190))
- **toast** - remove deprecated toast danger MessageType ([#2181](https://github.com/kirbydesign/designsystem/pull/2181))

- **Angular 13 update** - from v6 and onwards, Kirby no longer supports Angular projects using the Legacy View Engine. Applications already using Ivy should see no differences other than Kirby not needing an additional compile-step on their side via `ngcc`.

## [5.4.0](https://github.com/kirbydesign/designsystem/pull/2287) (22-05-2022)

### Bugfixes

- **dropdown** - experimental popover feature: Fix popovers hide() being called twice ([#2195](https://github.com/kirbydesign/designsystem/pull/2195))
- **dropdown** - experimental popover feature: Only prevent touchevent outside popover ([#2205](https://github.com/kirbydesign/designsystem/pull/2205))

### Features

- **segmented-control** - add new option to disable change on swipe ([#2237](https://github.com/kirbydesign/designsystem/pull/2237))

## [5.3.0](https://github.com/kirbydesign/designsystem/pull/2182) (22-04-2022)

### Bugfixes

- **calendar** - Calculate UTC offset based on correct date ([#2115](https://github.com/kirbydesign/designsystem/pull/2115))
- **chart** - Allow chart labels to be provided together with datasets ([#2157](https://github.com/kirbydesign/designsystem/pull/2157))
- **item** - Set correct fallback value for padding-top and padding-bottom to avoid too large items ([#2118](https://github.com/kirbydesign/designsystem/pull/2118))

### Features

- **flag** - New danger color and heavier font weight ([#2156](https://github.com/kirbydesign/designsystem/pull/2156))
- **icon** - Update 'more' icon ([#2176](https://github.com/kirbydesign/designsystem/pull/2176))
- **multiple components** - Allow non-enum inputs in components to allow e.g. size inputs as strings ([#2093](https://github.com/kirbydesign/designsystem/pull/2093))

## [5.2.0](https://github.com/kirbydesign/designsystem/pull/2113) (17-03-2022)

### Bugfixes

- **page** - Push scaling of header to next cycle ([#2111](https://github.com/kirbydesign/designsystem/pull/2111))

### Features

- **card** - Add "backgroundImageUrl" and custom css properties for controlling background of the card component ([#2047](https://github.com/kirbydesign/designsystem/pull/2047))
- **chart** - Make it possible to use time scale as a custom option for chart ([#2082](https://github.com/kirbydesign/designsystem/pull/2082))
- **mocks** - Add missing input properties to card and modal footer mocks ([#2084](https://github.com/kirbydesign/designsystem/pull/2084))

## [5.1.0](https://github.com/kirbydesign/designsystem/pull/2048) (14-01-2022)

### Bugfixes

- **chart** - only redraw chart on input changes if it has been rendered at least once ([#2017](https://github.com/kirbydesign/designsystem/pull/2017))

### Features

- **list-experimental** - add rounded corners and shadow to list ([#2029](https://github.com/kirbydesign/designsystem/pull/2029))
- **modal** - Added `type` input property for inline kirby-modal-footer style ([#1982](https://github.com/kirbydesign/designsystem/pull/1982))
