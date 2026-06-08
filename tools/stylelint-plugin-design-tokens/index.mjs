import stylelint from 'stylelint';
import postcss from 'postcss';

const { createPlugin, utils: stylelintUtils } = stylelint;

const ruleName = 'kirby/use-design-tokens';

const messages = stylelintUtils.ruleMessages(ruleName, {
  replaced: (fn, replacement) =>
    `Replace "${fn}" with design token "${replacement}"`,
  manual: (fn, reason) =>
    `"${fn}" requires manual migration: ${reason}`,
});

const meta = {
  url: 'https://github.com/kirbydesign/designsystem',
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
    // Does NOT match: font-size('m'), icon-font-size('m')
    source: String.raw`(?<![\w-])(?:[\w-]+\.)?size\(\s*['"](-?)([\w-]+)['"]\s*\)`,
    replace: (_match, negative, key) => {
      const varRef = `var(--kirby-spacing-${key})`;
      return negative ? `calc(-1 * ${varRef})` : varRef;
    },
  },
  {
    name: 'font-size',
    // Matches: font-size('n'), utils.font-size('n')
    // Does NOT match: icon-font-size('sm')
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
 * These are reported as warnings but not changed.
 */
const SKIP_PATTERN_DEFS = [
  {
    source: String.raw`(?<![\w-])(?:[\w-]+\.)?get-color\([^)]*\$getValueOnly\s*:\s*true[^)]*\)`,
    reason: 'get-color() with $getValueOnly: true returns a raw value for SCSS color manipulation',
  },
  {
    source: String.raw`(?<![\w-])(?:[\w-]+\.)?icon-font-size\(\s*['"]([\w-]+)['"]\s*\)`,
    reason: 'icon-font-size() has no direct CSS custom property equivalent',
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
    source: String.raw`(?<![\w-])(?:[\w-]+\.)?(?:size|font-size|line-height|font-weight|border-radius|get-elevation|z|get-transition-duration|get-transition-easing)\(\s*\$[\w-]+[^)]*\)`,
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

    root.walkDecls((decl) => {
      const originalValue = decl.value;

      // Skip if no potential function call in value
      if (!originalValue.includes('(')) return;

      // Check for skip patterns (report as manual migration needed)
      for (const { source, reason } of SKIP_PATTERN_DEFS) {
        const re = new RegExp(source, 'g');
        let skipMatch;
        while ((skipMatch = re.exec(originalValue)) !== null) {
          const todoText = `TODO(@kirby): migrate ${skipMatch[0]} — ${reason}`;

          stylelintUtils.report({
            message: messages.manual(skipMatch[0], reason),
            node: decl,
            result,
            ruleName,
            word: skipMatch[0],
            fix: () => {
              // Avoid inserting duplicate TODO comments
              const prev = decl.prev();
              if (prev && prev.type === 'comment' && prev.text === todoText) {
                return;
              }
              const comment = new postcss.Comment({ text: todoText });
              comment.raws.inline = true;
              comment.raws.left = ' ';
              comment.raws.right = '';
              // Provide source position so downstream rules don't crash
              comment.source = decl.source;
              decl.parent.insertBefore(decl, comment);
            },
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
