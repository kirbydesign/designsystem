import { testRule } from 'stylelint-test-rule-node';

import plugin, { ruleName, messages } from './index.mjs';

const FIX = { plugins: [plugin], ruleName, config: true, customSyntax: 'postcss-scss', fix: true };

// Reasons emitted by the rule for manual-migration (unfixable) cases.
const SCSS_VAR_ARG = 'SCSS variable argument cannot be resolved at lint time';
const GET_VALUE_ONLY =
  'get-color() with $getValueOnly: true returns a raw value for SCSS color manipulation';
const feedsCalc = (prop) =>
  `${prop} feeds a SCSS calculation — convert the calculation to CSS calc() using the design token(s)`;
const bareArithmetic =
  'used in a SCSS arithmetic expression — convert the calculation to CSS calc() using the design token(s)';

testRule({
  ...FIX,
  accept: [
    { code: '.a { color: red; }' },
    { code: '.a { width: 10px; }' },
    // A plain CSS var() is already a token — nothing to do.
    { code: '.a { color: var(--kirby-primary); }' },
  ],

  reject: [
    // --- Fixable: SCSS function → design token -------------------------------
    {
      code: ".a { width: utils.size('m'); }",
      fixed: '.a { width: var(--kirby-spacing-m); }',
      message: messages.replaced("utils.size('m')", 'var(--kirby-spacing-m)'),
      line: 1,
      column: 13,
    },
    {
      code: ".a { margin-top: size('-m'); }",
      fixed: '.a { margin-top: calc(-1 * var(--kirby-spacing-m)); }',
      message: messages.replaced("size('-m')", 'calc(-1 * var(--kirby-spacing-m))'),
    },
    {
      code: ".a { font-size: utils.icon-font-size('sm'); }",
      fixed: '.a { font-size: var(--kirby-icon-font-size-sm); }',
      message: messages.replaced("utils.icon-font-size('sm')", 'var(--kirby-icon-font-size-sm)'),
    },
    // font-size() must not be swallowed by the icon-font-size() mapping.
    {
      code: ".a { font-size: utils.font-size('n'); }",
      fixed: '.a { font-size: var(--kirby-font-size-n); }',
      message: messages.replaced("utils.font-size('n')", 'var(--kirby-font-size-n)'),
    },
    // Redundant #{} interpolation is stripped once the value is pure CSS.
    {
      code: ".a { --kirby-icon-font-size: #{utils.icon-font-size('xs')}; }",
      fixed: '.a { --kirby-icon-font-size: var(--kirby-icon-font-size-xs); }',
      message: messages.replaced("utils.icon-font-size('xs')", 'var(--kirby-icon-font-size-xs)'),
    },
    // A call nested inside a var() fallback is still migrated.
    {
      code: ".a { font-size: var(--kirby-icon-font-size, utils.icon-font-size('sm')); }",
      fixed: '.a { font-size: var(--kirby-icon-font-size, var(--kirby-icon-font-size-sm)); }',
      message: messages.replaced("utils.icon-font-size('sm')", 'var(--kirby-icon-font-size-sm)'),
    },
    // A SCSS variable not used in arithmetic is safe to migrate.
    {
      code: "$m: utils.size('m');\n.a { margin: $m; }",
      fixed: '$m: var(--kirby-spacing-m);\n.a { margin: $m; }',
      message: messages.replaced("utils.size('m')", 'var(--kirby-spacing-m)'),
    },
    // A variable used only inside a CSS calc() is safe to migrate.
    {
      code: "$m: utils.size('m');\n.a { width: calc(#{$m} + 2px); }",
      fixed: '$m: var(--kirby-spacing-m);\n.a { width: calc(#{$m} + 2px); }',
      message: messages.replaced("utils.size('m')", 'var(--kirby-spacing-m)'),
    },
    // Multiplication inside a CSS calc() is valid CSS — migrate, don't guard.
    {
      code: ".a { width: calc(utils.size('m') * 2); }",
      fixed: '.a { width: calc(var(--kirby-spacing-m) * 2); }',
      message: messages.replaced("utils.size('m')", 'var(--kirby-spacing-m)'),
    },
    // Nested var() inside calc() must not be mis-read as Sass math.
    {
      code: "$r: utils.size('xs');\n.a { top: calc(var(--pad) + 1px - $r); }",
      fixed: "$r: var(--kirby-spacing-xs);\n.a { top: calc(var(--pad) + 1px - $r); }",
      message: messages.replaced("utils.size('xs')", 'var(--kirby-spacing-xs)'),
    },
    // Two problems in one rule.
    {
      code: ".a { color: get-color('primary'); width: size('m'); }",
      fixed: '.a { color: var(--kirby-primary); width: var(--kirby-spacing-m); }',
      warnings: [
        { message: messages.replaced("get-color('primary')", 'var(--kirby-primary)') },
        { message: messages.replaced("size('m')", 'var(--kirby-spacing-m)') },
      ],
    },

    // --- Unfixable: reported for manual migration, source untouched ----------
    // A SCSS variable argument cannot be resolved at lint time.
    {
      code: '.a { width: utils.icon-font-size($my-var); }',
      unfixable: true,
      message: messages.manual('utils.icon-font-size($my-var)', SCSS_VAR_ARG),
    },
    // get-color() with $getValueOnly: true returns a raw SCSS value.
    {
      code: ".a { color: utils.get-color('white', $getValueOnly: true); }",
      unfixable: true,
      message: messages.manual("utils.get-color('white', $getValueOnly: true)", GET_VALUE_ONLY),
    },
    // A variable that feeds a Sass calculation elsewhere must stay a Sass value.
    {
      code: "$m: utils.size('m');\n.a { width: $m * 2; }",
      unfixable: true,
      message: messages.manual("utils.size('m')", feedsCalc('$m')),
    },
    // A call sitting directly in bare Sass arithmetic must be migrated by hand.
    {
      code: "$badge-radius: utils.size('xxxs') * 0.5;\n.a { top: calc(1px - $badge-radius); }",
      unfixable: true,
      message: messages.manual("utils.size('xxxs')", bareArithmetic),
    },
    // A variable feeding @return arithmetic inside a function is guarded.
    {
      code: "$s: utils.size('m');\n@function f($h) {\n  @return ($h - $s) * 0.5;\n}",
      unfixable: true,
      message: messages.manual("utils.size('m')", feedsCalc('$s')),
    },
  ],
});
