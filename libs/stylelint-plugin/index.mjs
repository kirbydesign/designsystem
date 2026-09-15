import useDesignTokens from './rules/use-design-tokens/index.mjs';

// A Stylelint "plugin pack": exporting an array of plugin objects lets this one
// package provide multiple rules under the `kirby/` namespace over time.
// See https://stylelint.io/developer-guide/plugins/#plugin-packs
export default [useDesignTokens];
