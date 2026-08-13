import stylelint from 'stylelint';

const { createPlugin, utils: stylelintUtils } = stylelint;

export const ruleName = 'kirby/use-design-tokens';

export const messages = stylelintUtils.ruleMessages(ruleName, {
  replaced: (fn, replacement) => `Expected "${fn}" to be "${replacement}"`,
  manual: (fn, reason) =>
    `Disallowed SCSS function "${fn}"; migrate to a Kirby design token manually: ${reason}`,
});

export const meta = {
  url: 'https://github.com/kirbydesign/designsystem/blob/develop/libs/stylelint-plugin/rules/use-design-tokens/README.md',
  fixable: true,
};

/**
 * Shared for every function-call pattern below:
 *  - `(?<![\w-])` ensures a whole function name is matched, never the suffix of
 *    a longer one. This keeps `size` from matching
 *    inside `font-size` (and `font-size` from matching inside `icon-font-size`),
 *  - `(?:[\w-]+\.)?` allows an optional Sass module namespace, e.g. `utils.`.
 *
 * Interpolated into `String.raw` templates so the surrounding backslashes stay
 * literal; the constant is itself a raw string.
 */
const FN_PREFIX = String.raw`(?<![\w-])(?:[\w-]+\.)?`;

/**
 * Function-to-CSS-custom-property mapping.
 *
 * Each entry defines:
 * - name: human-readable name of the function
 * - source: regex source string (without flags) to match the function call.
 *   All patterns start with FN_PREFIX (see above) to match whole function
 *   names only.
 * - replace: function that receives regex match groups and returns the CSS var() string
 */
const FUNCTION_MAPPINGS = [
  {
    name: 'get-color',
    source: String.raw`${FN_PREFIX}get-color\(\s*['"]([^'"]+)['"]\s*(?:,[^)]*)?\)`,
    replace: (match, key) => {
      if (/\$getValueOnly\s*:\s*true/.test(match)) return match;
      return `var(--kirby-${key})`;
    },
  },
  {
    name: 'get-text-color',
    source: String.raw`${FN_PREFIX}get-text-color\(\s*['"]([^'"]+)['"]\s*(?:,[^)]*)?\)`,
    replace: (match, key) => {
      if (/\$getValueOnly\s*:\s*true/.test(match)) return match;
      return `var(--kirby-text-color-${key})`;
    },
  },
  {
    name: 'get-decoration-color',
    source: String.raw`${FN_PREFIX}get-decoration-color\(\s*['"]([^'"]+)['"]\s*,\s*['"]?(\d+)['"]?\s*\)`,
    replace: (_match, variant, shade) => `var(--kirby-decoration-color-${variant}-${shade})`,
  },
  {
    name: 'size',
    source: String.raw`${FN_PREFIX}size\(\s*['"](-?)([\w-]+)['"]\s*\)`,
    replace: (_match, negative, key) => {
      const varRef = `var(--kirby-spacing-${key})`;
      return negative ? `calc(-1 * ${varRef})` : varRef;
    },
  },
  {
    name: 'icon-font-size',
    source: String.raw`${FN_PREFIX}icon-font-size\(\s*['"]([\w-]+)['"]\s*\)`,
    replace: (_match, key) => `var(--kirby-icon-font-size-${key})`,
  },
  {
    name: 'font-size',
    source: String.raw`${FN_PREFIX}font-size\(\s*['"]([\w-]+)['"]\s*\)`,
    replace: (_match, key) => `var(--kirby-font-size-${key})`,
  },
  {
    name: 'line-height',
    source: String.raw`${FN_PREFIX}line-height\(\s*['"]([\w-]+)['"]\s*\)`,
    replace: (_match, key) => `var(--kirby-line-height-${key})`,
  },
  {
    name: 'font-weight',
    source: String.raw`${FN_PREFIX}font-weight\(\s*['"]([\w-]+)['"]\s*\)`,
    replace: (_match, key) => `var(--kirby-font-weight-${key})`,
  },
  {
    name: 'border-radius',
    source: String.raw`${FN_PREFIX}border-radius\(\s*['"]([\w-]+)['"]\s*\)`,
    replace: (_match, key) => `var(--kirby-border-radius-${key})`,
  },
  {
    name: 'get-elevation',
    source: String.raw`${FN_PREFIX}get-elevation\(\s*['"]?(\d+)['"]?\s*\)`,
    replace: (_match, key) => `var(--kirby-elevation-${key})`,
  },
  {
    name: 'z',
    source: String.raw`${FN_PREFIX}z\(\s*['"]([\w-]+)['"]\s*\)`,
    replace: (_match, key) => `var(--kirby-z-index-${key})`,
  },
  {
    name: 'get-transition-duration',
    source: String.raw`${FN_PREFIX}get-transition-duration\(\s*['"]([\w-]+)['"]\s*\)`,
    replace: (_match, key) => `var(--kirby-transition-duration-${key})`,
  },
  {
    name: 'get-transition-easing',
    source: String.raw`${FN_PREFIX}get-transition-easing\(\s*['"]([\w-]+)['"]\s*\)`,
    replace: (_match, key) => `var(--kirby-transition-easing-${key})`,
  },
];

