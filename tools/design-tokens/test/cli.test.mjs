/**
 * Tests for src/cli.mjs
 *
 * Run: node --test
 */

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseArgs, run } from '../src/cli.mjs';

describe('parseArgs', () => {
  it('collects space-separated files after --primitive and --semantic', () => {
    const opts = parseArgs([
      '--primitive', 'a.json', 'b.json',
      '--semantic', 'c.json',
      '--out', 'dist',
    ]);
    assert.deepEqual(opts.primitive, ['a.json', 'b.json']);
    assert.deepEqual(opts.semantic, ['c.json']);
    assert.equal(opts.out, 'dist');
    assert.equal(opts.override, null);
    assert.equal(opts.prefix, 'kirby');
  });

  it('reads --override and --prefix values', () => {
    const opts = parseArgs(['--override', 'theme-1', '--prefix', 'acme', '--out', 'd']);
    assert.equal(opts.override, 'theme-1');
    assert.equal(opts.prefix, 'acme');
  });

  it('sets help on -h/--help', () => {
    assert.equal(parseArgs(['--help']).help, true);
    assert.equal(parseArgs(['-h']).help, true);
  });

  it('throws on unknown arguments', () => {
    assert.throws(() => parseArgs(['--nope']), /Unknown argument: --nope/);
  });

  it('throws when a value flag is missing its value', () => {
    assert.throws(() => parseArgs(['--out']), /--out requires a value/);
    assert.throws(() => parseArgs(['--override', '--out', 'd']), /--override requires a value/);
  });
});

