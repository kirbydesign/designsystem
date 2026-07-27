/**
 * Kirby design-token pipeline config.
 *
 * This is the only place the design system's vocabulary lives — surfaces, the
 * `" surface"` suffix, selector shapes, units and exclusions. The pipeline
 * in tools/design-tokens knows none of it.
 *
 * See docs/decisions/001-design-token-system.md for the rationale and
 * tools/design-tokens/README.md for the config reference.
 */

export default {
  prefix: 'kirby',

  /**
   * Units for numeric leaves. `scopes` matches Figma's `com.figma.scopes`;
   * `paths` matches the leaf's source path, for collections Figma scopes as
   * ALL_SCOPES (which carries no dimensional signal).
   */
  units: {
    px: {
      scopes: ['WIDTH_HEIGHT', 'GAP', 'CORNER_RADIUS', 'FONT_SIZE', 'LINE_HEIGHT', 'STROKE_FLOAT'],
      // Figma scopes these ALL_SCOPES, which carries no dimensional signal.
      paths: ['* surface/elevation/**', 'background-blur/**'],
    },
    // Figma stores opacity 0–100, which is valid CSS as a percentage. Covers
    // both the `transparency` collection and the opacity values Figma keeps
    // inside the colour scope (`system/color/transparency/*`).
    '%': { scopes: ['OPACITY', 'COLOR_OPACITY'] },
  },

  ruleSets: {
    // ═══ Palette ═════════════════════════════════════════════════════════
    // Two files: colours, and everything else. The scope stays in the name
    // via {path}, so merging collections into one file collides with nothing.
    palette: [
      //   system/color/green/500    → :root { --kirby-system-color-green-500 }
      //   brand/color/dark-blue/950 → :root { --kirby-brand-color-dark-blue-950 }
      //
      // Must precede `collection`, which also matches these paths. Here the
      // order genuinely matters — the two rules route to different files.
      {
        id: 'color',
        match: '*/color/**',
        variable: '{prefix}-{path}',
        output: 'primitives/color.css',
      },

      //   spacing/s         → :root { --kirby-spacing-s: 16px }
      //   border-radius/xxs → :root { --kirby-border-radius-xxs: var(--kirby-spacing-xxxxs) }
      {
        id: 'collection',
        match: '{category}/**',
        variable: '{prefix}-{path}',
        output: 'primitives/collection.css',
        section: '{category}',
      },
    ],

    // ═══ Theme ═══════════════════════════════════════════════════════════
    // Everything surface-scoped lands in one file, component groups included.
    // The captured category still drives the name, so adding a component
    // group in Figma needs no config change.
    //
    //   base surface/color/fill/base         → --kirby-color-fill-base
    //   raised surface/spot/color/fill/base  → --kirby-spot-color-fill-base
    //   base surface/elevation/2/blur        → --kirby-elevation-2-blur
    theme: [
      // font/weight/* aliases the font-weight primitives, so it would emit
      // --kirby-font-weight-* a second time at :root — a self-reference.
      { id: 'ignore-font-weight', match: 'font/weight/**', ignore: true },

      // Chart tokens are not needed yet, and are still filed under the
      // standard `color` category rather than as a component group. Delete
      // this rule once the export moves them to `<surface>/chart/color/*`.
      { id: 'ignore-chart', match: '* surface/color/chart/**', ignore: true },

      // The base surface is also seeded at :root so the default theme applies
      // without an explicit class.
      {
        id: 'surface-base',
        match: 'base surface/{category}/**',
        variable: '{prefix}-{category}-{rest}',
        selector: ':root, .{prefix}-surface-base',
        output: 'semantic/theme.css',
        section: '{category}',
      },
      {
        id: 'surface',
        match: '{surface} surface/{category}/**',
        variable: '{prefix}-{category}-{rest}',
        selector: '.{prefix}-surface-{surface}',
        output: 'semantic/theme.css',
        section: '{category}',
      },

      // Anything not surface-scoped, in its own section alongside them.
      // font/family → :root { --kirby-font-family } under a `font` comment.
      //
      // MUST STAY LAST. `{group}/**` matches every path of two or more
      // segments, so any rule below it would never fire. The config loader
      // rejects that rather than letting it silently corrupt the output.
      {
        id: 'group',
        match: '{group}/**',
        variable: '{prefix}-{path}',
        output: 'semantic/theme.css',
        section: '{group}',
      },
    ],
  },
};
