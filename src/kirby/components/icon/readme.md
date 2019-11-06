# Add new icons

To add new icons, you should use the [icomoon app](https://icomoon.io).

## Generate font from svg's

1. Upload selection.json to get existing icons and settings
2. Upload new icons
3. Download Font

## Update kirby icons

1. Replace src/kirby/icon/selection.json, with newly generated selection.json
2. Replace src/fonts/kirby.ttf, with newly generated kirby.ttf
3. Update kirby-custom-icon-settings.ts with new icons (old icons should not have changed)
4. Add new icon svg's to src/assets/icons/kirby
