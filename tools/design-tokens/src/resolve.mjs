/**
 * The load phase: everything that happens before Style Dictionary runs.
 *
 * Takes raw Figma exports plus a validated config and produces an SD-ready
 * token tree in which every leaf carries its resolved variable name, owning
 * rule and emit flag. Style Dictionary is then reduced to a name lookup and an
 * equality check on the rule key.
 *
 * The irreducible domain work lives here: mapping Figma's `com.figma.aliasData`
 * to DTCG references by membership, and computing external-theme deltas.
 */

import { collectLeafTokens, setNestedValue } from './tokens.mjs';
import { resolveRule, matchesAny } from './rules.mjs';

const ALIAS_KEY = 'com.figma.aliasData';
const SCOPES_KEY = 'com.figma.scopes';

/** Annotation keys written onto each leaf for Style Dictionary to read back. */
const NAME = 'kirby.name';
const RULE = 'kirby.rule';
const EMIT = 'kirby.emit';
const UNIT = 'kirby.unit';
const EMISSION = 'kirby.emission';

/** Flattens every input into `{ set, disposition, path, node }` entries, in order. */
function collectEntries(inputs) {
  return inputs.flatMap(({ set, disposition, data }) =>
    collectLeafTokens(data).map(({ path, node }) => ({ set, disposition, path, node })),
  );
}

/** The unit suffix for a leaf, by Figma scope or by path. Null when none applies. */
function unitFor(units, path, node) {
  const scopes = node.$extensions?.[SCOPES_KEY] ?? [];
  for (const unit of units) {
    if (scopes.some((scope) => unit.scopes.has(scope))) return unit.suffix;
    if (matchesAny(unit.paths, path)) return unit.suffix;
  }
  return null;
}

/**
 * The comparable form of a leaf's value, for delta comparison.
 * A resolved reference wins; otherwise the hex string or the raw value.
 */
function comparableValue(node, reference) {
  return reference ?? node.$value?.hex ?? node.$value;
}

/**
 * Splits a selector template result into its individual selectors.
 * `':root, .kirby-surface-base'` → `[':root', '.kirby-surface-base']`.
 *
 * Collision detection works per individual selector, because the whole point
 * of the surface contract is that one variable name is re-declared under
 * several selectors with different values. A clash only matters when two
 * different leaves declare the same name under the *same* selector — which is
 * how `:root` and `':root, .kirby-surface-base'` are caught as overlapping.
 */
