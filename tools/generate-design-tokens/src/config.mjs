import { existsSync } from 'node:fs';
import { posix } from 'node:path';
import { pathToFileURL } from 'node:url';

export async function loadConfig(filePath) {
  if (!existsSync(filePath)) {
    throw new Error(`Config file not found: ${filePath}`);
  }
  const module = await import(pathToFileURL(filePath).href);
  if (!module.default) {
    throw new Error(`Config file must have a default export: ${filePath}`);
  }
  return validateConfig(module.default);
}

/**
 * Checks the config and compiles it into the two lookups the pipeline uses:
 * - `route(path)`: `{ ignore: true }`, a route for the first block that includes the path,
 *   or `undefined` when nothing does.
 * - `unit(path, figmaScopes)`: the first unit that applies, or `undefined`.
 * Throws on the first invalid entry.
 */
export function validateConfig(raw) {
  if (typeof raw?.variableName !== 'function') {
    throw new Error('Config requires a "variableName(path)" function');
  }
  const ignore = validateGlobs(raw.ignore ?? [], 'ignore');
  const blocks = validateOutputs(raw.outputs);
  const units = validateUnits(raw.units);
  return {
    route: (path) => routeFor(path, { ignore, blocks, variableName: raw.variableName }),
    unit: (path, figmaScopes) => units.find((unit) => unit.appliesTo(path, figmaScopes))?.suffix,
  };
}

function routeFor(path, { ignore, blocks, variableName }) {
  const key = path.join('/');
  if (matchesAny(ignore, key)) return { ignore: true };
  const block = blocks.find(({ include }) => matchesAny(include, key));
  if (!block) return undefined;

  const variable = variableName(path);
  if (!Array.isArray(variable) || variable.length === 0) {
    throw new Error(`variableName() for "${key}" must return a non-empty array of name parts`);
  }
  return {
    variable,
    output: block.output,
    selector: block.selector,
    section: typeof block.section === 'function' ? block.section(path) : block.section,
    outputReferences: block.outputReferences,
  };
}

function matchesAny(globs, key) {
  return globs.some((glob) => posix.matchesGlob(key, glob));
}

/** `{ 'a.css': [block, …], … }` → `[{ output: 'a.css', ...block }, …]` in declaration order. */
function validateOutputs(outputs) {
  const entries = Object.entries(outputs ?? {});
  if (entries.length === 0) {
    throw new Error('Config requires "outputs": { "<file>.css": [blocks] }');
  }
  return entries.flatMap(([output, blocks]) => {
    if (!Array.isArray(blocks) || blocks.length === 0) {
      throw new Error(`outputs["${output}"] must be a non-empty array of blocks`);
    }
    return blocks.map((block, index) =>
      validateBlock(block, output, `outputs["${output}"][${index}]`)
    );
  });
}

function validateBlock(block, output, location) {
  const include = validateGlobs(block?.include, `${location}.include`);
  if (include.length === 0) throw new Error(`${location} requires a non-empty "include"`);
  if (block.selector != null && typeof block.selector !== 'string') {
    throw new Error(`${location}.selector must be a string`);
  }
  if (block.section != null && !['string', 'function'].includes(typeof block.section)) {
    throw new Error(`${location}.section must be a string or a function of the path`);
  }
  return { ...block, output, include };
}

/** `{ px: { scopes, include }, … }` → `[{ suffix, appliesTo }]` in declaration order. */
function validateUnits(units) {
  return Object.entries(units ?? {}).map(([suffix, unit]) => {
    const location = `units["${suffix}"]`;
    const scopes = unit?.scopes ?? [];
    const include = validateGlobs(unit?.include ?? [], `${location}.include`);
    if (scopes.length === 0 && include.length === 0) {
      throw new Error(`${location} must declare "scopes" or "include"`);
    }
    return {
      suffix,
      appliesTo: (path, figmaScopes) =>
        figmaScopes.some((scope) => scopes.includes(scope)) || matchesAny(include, path.join('/')),
    };
  });
}

function validateGlobs(globs, location) {
  if (!Array.isArray(globs) || !globs.every((glob) => typeof glob === 'string' && glob)) {
    throw new Error(`${location} must be an array of path globs, e.g. ['spacing/**']`);
  }
  return globs;
}