/**
 * Patterns that should NOT be autofixed (require manual migration).
 * These are reported as warnings but the source is left untouched.
 */
const SKIP_PATTERN_DEFS = [
  {
    source: String.raw`${FN_PREFIX}get-color\([^)]*\$getValueOnly\s*:\s*true[^)]*\)`,
    reason: 'get-color() with $getValueOnly: true returns a raw value for SCSS color manipulation',
  },
  {
    source: String.raw`${FN_PREFIX}get-page-content-max-width\(\s*['"]([\w-]+)['"]\s*\)`,
    reason: 'get-page-content-max-width() has no direct CSS custom property equivalent',
  },
  {
    source: String.raw`${FN_PREFIX}get-shadow-size\(\s*['"]?\d+['"]?\s*\)`,
    reason: 'get-shadow-size() is a computed value, cannot be replaced with a token',
  },
  {
    // Any fixable function call using a SCSS variable ($var) as argument
    source: String.raw`${FN_PREFIX}(?:size|icon-font-size|font-size|line-height|font-weight|border-radius|get-elevation|z|get-transition-duration|get-transition-easing)\(\s*\$[\w-]+[^)]*\)`,
    reason: 'SCSS variable argument cannot be resolved at lint time',
  },
];

/**
 * Remove unnecessary SCSS interpolation #{...} wrapping around pure CSS values.
 * After replacing a SCSS function with var(), the interpolation is no longer needed.
 *
 * Handles: `#{var(--kirby-spacing-m)}` → `var(--kirby-spacing-m)`
 * Handles: `#{calc(-1 * var(--kirby-spacing-m))}` → `calc(-1 * var(--kirby-spacing-m))`
 */