describe('run (integration)', () => {
  let dir;

  const primitive = {
    spacing: {
      s: { $type: 'number', $value: 16, $extensions: { 'com.figma.scopes': ['GAP'] } },
    },
    'font-weight': {
      bold: {
        $type: 'number',
        $value: 700,
        $extensions: { 'com.figma.scopes': ['FONT_STYLE'] },
      },
    },
  };

  const green500 = {
    colorSpace: 'srgb',
    components: [0.2, 0.4, 0.35],
    alpha: 1,
    hex: '#336859',
  };

  // The `system` color scope: a self-describing tree whose leaf path
  // (`system/color/green/500`) is what semantic aliases point at.
  const systemColor = {
    system: {
      color: {
        green: { 500: { $type: 'color', $value: green500 } },
      },
    },
  };

  // The `brand` color scope shares the group name `green` on purpose, but its
  // own path prefix (`brand/…`) keeps it from colliding in one :root.
  const brandGreen500 = {
    colorSpace: 'srgb',
    components: [0.76, 0.94, 0.26],
    alpha: 1,
    hex: '#C1EF43',
  };

  const brandColor = {
    brand: {
      color: {
        green: { 500: { $type: 'color', $value: brandGreen500 } },
      },
    },
  };

  const semantic = {
    base: {
      fill: {
        'base-default': {
          $type: 'color',
          $value: green500,
          $extensions: {
            'com.figma.aliasData': {
              targetVariableSetName: '08 System Palette',
              targetVariableName: 'system/color/green/500',
            },
          },
        },
      },
    },
    // The `brand` surface shares its top-level key with the `brand` color
    // scope. It must still resolve against the brand color primitive rather
    // than clobbering it.
    brand: {
      fill: {
        'brand-default': {
          $type: 'color',
          $value: brandGreen500,
          $extensions: {
            'com.figma.aliasData': {
              targetVariableSetName: '09 Default Brand Palette',
              targetVariableName: 'brand/color/green/500',
            },
          },
        },
      },
    },
  };

  // Override semantic: same token re-points at the brand scope and is flagged
  // as an override, so it differs from the default and is included in the delta.
  const overrideSemantic = {
    base: {
      fill: {
        'base-default': {
          $type: 'color',
          $value: brandGreen500,
          $extensions: {
            'com.figma.isOverride': true,
            'com.figma.aliasData': {
              targetVariableSetName: '09 Default Brand Palette',
              targetVariableName: 'brand/color/green/500',
            },
          },
        },
      },
    },
  };

  before(async () => {
    dir = await mkdtemp(join(tmpdir(), 'dt-cli-'));
    await writeFile(join(dir, 'primitive.json'), JSON.stringify(primitive));
    await writeFile(join(dir, 'system-color.json'), JSON.stringify(systemColor));
    await writeFile(join(dir, 'brand-color.json'), JSON.stringify(brandColor));
    await writeFile(join(dir, 'semantic.json'), JSON.stringify(semantic));
    await writeFile(join(dir, 'override-semantic.json'), JSON.stringify(overrideSemantic));
  });

  after(async () => {
    await rm(dir, { recursive: true, force: true });
  });

  it('requires --out', async () => {
    await assert.rejects(run(parseArgs(['--primitive', 'x.json'])), /--out <dir> is required/);
  });

  it('requires at least one input list', async () => {
    await assert.rejects(
      run(parseArgs(['--out', dir])),
      /at least one of --primitive or --semantic/,
    );
  });

  it('emits px for GAP-scoped numbers and unitless for FONT_STYLE', async () => {
    const out = join(dir, 'out-default');
    const { written } = await run(
      parseArgs(['--primitive', join(dir, 'primitive.json'), '--out', out]),
    );
    assert.ok(written.includes('primitives/spacing.css'));
    assert.ok(written.includes('primitives/font-weight.css'));

    const spacing = await readFile(join(out, 'primitives/spacing.css'), 'utf8');
    assert.match(spacing, /--kirby-spacing-s: 16px;/);

    const weight = await readFile(join(out, 'primitives/font-weight.css'), 'utf8');
    assert.match(weight, /--kirby-font-weight-bold: 700;/);
  });

  it('resolves semantic color references to the membership var()', async () => {
    const out = join(dir, 'out-semantic');
    await run(
      parseArgs([
        '--primitive', join(dir, 'system-color.json'), join(dir, 'brand-color.json'),
        '--semantic', join(dir, 'semantic.json'),
        '--out', out,
      ]),
    );
    const semanticCss = await readFile(join(out, 'semantic/color.css'), 'utf8');
    assert.match(semanticCss, /var\(--kirby-system-color-green-500\)/);
    // The `brand` surface must resolve to the brand color primitive, proving
    // the surface key did not clobber the same-named color scope.
    assert.match(semanticCss, /var\(--kirby-brand-color-green-500\)/);
    // …but the brand color primitives themselves must NOT leak as declarations
    // into the .kirby-surface-brand surface block.
    assert.doesNotMatch(semanticCss, /^\s*--kirby-brand-color-green-500:/m);
    // The base surface is the default theme: it is emitted at :root as well as
    // under its class, so the base theme applies without an explicit class.
    assert.match(semanticCss, /:root,\s*\.kirby-surface-base \{/);
    // Non-default surfaces stay class-only.
    assert.match(semanticCss, /^\.kirby-surface-brand \{/m);
    assert.doesNotMatch(semanticCss, /:root,\s*\.kirby-surface-brand/);
  });

  it('emits system and brand color scopes to separate files without colliding', async () => {
    const out = join(dir, 'out-split');
    const { written } = await run(
      parseArgs([
        '--primitive', join(dir, 'system-color.json'), join(dir, 'brand-color.json'),
        '--out', out,
      ]),
    );

    assert.ok(written.includes('primitives/system-color.css'), 'writes system color scope');
    assert.ok(written.includes('primitives/brand-color.css'), 'writes brand color scope');

    const system = await readFile(join(out, 'primitives/system-color.css'), 'utf8');
    const brand = await readFile(join(out, 'primitives/brand-color.css'), 'utf8');

    // Each scope keeps its own value under its own path-derived name.
    assert.match(system, /--kirby-system-color-green-500: #336859;/);
    assert.doesNotMatch(system, /#c1ef43/i);
    assert.match(brand, /--kirby-brand-color-green-500: #c1ef43;/);
    assert.doesNotMatch(brand, /#336859/i);
  });

  it('routes override output under overrides/<name>/ and includes the delta', async () => {
    const out = join(dir, 'out-override');
    const { outRoot, stats } = await run(
      parseArgs([
        '--override', 'theme-1',
        '--primitive', join(dir, 'system-color.json'), join(dir, 'brand-color.json'),
        '--semantic', join(dir, 'semantic.json'), join(dir, 'override-semantic.json'),
        '--out', out,
      ]),
    );
    assert.match(outRoot, /overrides\/theme-1$/);
    assert.equal(stats.included, 1);

    const semanticCss = await readFile(join(outRoot, 'semantic/color.css'), 'utf8');
    assert.match(semanticCss, /var\(--kirby-brand-color-green-500\)/);
  });
});
