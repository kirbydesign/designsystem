# Changelog

Notable changes to the project will be documented in this file.

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