function stripUnnecessaryInterpolation(value) {
  return value.replace(/#\{(var\(--[\w-]+\))\}/g, '$1').replace(/#\{(calc\([^}]+\))\}/g, '$1');
}

/**
 * Check if a matched function call contains a SCSS variable as argument.
 */
function hasScssVariable(match) {
  return /\$[\w-]/.test(match);
}

/**
 * Collapse any run of whitespace (including newlines) to a single space.
 * Function calls captured from a value may span multiple lines; embedding that
 * raw text into a message produces a broken, multi-line string, so we
 * normalise it for display.
 */
function singleLine(text) {
  return text.replace(/\s+/g, ' ').trim();
}

/**
 * Remove CSS math functions (calc/min/max/clamp) and their contents, correctly
 * balancing nested parentheses. A naive `\([^)]*\)` fails on nested calls such
 * as `calc(var(--x) + 1px)`, stopping at the first `)` (the one closing
 * `var(...)`) and leaving `+ 1px)` behind — which then looks like Sass math.
 */
function stripCssMathFunctions(value) {
  const names = ['calc', 'min', 'max', 'clamp'];
  let result = '';
  let i = 0;

  while (i < value.length) {
    let matched = false;

    for (const name of names) {
      const startsHere = value.startsWith(name + '(', i);
      const precededByWord = i > 0 && /[\w-]/.test(value[i - 1]);

      if (startsHere && !precededByWord) {
        // Walk to the matching close paren, tracking nesting depth.
        let depth = 0;
        let j = i + name.length;
        for (; j < value.length; j++) {
          if (value[j] === '(') depth++;
          else if (value[j] === ')') {
            depth--;
            if (depth === 0) {
              j++;
              break;
            }
          }
        }
        result += ' ';
        i = j;
        matched = true;
        break;
      }
    }

    if (!matched) {
      result += value[i];
      i++;
    }
  }

  return result;
}

/**
 * Detect whether a value contains a SCSS arithmetic expression (Sass math).
 * CSS math functions (calc/min/max/clamp) use CSS operators rather than Sass
 * math, so their contents are ignored.
 */
function containsScssArithmetic(value) {
  const withoutCssMath = stripCssMathFunctions(value);
  // Multiplication or division are effectively always Sass arithmetic here.
  if (/[*/]/.test(withoutCssMath)) return true;
  // Addition or subtraction, written with the spaces Sass requires around them.
  if (/\s[+-]\s/.test(withoutCssMath)) return true;
  return false;
}

/**
 * Collect the names of every SCSS variable that participates in a SCSS
 * arithmetic expression anywhere in the stylesheet. Assigning a migrated
 * var() into such a variable would break Sass math, so those assignments
 * must be migrated manually via CSS calc().
 */
function collectVariablesUsedInCalculations(root) {
  const used = new Set();

  const scan = (value) => {
    if (!value || !value.includes('$')) return;
    if (!containsScssArithmetic(value)) return;
    const vars = value.match(/\$[\w-]+/g) || [];
    for (const name of vars) used.add(name);
  };

  // Declarations: `width: $a + $b * 2`, `$x: $a * 2`, etc.
  root.walkDecls((decl) => scan(decl.value));

  // At-rule params also carry Sass arithmetic — most notably `@return` inside
  // custom functions, but also `@if`/`@else if`/`@while` conditions. A variable
  // used there must remain a Sass value and cannot receive a migrated var().
  root.walkAtRules((atRule) => scan(atRule.params));

  return used;
}

/**
 * Decide what a single matched function call should become.
 *
 * Returns the replacement string, or `null` when the call must be left
 * untouched — either because it uses a SCSS variable argument (unresolvable at
 * lint time) or because the mapping's `replace` declined it (e.g. get-color()
 * with `$getValueOnly: true`, which returns the original call).
 *
 * This is the single home for the two guards that every mapping traversal
 * shares, so the callers below don't each re-implement them.
 */
function replacementFor({ source, replace }, call) {
  if (hasScssVariable(call)) return null;
  const replaced = call.replace(new RegExp(source), replace);
  return replaced === call ? null : replaced;
}

/**
 * Yield every migratable function call within a value as an
 * `{ original, replacement }` pair, skipping calls that resolve to no
 * replacement. This is the canonical traversal of FUNCTION_MAPPINGS; callers
 * consume it rather than re-implementing the exec/guard loop.
 */
function* iterateMigratableCalls(value) {
  for (const mapping of FUNCTION_MAPPINGS) {
    const re = new RegExp(mapping.source, 'g');
    let match;
    while ((match = re.exec(value)) !== null) {
      const original = match[0];
      const replacement = replacementFor(mapping, original);
      if (replacement === null) continue;
      yield { original, replacement };
    }
  }
}

/**
 * Find the migratable function calls within a value, excluding calls that use
 * a SCSS variable argument or otherwise resolve to no replacement.
 */
function findMigratableCalls(value) {
  return [...iterateMigratableCalls(value)].map(({ original }) => original);
}

/**
 * Compute the fully-replaced value for a declaration.
 */
function computeFixedValue(originalValue) {
  let newValue = originalValue;

  for (const mapping of FUNCTION_MAPPINGS) {
    const re = new RegExp(mapping.source, 'g');
    newValue = newValue.replace(re, (match) => replacementFor(mapping, match) ?? match);
  }

  newValue = stripUnnecessaryInterpolation(newValue);
  return newValue;
}

/** @type {import('stylelint').Rule} */
const ruleFunction = (primary) => {
  return (root, result) => {
    const validOptions = stylelintUtils.validateOptions(result, ruleName, {
      actual: primary,
      possible: [true],
    });

    if (!validOptions) return;

    // SCSS variables that feed a Sass arithmetic expression: a migrated var()
    // cannot be assigned into these without breaking Sass math.
    const variablesUsedInCalculations = collectVariablesUsedInCalculations(root);

    root.walkDecls((decl) => {
      const originalValue = decl.value;

      // Skip if no potential function call in value
      if (!originalValue.includes('(')) return;

      // A function call that participates in Sass arithmetic cannot
      // be auto-fixed: replacing it with var() would break Sass math (e.g.
      // `var(--kirby-spacing-m) * 2`). There are two ways this happens:
      //
      //   1. The call is assigned to a SCSS variable that later feeds a Sass
      //      calculation elsewhere (`$x: size('m')` then `... $x * 2`).
      //   2. The call sits directly inside a Sass arithmetic expression in this
      //      value (`$x: size('xxxs') * 0.5`).
      //
      // In both cases, report it for manual migration to CSS calc().
      const guardCalls = findMigratableCalls(originalValue);
      if (guardCalls.length > 0) {
        const feedsScssCalc =
          decl.prop.startsWith('$') && variablesUsedInCalculations.has(decl.prop);
        const valueHasBareArithmetic = containsScssArithmetic(originalValue);

        if (feedsScssCalc || valueHasBareArithmetic) {
          const fnList = singleLine(guardCalls.map(singleLine).join(', '));
          const reason = feedsScssCalc
            ? `${decl.prop} feeds a SCSS calculation — ` +
              `convert the calculation to CSS calc() using the design token(s)`
            : `used in a SCSS arithmetic expression — ` +
              `convert the calculation to CSS calc() using the design token(s)`;

          stylelintUtils.report({
            message: messages.manual(fnList, reason),
            node: decl,
            result,
            ruleName,
            word: guardCalls[0],
          });

          // Do not auto-migrate this declaration.
          return;
        }
      }

      // Check for skip patterns (report as manual migration needed)
      for (const { source, reason } of SKIP_PATTERN_DEFS) {
        const re = new RegExp(source, 'g');
        let skipMatch;
        while ((skipMatch = re.exec(originalValue)) !== null) {
          const matchedCall = singleLine(skipMatch[0]);

          stylelintUtils.report({
            message: messages.manual(matchedCall, reason),
            node: decl,
            result,
            ruleName,
            word: skipMatch[0],
          });
        }
      }

      // Check for fixable replacements
      const fixedValue = computeFixedValue(originalValue);

      if (fixedValue === originalValue) return;

      // Report each individual match with the shared fix callback
      for (const { original, replacement } of iterateMigratableCalls(originalValue)) {
        stylelintUtils.report({
          message: messages.replaced(original, replacement),
          node: decl,
          result,
          ruleName,
          word: original,
          fix: () => {
            decl.value = computeFixedValue(decl.value);
          },
        });
      }
    });
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

export default createPlugin(ruleName, ruleFunction);
