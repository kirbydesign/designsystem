/**
 * CLI for the Kirby design-token pipeline.
 *
 *   design-tokens --out <dir> [--config <file>]
 *                 [--in    <set>=<file...>]
 *                 [--ref   <set>=<file...>]
 *                 [--delta <set>=<file...>]
 *
 * The tool carries no design-system vocabulary. `<set>` names a rule set in the
 * config, and the config decides every variable name, selector and output file.
 * See ../README.md for usage and docs/decisions/001-design-token-system.md
 * for the rationale.
 */

import { resolve } from 'node:path';
import { loadConfig } from './config.mjs';
import { prepare } from './resolve.mjs';
import { build, readJson } from './build.mjs';

const DEFAULT_CONFIG = 'design-tokens.config.mjs';

/** CLI flag → the disposition it gives the files that follow. */
const DISPOSITIONS = { '--in': 'in', '--ref': 'ref', '--delta': 'delta' };

export const HELP = `Usage: design-tokens --out <dir> [--config <file>] [--in <set>=<file...>] [--ref <set>=<file...>] [--delta <set>=<file...>]

Turns Figma variable exports into CSS custom properties, driven entirely by a
config file of naming/routing rules.

Flags:
  --in <set>=<file...>     Load and emit these files through rule set <set>.
  --ref <set>=<file...>    Load for reference resolution only; emit nothing.
                           Populates the alias membership map and the delta
                           baseline.
  --delta <set>=<file...>  Emit only leaves flagged as overrides whose resolved
                           value differs from the --ref/--in baseline.
  --config <file>          Config module (default: ${DEFAULT_CONFIG}).
  --out <dir>              Output root (required).
  -h, --help               Show this help.

Values are space-separated and read until the next flag. All three input flags
are repeatable. <set> must name a rule set declared by the config.

Example:
  design-tokens --out dist \\
    --in <set>=<file> <file> \\
    --in <other-set>=<file>`;

/**
 * Parses `<set>=<file>` and the space-separated files that follow it.
 * @returns {{ next: number, inputs: Array<{ set, disposition, path }> }}
 */
function takeInputs(argv, start, disposition) {
  const first = argv[start];
  if (!first || first.startsWith('--') || !first.includes('=')) {
    throw new Error(`--${disposition} requires <set>=<file>, e.g. --${disposition} myset=export.json`);
  }

  const [set, firstFile] = [first.slice(0, first.indexOf('=')), first.slice(first.indexOf('=') + 1)];
  if (!set || !firstFile) {
    throw new Error(`--${disposition} requires <set>=<file>, got "${first}"`);
  }

  const inputs = [{ set, disposition, path: firstFile }];
  let i = start + 1;
  while (i < argv.length && !argv[i].startsWith('--')) {
    inputs.push({ set, disposition, path: argv[i++] });
  }
  return { next: i, inputs };
}

/** Parses argv (already sliced past node + script). */
export function parseArgs(argv) {
  const opts = { config: DEFAULT_CONFIG, out: null, inputs: [], help: false };

  let i = 0;
  const takeValue = (name) => {
    i++;
    if (i >= argv.length || argv[i].startsWith('--')) throw new Error(`${name} requires a value`);
    return argv[i++];
  };

  while (i < argv.length) {
    const arg = argv[i];
    if (arg === '-h' || arg === '--help') {
      opts.help = true;
      i++;
    } else if (arg in DISPOSITIONS) {
      const { next, inputs } = takeInputs(argv, i + 1, DISPOSITIONS[arg]);
      opts.inputs.push(...inputs);
      i = next;
    } else if (arg === '--config') {
      opts.config = takeValue('--config');
    } else if (arg === '--out') {
      opts.out = takeValue('--out');
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return opts;
}

/**
 * Runs the pipeline.
 * @returns {Promise<{ outRoot, written, warnings, ignored, deltaStats }>}
 */
export async function run(opts) {
  if (!opts.out) throw new Error('--out <dir> is required');
  if (opts.inputs.length === 0) throw new Error('Provide at least one --in, --ref or --delta input');

  const config = await loadConfig(resolve(opts.config));

  for (const { set } of opts.inputs) {
    if (!config.ruleSets[set]) {
      throw new Error(
        `Unknown rule set "${set}". Config declares: ${Object.keys(config.ruleSets).join(', ')}`,
      );
    }
  }

  const inputs = opts.inputs.map(({ set, disposition, path }) => ({
    set,
    disposition,
    data: readJson(`${disposition} (${set})`, resolve(path)),
  }));

  const outRoot = resolve(opts.out);
  const prepared = prepare(inputs, config);
  const { written, warnings } = await build(prepared.tokens, prepared.emissions, outRoot);

  return { outRoot, written, warnings, ...prepared };
}

/**
 * Renders the unresolved-alias report.
 *
 * Some targets are legitimately inline in Figma (`focus`), so this is
 * informational rather than a failure — but a long list, or a whole palette
 * scope appearing here, means an export is stale or missing.
 */
function reportUnresolved(unresolvedAliases) {
  if (unresolvedAliases.size === 0) return;

  const total = [...unresolvedAliases.values()].reduce((a, b) => a + b, 0);
  console.log(
    `\n${total} alias(es) across ${unresolvedAliases.size} target(s) did not resolve ` +
      `and were inlined as literal values:`,
  );
  for (const [target, count] of [...unresolvedAliases].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(count).padStart(4)}x  ${target}`);
  }
  console.log('  (expected for values Figma holds inline; otherwise an export is stale)\n');
}

/** CLI entry point. Returns a process exit code. */
export async function main(argv) {
  let opts;
  try {
    opts = parseArgs(argv);
  } catch (err) {
    console.error(`Error: ${err.message}\n`);
    console.error(HELP);
    return 1;
  }

  if (opts.help) {
    console.log(HELP);
    return 0;
  }

  try {
    const { outRoot, written, warnings, ignored, deltaStats, unresolvedAliases } = await run(opts);

    for (const [ruleKey, count] of ignored) {
      console.log(`Ignored ${count} leaf/leaves via rule ${ruleKey}`);
    }
    if (deltaStats.total > 0) {
      console.log(
        `Delta: ${deltaStats.included} emitted ` +
          `(${deltaStats.flagged} flagged, ${deltaStats.total} considered)`,
      );
    }
    reportUnresolved(unresolvedAliases);
    for (const warning of warnings) console.warn(`Warning: ${warning}`);
    for (const dest of written) console.log(`  ${dest} -> ${resolve(outRoot, dest)}`);
    if (written.length === 0) console.log('No output produced (no emitting inputs).');

    return 0;
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return 1;
  }
}
