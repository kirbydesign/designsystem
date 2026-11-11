# Charts

## Choose the path

| Requirement                               | Start with                                           | Verify before implementing                                       |
| ----------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------------------- |
| Standard chart                            | Chart showcase and `@kirbydesign/designsystem/chart` | Supported chart types, datasets, options and accessibility text. |
| Stock/time-series chart                   | Stock-chart showcase                                 | Date adapter, locale/timezone, range and display behavior.       |
| Chart.js behavior beyond component inputs | Chart configuration guide                            | Exported config helpers and Chart.js/plugin versions.            |

## Chart configuration and lifecycle

Prefer the standard chart components where they meet the requirement. The custom configuration
guide uses `StockChartConfig.baseConfig` and `registerPlugins()`, then constructs a Chart.js instance.
The helper is marked experimental in the source; confirm adoption and installed compatibility
before choosing it for a corporate application.

For that path:

1. Import `StockChartConfig` from the public `@kirbydesign/designsystem/chart` entry point when
   exported by the installed version, and `Chart` from `chart.js`.
2. Use a relatively positioned wrapper and a canvas available after view initialization. Use a
   canvas reference or a document-unique ID so repeated charts do not target the same element.
3. Register the documented plugins before creating the chart in `ngAfterViewInit`.
4. Derive a configuration from the base without mutating the shared configuration. Supply datasets
   and labels that match the actual chart type. Verify date adapter registration for time scales.
5. Destroy the created Chart.js instance in `ngOnDestroy`. Test repeated navigation and recreation.
6. Supply meaningful accessible fallback content or a data alternative; a canvas drawing alone
   does not expose its information.

The guide's conceptual example omits imports and uses legacy top-level Kirby imports in its
underlying example. Resolve exports in the installed secondary entry point instead of copying
those import patterns. Treat configuration helpers as version-sensitive, not as a stable universal
chart API.

Sources:
[chart config guide](https://github.com/kirbydesign/designsystem/tree/develop/apps/cookbook/src/app/guides/chart-config-guide),
[stock config example](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/examples/charts-example/examples/config/stock-config/chart-example-config-base-stock.component.ts),
[helper stability](https://github.com/kirbydesign/designsystem/blob/develop/libs/designsystem/chart/src/chart-config/chart-stock-config/chart-stock-config.ts).
