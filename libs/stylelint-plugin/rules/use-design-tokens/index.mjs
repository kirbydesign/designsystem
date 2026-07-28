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
 * Function-to-CSS-custom-property mapping.
 *
 * Each entry defines:
 * - name: human-readable name of the function
 * - source: regex source string (without flags) to match the function call
 *   All patterns use (?<![\w-]) negative lookbehind to prevent matching
 *   partial function names (e.g., 'size' inside 'font-size').
 * - replace: function that receives regex match groups and returns the CSS var() string
 */
const FUNCTION_MAPPINGS = [
  {
    name: 'get-color',
    // Matches: get-color('primary'), utils.get-color('white')
    // Skips calls with $getValueOnly: true (handled by replace fn returning match)
    source: String.raw`(?<![\w-])(?:[\w-]+\.)?get-color\(\s*['"]([^'"]+)['"]\s*(?:,[^)]*)?\)`,
    replace: (match, key) => {
      if (/\$getValueOnly\s*:\s*true/.test(match)) return match;
      return `var(--kirby-${key})`;
    },
  },
  {
    name: 'get-text-color',
    // Matches: get-text-color('black'), utils.get-text-color('semi-dark')
    source: String.raw`(?<![\w-])(?:[\w-]+\.)?get-text-color\(\s*['"]([^'"]+)['"]\s*(?:,[^)]*)?\)`,
    replace: (match, key) => {
      if (/\$getValueOnly\s*:\s*true/.test(match)) return match;
      return `var(--kirby-text-color-${key})`;
    },
  },
  {
    name: 'get-decoration-color',
    // Matches: get-decoration-color('blue', 50), utils.get-decoration-color('red', 30)
    source: String.raw`(?<![\w-])(?:[\w-]+\.)?get-decoration-color\(\s*['"]([^'"]+)['"]\s*,\s*['"]?(\d+)['"]?\s*\)`,
    replace: (_match, variant, shade) => `var(--kirby-decoration-color-${variant}-${shade})`,
  },
  {
    name: 'size',
    // Matches: size('m'), utils.size('m'), size('-m'), utils.size('-m')
    // Does NOT match: font-size('m'), icon-font-size('m') (own mappings)
    source: String.raw`(?<![\w-])(?:[\w-]+\.)?size\(\s*['"](-?)([\w-]+)['"]\s*\)`,
    replace: (_match, negative, key) => {
      const varRef = `var(--kirby-spacing-${key})`;
      return negative ? `calc(-1 * ${varRef})` : varRef;
    },
  },
  {
    name: 'icon-font-size',
    // Matches: icon-font-size('sm'), utils.icon-font-size('xs')
    // Must precede the 'font-size' mapping conceptually; the (?<![\w-])
    // lookbehind on 'font-size' already prevents it from matching here.
    source: String.raw`(?<![\w-])(?:[\w-]+\.)?icon-font-size\(\s*['"]([\w-]+)['"]\s*\)`,
    replace: (_match, key) => `var(--kirby-icon-font-size-${key})`,
  },
  {
    name: 'font-size',
    // Matches: font-size('n'), utils.font-size('n')
    // Does NOT match: icon-font-size('sm') (handled by the dedicated mapping above)
    source: String.raw`(?<![\w-])(?:[\w-]+\.)?font-size\(\s*['"]([\w-]+)['"]\s*\)`,
    replace: (_match, key) => `var(--kirby-font-size-${key})`,
  },
  {
    name: 'line-height',
    source: String.raw`(?<![\w-])(?:[\w-]+\.)?line-height\(\s*['"]([\w-]+)['"]\s*\)`,
    replace: (_match, key) => `var(--kirby-line-height-${key})`,
  },
  {
    name: 'font-weight',
    source: String.raw`(?<![\w-])(?:[\w-]+\.)?font-weight\(\s*['"]([\w-]+)['"]\s*\)`,
    replace: (_match, key) => `var(--kirby-font-weight-${key})`,
  },
  {
    name: 'border-radius',
    source: String.raw`(?<![\w-])(?:[\w-]+\.)?border-radius\(\s*['"]([\w-]+)['"]\s*\)`,
    replace: (_match, key) => `var(--kirby-border-radius-${key})`,
  },
  {
    name: 'get-elevation',
    source: String.raw`(?<![\w-])(?:[\w-]+\.)?get-elevation\(\s*['"]?(\d+)['"]?\s*\)`,
    replace: (_match, key) => `var(--kirby-elevation-${key})`,
  },
  {
    name: 'z',
    // Matches: z('default'), utils.z('modal')
    // Does NOT match: z-index, dz('x')
    source: String.raw`(?<![\w-])(?:[\w-]+\.)?z\(\s*['"]([\w-]+)['"]\s*\)`,
    replace: (_match, key) => `var(--kirby-z-index-${key})`,
  },
  {
    name: 'get-transition-duration',
    source: String.raw`(?<![\w-])(?:[\w-]+\.)?get-transition-duration\(\s*['"]([\w-]+)['"]\s*\)`,
    replace: (_match, key) => `var(--kirby-transition-duration-${key})`,
  },
  {
    name: 'get-transition-easing',
    source: String.raw`(?<![\w-])(?:[\w-]+\.)?get-transition-easing\(\s*['"]([\w-]+)['"]\s*\)`,
    replace: (_match, key) => `var(--kirby-transition-easing-${key})`,
  },
];

