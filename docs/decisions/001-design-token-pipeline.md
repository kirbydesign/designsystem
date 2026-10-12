# ADR-001: Design Token Pipeline

## Status

Accepted

## Date

2026-09-28

## Context

The overall theming model, and the concepts used in this document, is described in [`DESIGN-TOKENS.md`](../DESIGN-TOKENS.md).
Design Tokens are maintained in Figma, exported as JSON, and used by components as CSS custom properties.

The following considerations apply:

- Figma structure can change over time
- Apps add a brand on top of the built-in Kirby brand
- Figma cannot represent every value Kirby needs, such as responsive font sizes and combined box-shadows

## Decision

1. **Output is DTCG and CSS.** The pipeline can produce two types outputs:

- a DTCG json document that consolidates one or more Figma Extended Collections into one Style Dictionaty supported format, used for generating CSS files
- a number of CSS files with Custom Properties that components can consume.

2. **Preserve Figmas token paths.** The DTCG document follows the structure from Figma, and prefixes etc. are added afterwards when generating CSS. This preserves references and makes the DTCG document more comparable to Figma.

3. **Config mirrors the CSS output.** The config lists the output files and the selector blocks in each, with Figma path globs choosing each block's tokens. A separate function gives each token its CSS name. A token goes to the first block that includes it, in the order written. This keeps Kirby's theming model out of the generator and lets config change as Figma's structure changes.

4. **Handle every token.** A token that no block includes fails the build; listing it under `ignore` deliberately excludes it from CSS. A semantic token (figma alias) whose target variable is not present produces a warning, since it may be intentional but needs review.

5. **Check duplicate CSS names per selector.** The same token may be defined under multiple selectors (e.g. the surface concept), so a global duplicate check would flag duplicates that are intended.

- As an example, each surfaces defines the same semantic and component tokens, so they could appear to be duplicates, rather than intentionally re-mapping semantic tokens per surface.

6. **Warn about differences between surfaces rather than failing.** Some differences are intentional, so the warning leaves the decision to the reviewer.

7. **Commit the DTCG JSON and generated CSS, not the Figma exports.** The JSON is the reproducible source for the built-in theme.

8. **Use Style Dictionary for CSS generation.** The generator supplies Kirby-specific naming, placement, units, and sections rather than implementing those features itself.

9. **Represent app themes as differences from Kirby.** Compare an app theme with Kirby's baseline, and assume that Kirby's CSS is loaded before the app's CSS. This lets apps receive Kirby's fixes and new tokens without regenerating a complete theme.

10. **Generate only values Figma can represent.** Responsive font sizes, unitless line heights, and combined shadows can be written by hand on top of generated values.

## Consequences

- Renaming a token path in Figma changes its CSS custom property name and can break components using the old name.
- Warnings do not stop the build, so reviewers must inspect warnings and generated changes before promotion.
- App themes depend on Kirby's CSS and its load order; Kirby changes to values an app has not overridden take effect when Kirby is updated in apps.
- The pipeline depends on Style Dictionary. JSON-to-CSS regression test make changes to its output reviewable.
