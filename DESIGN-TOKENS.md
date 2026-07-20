# Design Tokens Pipeline

This document describes how Figma-exported color tokens are transformed into CSS custom properties with proper variable references, theme scoping, and the **surface-as-override** pattern.

## Overview

The pipeline converts three Figma Variables exports into style-dictionary compatible DTCG tokens, then builds CSS with:

- **Palette primitives** (`--kirby-color-*`) defined in `:root`, split into two files:
  - **Core palette** — shared Kirby design system colors (greys, white, focus, etc.)
  - **Brand palette** — brand-specific colors (no brand name in variable names, so brand colors naturally override core colors with the same family name)
- **Semantic theme tokens** (`--kirby-theme-color-*`) using the surface-as-override pattern:
  - `.kirby-theme-base` — full theme definition (~335 tokens)
  - `.kirby-theme-raised` — only tokens that differ from base (~25 tokens)
  - `.kirby-theme-brand` — only tokens that differ from base (~318 tokens)

Surfaces override the base theme via CSS custom property inheritance. Components use semantic tokens (`var(--kirby-theme-color-fill-base-default)`) and the correct value comes from whichever surface class is closest in the DOM.

## Architecture

```
Figma Variables Exports (3 files)
  kirby-tier-1.json ────────── Shared Kirby palette primitives
  <brand>-tier-1.json ──────── Brand-specific palette primitives
  <brand>-sematic-tokens.json ── Semantic tokens (base, raised, brand modes)
        │
        │  node scripts/build-figma-tokens.js \
        │       kirby-tier-1.json <brand>-tier-1.json <brand>-sematic-tokens.json
        ▼
┌───────────────────────────┐
│ tokens/color-palette.json │  Palette with two tiers:
│                           │    core           = shared Kirby colors
│                           │    brand-palette   = brand-specific colors
│ tokens/colors.json        │  Semantic tokens with surface-as-override:
│                           │    base = full set, raised/brand = deltas only
└───────────────────────────┘
        │
        │  (style-dictionary build runs automatically)
        ▼
┌───────────────────────────────┐
│ css/color-palette-core.css    │  :root { --kirby-color-*: #hex; }
│ css/color-palette-brand.css   │  :root { --kirby-color-*: #hex; }
│ css/theme-base.css            │  .kirby-theme-base { all ~335 tokens }
│ css/theme-raised.css          │  .kirby-theme-raised { ~25 override tokens }
│ css/theme-brand.css           │  .kirby-theme-brand { ~318 override tokens }
└───────────────────────────────┘
```

## Surface-as-Override Pattern

Instead of each surface defining all ~335 tokens redundantly, only the **base** surface carries the full theme. The **raised** and **brand** surfaces define only the tokens whose values differ from base.

This works because CSS custom properties inherit through the DOM:

```html
<body class="kirby-theme-base">
  <!-- Base defines all 335 tokens -->
  <div class="kirby-theme-raised">
    <!-- Raised overrides ~25 tokens; the rest inherit from base -->
    <div class="kirby-theme-brand">
      <!-- Brand overrides ~318 tokens; the rest inherit -->
    </div>
  </div>
</body>
```

### Delta breakdown

| Surface | Tokens       | Reduction |
| ------- | ------------ | --------- |
| base    | ~335 (full)  | —         |
| raised  | ~25 (delta)  | 93% fewer |
| brand   | ~318 (delta) | 5% fewer  |

The raised surface is nearly identical to base — only fill-base, some borders, a few chart, and spot tokens shift. The brand surface is fundamentally different (dark background, inverted content colors) so its delta is large.

## Running the Pipeline

```sh
# Single command — parses Figma exports and builds CSS:
node scripts/build-figma-tokens.js kirby-tier-1.json <brand>-tier-1.json <brand>-sematic-tokens.json

# Or via npm (args forwarded after --):
npm run build-figma-tokens -- kirby-tier-1.json <brand>-tier-1.json <brand>-sematic-tokens.json
```

The three positional arguments are:

1. **kirby-palette** — shared Kirby palette primitives JSON
2. **brand-palette** — brand-specific palette primitives JSON
3. **semantic-tokens** — semantic tokens JSON with surface modes