/**
 * Patterns that should NOT be autofixed (require manual migration).
 * These are reported as warnings but the source is left untouched.
 */
const SKIP_PATTERN_DEFS = [
  {
    source: String.raw`(?<![\w-])(?:[\w-]+\.)?get-color\([^)]*\$getValueOnly\s*:\s*true[^)]*\)`,
    reason: 'get-color() with $getValueOnly: true returns a raw value for SCSS color manipulation',
  },
  {
    source: String.raw`(?<![\w-])(?:[\w-]+\.)?get-page-content-max-width\(\s*['"]([\w-]+)['"]\s*\)`,
    reason: 'get-page-content-max-width() has no direct CSS custom property equivalent',
  },
  {
    source: String.raw`(?<![\w-])(?:[\w-]+\.)?get-shadow-size\(\s*['"]?\d+['"]?\s*\)`,
    reason: 'get-shadow-size() is a computed value, cannot be replaced with a token',
  },
  {
    // Any fixable function call using a SCSS variable ($var) as argument
    source: String.raw`(?<![\w-])(?:[\w-]+\.)?(?:size|icon-font-size|font-size|line-height|font-weight|border-radius|get-elevation|z|get-transition-duration|get-transition-easing)\(\s*\$[\w-]+[^)]*\)`,
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
  return value
    .replace(/#\{(var\(--[\w-]+\))\}/g, '$1')
    .replace(/#\{(calc\([^}]+\))\}/g, '$1');
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
 * Find the migratable function calls within a value, excluding calls that use
 * a SCSS variable argument or otherwise resolve to no replacement.
 */
function findMigratableCalls(value) {
  const calls = [];
  for (const { source, replace } of FUNCTION_MAPPINGS) {
    const re = new RegExp(source, 'g');
    let match;
    while ((match = re.exec(value)) !== null) {
      if (hasScssVariable(match[0])) continue;
      const replaced = match[0].replace(new RegExp(source), replace);
      if (replaced === match[0]) continue;
      calls.push(match[0]);
    }
  }
  return calls;
}

/**
 * Compute the fully-replaced value for a declaration.
 */
function computeFixedValue(originalValue) {
  let newValue = originalValue;

  for (const { source, replace } of FUNCTION_MAPPINGS) {
    const re = new RegExp(source, 'g');
    newValue = newValue.replace(re, (match, ...args) => {
      if (hasScssVariable(match)) return match;
      return replace(match, ...args);
    });
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

      // A migratable function call that participates in Sass arithmetic cannot
      // be auto-fixed: replacing it with var() would break Sass math (e.g.
      // `var(--kirby-spacing-m) * 2`). There are two ways this happens:
      //
      //   1. The call is assigned to a SCSS variable that later feeds a Sass
      //      calculation elsewhere (`$x: size('m')` then `... $x * 2`).
      //   2. The call sits directly inside a Sass arithmetic expression in this
      //      value (`$x: size('xxxs') * 0.5`).
      //
      // In both cases, report it for manual migration to CSS calc(). The source
      // is left untouched — enforcement, not codemod.
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
      for (const { source, replace } of FUNCTION_MAPPINGS) {
        const re = new RegExp(source, 'g');
        let match;
        while ((match = re.exec(originalValue)) !== null) {
          if (hasScssVariable(match[0])) continue;

          // Compute what this specific match would be replaced with
          const replacementRe = new RegExp(source);
          const replaced = match[0].replace(replacementRe, replace);

          // Skip if replace() returned the original (e.g. $getValueOnly: true)
          if (replaced === match[0]) continue;

          stylelintUtils.report({
            message: messages.replaced(match[0], replaced),
            node: decl,
            result,
            ruleName,
            word: match[0],
            fix: () => {
              decl.value = computeFixedValue(decl.value);
            },
          });
        }
      }
    });
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

export default createPlugin(ruleName, ruleFunction);
