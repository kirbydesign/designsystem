# Charts

## Choose the path

| Requirement                               | Start with                                              | Verify before implementing                                       |
| ----------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------- |
| Standard chart                            | Chart components from `@kirbydesign/designsystem/chart` | Supported chart types, datasets, options and accessibility text. |
| Stock/time-series chart                   | Stock-chart component from the chart entry point        | Date adapter, locale/timezone, range and display behavior.       |
| Chart.js behavior beyond component inputs | Custom configuration workflow below                     | Exported config helpers and Chart.js/plugin versions.            |

## Chart configuration and lifecycle

For custom stock-chart configuration, use `StockChartConfig.baseConfig` and `registerPlugins()`,
then construct a Chart.js instance.
The helper is experimental; confirm adoption and installed compatibility
before choosing it for the application.

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