File paths are resolved relative to the current working directory.

The script auto-detects the brand palette collection name from the semantic tokens file's alias references, so no per-brand configuration is needed.

### Running the steps separately

If you need to debug or run steps independently:

```sh
# Step 1: Parse Figma exports into style-dictionary token files
node scripts/parse-figma-colors.js kirby-tier-1.json <brand>-tier-1.json <brand>-sematic-tokens.json

# Step 2: Build CSS from tokens
npx style-dictionary@4 build --config sd.config.mjs
```

## File Roles

| File                            | Purpose                                                                           |
| ------------------------------- | --------------------------------------------------------------------------------- |
| `kirby-tier-1.json`             | Input: shared Kirby palette primitives (Collection 1, tier 1)                     |
| `<brand>-tier-1.json`           | Input: brand-specific palette primitives (Collection 1, tier 2)                   |
| `<brand>-sematic-tokens.json`   | Input: semantic tokens with 3 surface modes (Collection 2)                        |
| `tokens/color-palette.json`     | Generated: palette with `core` and `brand-palette` tiers (no brand name in paths) |
| `tokens/colors.json`            | Generated: semantic tokens with base (full) + raised/brand (deltas)               |
| `scripts/parse-figma-colors.js` | Parser: 3 Figma files → DTCG with references + delta computation                  |
| `scripts/build-figma-tokens.js` | Wrapper: runs parser then style-dictionary build in one command                   |
| `sd.config.mjs`                 | Style Dictionary v4 config: transforms, filters, output files                     |
| `css/color-palette-core.css`    | Output: shared Kirby palette primitives under `:root`                             |
| `css/color-palette-brand.css`   | Output: brand-specific palette primitives under `:root`                           |
| `css/theme-base.css`            | Output: full base theme under `.kirby-theme-base`                                 |
| `css/theme-raised.css`          | Output: raised overrides under `.kirby-theme-raised`                              |
| `css/theme-brand.css`           | Output: brand overrides under `.kirby-theme-brand`                                |

## How It Works

### 1. Parser (`scripts/parse-figma-colors.js`)

The parser reads three Figma Variables exports:

**Palette building:**

1. Reads `kirby-tier-1.json` — shared colors under `core.*`
2. Reads `<brand>-tier-1.json` — brand-specific colors under `brand-palette.*` (no brand name in paths)
3. Writes both tiers into `tokens/color-palette.json`

Brand palette colors use the same `--kirby-color-{family}-{shade}` namespace as core colors. When a brand defines a color family that also exists in core (e.g., `green`, `red`), the brand's version overrides the core version at load time.

**Semantic token transformation:**

1. Reads `<brand>-sematic-tokens.json` containing three modes: `base`, `raised`, `brand`
2. For each token, resolves the Figma alias (`$extensions.com.figma.aliasData`) to a DTCG reference:
   - Shared palette aliases: `kirby/color/white/00` → `{core.white.00}`
   - Brand palette aliases: `sand/50` → `{brand-palette.sand.50}`
3. **Base mode**: includes ALL color tokens (full theme)
4. **Raised/brand modes**: only includes tokens whose resolved reference differs from base
5. Strips all Figma metadata (`$extensions`, `com.figma.*`)
6. Reports naming inconsistencies between modes as warnings

### 2. Style Dictionary Build (`sd.config.mjs`)

Uses a custom `name/kirby` transform:

- **Palette tokens** (path starts with `core` or `brand-palette`): tier prefix stripped, prefixed `kirby-color-` → `--kirby-color-sand-50`
- **Semantic tokens** (path starts with a mode): mode segment stripped, prefixed `kirby-theme-color-` → `--kirby-theme-color-fill-base-default`

Output is split using `filter` and `selector`:

- Core palette → `:root` in `color-palette-core.css`
- Brand palette → `:root` in `color-palette-brand.css`
- Each mode → `.kirby-theme-{mode}` (with `var()` references to palette)

## Palette Structure

Two tiers of primitives share the same `--kirby-color-*` namespace:

| Tier  | File                          | Purpose                                                                                                           |
| ----- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Core  | `css/color-palette-core.css`  | Shared Kirby design system colors (light-grey, dark-grey, green, white, yellow, orange, red, purple, blue, focus) |
| Brand | `css/color-palette-brand.css` | Brand-specific colors — families with the same name as core families (e.g., `green`, `red`) override them         |

Both tiers use the same variable pattern: `--kirby-color-{family}-{shade}`. Load the brand palette after the core palette so brand overrides take effect.

## Naming Conventions

| Layer                 | Prefix                 | Example                                 |
| --------------------- | ---------------------- | --------------------------------------- |
| Palette primitives    | `--kirby-color-`       | `--kirby-color-sand-50`                 |
| Semantic theme tokens | `--kirby-theme-color-` | `--kirby-theme-color-fill-base-default` |

## Token Categories

Semantic tokens are organized by category:

| Category           | Example tokens                                                           |
| ------------------ | ------------------------------------------------------------------------ |
| `fill`             | `fill-base-default`, `fill-brand-loud-hover`, `fill-danger-quiet-active` |
| `content`          | `content-base-loud-default`, `content-raised-normal-hover`               |
| `border`           | `border-base-silent-default`, `border-focus-normal`                      |
| `chart`            | `chart-positive-01-default`, `chart-fifth-06-active`                     |
| `spot`             | `spot-fill-quiet-default`, `spot-content-loud-default`                   |
| `logo`             | `logo-default`                                                           |
| `tabs`             | `tabs-fill-default`                                                      |
| `toolbar-scrolled` | `toolbar-scrolled-fill-default`                                          |

## Usage in CSS

```css
@import 'css/color-palette-core.css';
@import 'css/color-palette-brand.css'; /* loaded second — overrides core families */
@import 'css/theme-base.css';
@import 'css/theme-raised.css';
@import 'css/theme-brand.css';
```

```html
<body class="kirby-theme-base">
  <!-- All 335 semantic tokens defined -->
  <div style="background: var(--kirby-theme-color-fill-base-default)">
    <section class="kirby-theme-raised">
      <!-- ~25 tokens overridden; rest inherit from base -->
    </section>
    <section class="kirby-theme-brand">
      <!-- ~318 tokens overridden for dark branded surface -->
    </section>
  </div>
</body>
```

## Known Issues

### Naming inconsistencies across modes

Some tokens have different names in different Figma modes, preventing proper delta computation:

| Base mode                       | Raised mode                     | Brand mode                 |
| ------------------------------- | ------------------------------- | -------------------------- |
| `tabs.fill.default`             | `tabs.default`                  | `tabs.normal-default`      |
| `toolbar-scrolled.fill.default` | `toolbar-scrolled.default`      | `toolbar-scrolled.default` |
| `spot.fill.danger-default`      | `spot.fill.spot-danger-default` | `spot.fill.danger-default` |

These produce separate CSS variables per surface instead of proper overrides. Fix in Figma by aligning variable names across modes.

### Alpha values

Some palette tokens (e.g., `white/00-94`) represent colors with alpha that cannot be captured in hex format. These are exported as opaque hex values.

## Updating After Figma Re-export

1. Export the three variable collections from Figma (JSON format):
   - Shared Kirby palette → `kirby-tier-1.json`
   - Brand-specific palette → `<brand>-tier-1.json`
   - Semantic tokens → `<brand>-sematic-tokens.json`
2. Run `node scripts/build-figma-tokens.js kirby-tier-1.json <brand>-tier-1.json <brand>-sematic-tokens.json`
3. Commit the updated `tokens/` and `css/` files

## Adding a New Brand

To add another white-label brand:

1. Export the brand's tier-1 palette as `<brand>-tier-1.json`
2. Export the brand's semantic tokens as `<brand>-sematic-tokens.json`
3. Run `node scripts/build-figma-tokens.js kirby-tier-1.json <brand>-tier-1.json <brand>-sematic-tokens.json`

The brand palette collection name is auto-detected from the semantic tokens file's alias references — no script changes required.
