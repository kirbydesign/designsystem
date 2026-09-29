import { collectLeafTokens } from './tokens.mjs';
import { resolveRule } from './rules.mjs';

/** Check collisions by individual CSS selector, not by file or token path. */
function selectorParts(selector) {
  return selector
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
}

/** Route source and included tokens without copying the Style Dictionary tree. */
export function prepare(source, config, baseline = {}) {
  const routes = new Map();
  const emissions = [];
  const emissionIndex = new Set();
  const names = new Map();
  const sourcePaths = new Set(collectLeafTokens(source).map(({ path }) => path.join('/')));

  const rules = config.rules;
  for (const [data, emit] of [
    [baseline, false],
    [source, true],
  ]) {
    for (const { path } of collectLeafTokens(data)) {
      const pathKey = path.join('/');
      if (!emit && sourcePaths.has(pathKey)) continue;
      const match = resolveRule(rules, path, config.prefix);
      if (!match) {
        throw new Error(
          `No rule matched leaf "${pathKey}". ` +
            `Rules tried: ${rules.map((rule) => rule.id).join(', ')}. ` +
            `Add a rule, or an { ignore: true } rule to drop it deliberately.`
        );
      }
      if (match.ignored) {
        routes.set(pathKey, { name: null, emission: null });
        continue;
      }

      const { rule, variable, selector, output, section, outputReferences } = match;
      if (emit) {
        for (const part of selectorParts(selector)) {
          const slot = `${part}\u0000${variable}`;
          const clash = names.get(slot);
          if (clash && clash !== pathKey) {
            throw new Error(
              `Two leaves resolve to the duplicate variable name --${variable} under "${part}": ` +
                `"${clash}" and "${pathKey}". Adjust the rules so their names differ, ` +
                `or exclude one with an { ignore: true } rule.`
            );
          }
          names.set(slot, pathKey);
        }
      }

      const emissionKey = `${output}\u0000${rule.id}\u0000${selector}\u0000${section ?? ''}`;
      if (emit && !emissionIndex.has(emissionKey)) {
        emissions.push({ key: emissionKey, output, selector, section, outputReferences });
        emissionIndex.add(emissionKey);
      }

      routes.set(pathKey, { name: variable, selector, emission: emit ? emissionKey : null });
    }
  }

  return { routes, emissions };
}
