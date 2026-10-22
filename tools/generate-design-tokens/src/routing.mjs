import { collectLeafTokens, namedPath, referencedTokenKeys, tokenKey } from './tokens.mjs';

const KEY_SEPARATOR = '\u0000';
const ROOT_SELECTOR = ':root';

export function slug(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Whether `var(--target)` declared under `current`'s selector resolves to the target's value.
 * Only true for a `:root`-only target or a target under the same selector: any other selector
 * (e.g. a surface) may be re-declared by the surface the element is on.
 */
export function isVisibleFrom(target, current) {
  return target.selector === ROOT_SELECTOR || target.selector === current.selector;
}

function splitSelectorList(selectorList) {
  return selectorList
    .split(',')
    .map((selector) => selector.trim())
    .filter(Boolean);
}

/** Route source and included tokens without copying the Style Dictionary tree. */
export function routeTokens(source, config, baseline = {}) {
  const sourceLeaves = collectLeafTokens(source);
  const sourcePaths = sourceLeaves.map(({ path }) => path);
  const sourceKeys = new Set(sourcePaths.map(tokenKey));
  const baselineOnlyPaths = collectLeafTokens(baseline)
    .map(({ path }) => path)
    .filter((path) => !sourceKeys.has(tokenKey(path)));

  const routes = new Map();
  for (const path of baselineOnlyPaths) {
    const match = resolveRoute(config, path);
    routes.set(tokenKey(path), match.ignored ? ignoredRoute() : unemittedRoute(match));
  }

  const emissionsByKey = new Map();
  const variableOwners = new Map();
  for (const path of sourcePaths) {
    const key = tokenKey(path);
    const match = resolveRoute(config, path);
    if (match.ignored) {
      routes.set(key, ignoredRoute());
      continue;
    }
    claimVariableNamePerSelector(variableOwners, match, key);
    const emission = emissionFor(match);
    if (!emissionsByKey.has(emission.key)) emissionsByKey.set(emission.key, emission);
    routes.set(key, { name: match.variable, selector: match.selector, emission: emission.key });
  }

  assertAliasesVisible(sourceLeaves, routes);
  return { routes, emissions: [...emissionsByKey.values()] };
}

function assertAliasesVisible(sourceLeaves, routes) {
  for (const { path, node } of sourceLeaves) {
    const key = tokenKey(path);
    const current = routes.get(key);
    if (!current.name) continue;
    for (const targetKey of referencedTokenKeys(node.$value)) {
      const target = routes.get(targetKey);
      if (target?.name && !isVisibleFrom(target, current)) {
        throw new Error(
          `"${key}" (${current.selector}) aliases "${targetKey}" (${target.selector}). ` +
            `Tokens may only alias tokens under their own selector or under ${ROOT_SELECTOR} alone, ` +
            `so surfaces must not alias each other. Alias a primitive instead.`
        );
      }
    }
  }
}

/**
 * Looks up the token's Figma path in the config (a group's `$root` token gets the group path).
 * @returns {{ ignored: true }
 *   | { ignored: false, variable: string, selector: string, output: string,
 *       section: string|null, outputReferences: boolean }}
 */
function resolveRoute(config, path) {
  const route = config.route(namedPath(path));
  if (route == null) {
    throw new Error(
      `No output includes "${tokenKey(path)}". ` +
        `Add it to an output block's "include", or to "ignore" to drop it deliberately.`
    );
  }
  if (route.ignore) return { ignored: true };
  return {
    ignored: false,
    variable: route.variable.map(slug).join('-'),
    selector: route.selector ?? ROOT_SELECTOR,
    output: route.output,
    section: route.section ?? null,
    outputReferences: route.outputReferences ?? true,
  };
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
          `"${owner}" and "${key}". Adjust variableName() or the output blocks so their names ` +
          `differ, or add one of them to "ignore".`
      );
    }
    variableOwners.set(slot, key);
  }
}

function emissionFor({ output, selector, section, outputReferences }) {
  const key = [output, selector, section ?? '', outputReferences].join(KEY_SEPARATOR);
  return { key, output, selector, section, outputReferences };
}
