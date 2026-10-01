import { collectLeafTokens, tokenKey } from './tokens.mjs';
import { resolveRule } from './rules.mjs';

const KEY_SEPARATOR = '\u0000';

export function splitSelectorList(selectorList) {
  return selectorList
    .split(',')
    .map((selector) => selector.trim())
    .filter(Boolean);
}

/** Route source and included tokens without copying the Style Dictionary tree. */
export function prepare(source, config, baseline = {}) {
  const sourcePaths = collectLeafTokens(source).map(({ path }) => path);
  const sourceKeys = new Set(sourcePaths.map(tokenKey));
  const baselineOnlyPaths = collectLeafTokens(baseline)
    .map(({ path }) => path)
    .filter((path) => !sourceKeys.has(tokenKey(path)));

  const routes = new Map();
  for (const path of baselineOnlyPaths) {
    const match = resolveRuleOrThrow(config, path);
    routes.set(tokenKey(path), match.ignored ? ignoredRoute() : unemittedRoute(match));
  }

  const emissionsByKey = new Map();
  const variableOwners = new Map();
  for (const path of sourcePaths) {
    const key = tokenKey(path);
    const match = resolveRuleOrThrow(config, path);
    if (match.ignored) {
      routes.set(key, ignoredRoute());
      continue;
    }
    claimVariableNamePerSelector(variableOwners, match, key);
    const emission = emissionFor(match);
    if (!emissionsByKey.has(emission.key)) emissionsByKey.set(emission.key, emission);
    routes.set(key, { name: match.variable, selector: match.selector, emission: emission.key });
  }

  return { routes, emissions: [...emissionsByKey.values()] };
}

function resolveRuleOrThrow(config, path) {
  const match = resolveRule(config.rules, path, config.prefix);
  if (match) return match;
  throw new Error(
    `No rule matched leaf "${tokenKey(path)}". ` +
      `Rules tried: ${config.rules.map((rule) => rule.id).join(', ')}. ` +
      `Add a rule, or an { ignore: true } rule to drop it deliberately.`
  );
}

function ignoredRoute() {
  return { name: null, emission: null };
}

function unemittedRoute({ variable, selector }) {
  return { name: variable, selector, emission: null };
}

function claimVariableNamePerSelector(variableOwners, { variable, selector }, key) {
  for (const singleSelector of splitSelectorList(selector)) {
    const slot = [singleSelector, variable].join(KEY_SEPARATOR);
    const owner = variableOwners.get(slot);
    if (owner && owner !== key) {
      throw new Error(
        `Two leaves resolve to the duplicate variable name --${variable} under "${singleSelector}": ` +
          `"${owner}" and "${key}". Adjust the rules so their names differ, ` +
          `or exclude one with an { ignore: true } rule.`
      );
    }
    variableOwners.set(slot, key);
  }
}

function emissionFor({ rule, output, selector, section, outputReferences }) {
  const key = [output, rule.id, selector, section ?? ''].join(KEY_SEPARATOR);
  return { key, output, selector, section, outputReferences };
}