function selectorParts(selector) {
  return selector
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Prepares inputs for Style Dictionary.
 *
 * @param {Array<{ set: string, disposition: 'in'|'ref'|'delta', data: object }>} inputs
 * @param {object} config validated config
 * @returns {{
 *   tokens: object,
 *   emissions: Array<{ key: string, output: string, ruleKey: string, selector: string,
 *                     section: string|null, outputReferences: boolean }>,
 *   ignored: Map<string, number>,
 *   deltaStats: { total: number, flagged: number, included: number },
 * }}
 */
export function prepare(inputs, config) {
  const { prefix, ruleSets, units, deltaFlag } = config;
  const entries = collectEntries(inputs);

  // --- Pass 1: resolve each leaf's rule ------------------------------------
  const ignored = new Map();
  const resolved = [];

  for (const entry of entries) {
    const rules = ruleSets[entry.set];
    if (!rules) throw new Error(`Input references unknown rule set "${entry.set}"`);

    const match = resolveRule(rules, entry.path, prefix);
    if (!match) {
      throw new Error(
        `No rule matched leaf "${entry.path.join('/')}" in rule set "${entry.set}". ` +
          `Rules tried: ${rules.map((r) => r.id).join(', ')}. ` +
          `Add a rule, or an { ignore: true } rule to drop it deliberately.`,
      );
    }

    const ruleKey = `${entry.set}/${match.rule.id}`;
    if (match.ignored) {
      ignored.set(ruleKey, (ignored.get(ruleKey) ?? 0) + 1);
      continue;
    }
    resolved.push({ ...entry, ...match, ruleKey });
  }

  // --- Pass 2: membership -------------------------------------------------
  // Every surviving leaf is a valid alias target. Ignored leaves are absent,
  // so an alias pointing at one falls through to its literal value.
  const membership = new Map(
    resolved.map(({ path }) => [path.join('/'), `{${path.join('.')}}`]),
  );

  // Falling back to a literal is legitimate for values Figma holds inline
  // (e.g. `focus`), but it is also what a stale or missing palette export looks
  // like. Count the misses so the caller can surface them rather than letting
  // a whole brand quietly inline itself as raw hex.
  //
  // Resolved once per leaf, here, because later passes read it more than once.
  const unresolvedAliases = new Map();
  for (const entry of resolved) {
    const target = entry.node.$extensions?.[ALIAS_KEY]?.targetVariableName;
    entry.reference = target ? (membership.get(target) ?? null) : null;
    if (target && !entry.reference) {
      unresolvedAliases.set(target, (unresolvedAliases.get(target) ?? 0) + 1);
    }
  }

  // --- Pass 3: delta baselines -------------------------------------------
  // A delta leaf is compared against the ref/in leaf at the same path in the
  // same rule set.
  const baselines = new Map();
  for (const entry of resolved) {
    if (entry.disposition === 'delta') continue;
    const key = `${entry.set}\u0000${entry.path.join('/')}`;
    baselines.set(key, comparableValue(entry.node, entry.reference));
  }

  const deltaStats = { total: 0, flagged: 0, included: 0 };

  // --- Pass 4: build the tree --------------------------------------------
  const tokens = {};
  const names = new Map();
  const emissionIndex = new Map();
  const emissions = [];

  for (const entry of resolved) {
    const { path, node, ruleKey, variable, selector, output, section, outputReferences, reference } =
      entry;

    let emit = entry.disposition === 'in';
    if (entry.disposition === 'delta') {
      deltaStats.total++;
      const isFlagged = node.$extensions?.[deltaFlag] === true;
      if (isFlagged) {
        deltaStats.flagged++;
        const key = `${entry.set}\u0000${path.join('/')}`;
        emit = baselines.get(key) !== comparableValue(node, reference);
        if (emit) deltaStats.included++;
      }
    }

    const pathKey = path.join('/');
    if (emit) {
      for (const part of selectorParts(selector)) {
        const slot = `${part}\u0000${variable}`;
        const clash = names.get(slot);
        if (clash && clash !== pathKey) {
          throw new Error(
            `Two leaves resolve to the duplicate variable name --${variable} under "${part}": ` +
              `"${clash}" and "${pathKey}". Adjust the rules so their names differ, ` +
              `or exclude one with an { ignore: true } rule.`,
          );
        }
        names.set(slot, pathKey);
      }
    }

    const unit = unitFor(units, path, node);
    // An emission is one CSS block: a distinct (file, rule, selector, section)
    // tuple. All four vary independently — one rule's templates can route to
    // many files (`primitives/{collection}.css`), many selectors
    // (`.{prefix}-surface-{surface}`) and many sections (`{category}`).
    const emissionKey = `${output}\u0000${ruleKey}\u0000${selector}\u0000${section ?? ''}`;

    if (emit && !emissionIndex.has(emissionKey)) {
      const emission = { key: emissionKey, output, ruleKey, selector, section, outputReferences };
      emissionIndex.set(emissionKey, emission);
      emissions.push(emission);
    }

    setNestedValue(tokens, path, {
      $type: node.$type,
      $value: reference ?? node.$value,
      $extensions: {
        ...node.$extensions,
        [NAME]: variable,
        [RULE]: ruleKey,
        [EMIT]: emit,
        [EMISSION]: emissionKey,
        ...(unit ? { [UNIT]: unit } : {}),
      },
    });
  }

  return { tokens, emissions, ignored, deltaStats, unresolvedAliases };
}

export const ANNOTATIONS = { NAME, RULE, EMIT, UNIT, EMISSION };
