import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import { validateConfig } from '../src/config.mjs';
import { prepare } from '../src/resolve.mjs';

const color = (hex, extensions) => ({
  $type: 'color',
  $value: { colorSpace: 'srgb', components: [0, 0, 0], alpha: 1, hex },
  ...(extensions ? { $extensions: extensions } : {}),
});

const alias = (target) => ({ 'com.figma.aliasData': { targetVariableName: target } });

const config = (overrides = {}) =>
  validateConfig({
    prefix: 'kirby',
    ruleSets: {
      palette: [
        {
          id: 'color',
          match: '{scope}/color/**',
          variable: '{prefix}-{scope}-color-{rest}',
          output: 'primitives/{scope}-color.css',
          outputReferences: false,
        },
        { id: 'scalar', match: '{collection}/**', variable: '{prefix}-{path}', output: 'primitives/{collection}.css' },
      ],
      theme: [
        {
          id: 'surface',
          match: '{surface} surface/**',
          variable: '{prefix}-color-{rest}',
          selector: '.{prefix}-surface-{surface}',
          output: 'semantic/color.css',
        },
      ],
    },
    ...overrides,
  });

const palette = {
  system: { color: { green: { 500: color('#00FF00') } } },
};

describe('prepare — tree construction', () => {
  test('keys the tree by source path, without reshaping', () => {
    const { tokens } = prepare([{ set: 'palette', disposition: 'in', data: palette }], config());
    assert.ok(tokens.system.color.green['500']);
    assert.equal(tokens.system.color.green['500'].$type, 'color');
  });

  test('deep-merges inputs that share a top-level key', () => {
    const { tokens } = prepare(
      [
        { set: 'palette', disposition: 'in', data: { system: { color: { green: { 500: color('#0F0') } } } } },
        { set: 'palette', disposition: 'in', data: { system: { color: { red: { 500: color('#F00') } } } } },
      ],
      config(),
    );
    assert.ok(tokens.system.color.green['500']);
    assert.ok(tokens.system.color.red['500']);
  });

  test('annotates each leaf with its resolved name, rule key and emit flag', () => {
    const { tokens } = prepare([{ set: 'palette', disposition: 'in', data: palette }], config());
    const ext = tokens.system.color.green['500'].$extensions;
    assert.equal(ext['kirby.name'], 'kirby-system-color-green-500');
    assert.equal(ext['kirby.rule'], 'palette/color');
    assert.equal(ext['kirby.emit'], true);
  });

  test('preserves the original Figma $extensions alongside the annotations', () => {
    const data = { spacing: { s: { $type: 'number', $value: 16, $extensions: { 'com.figma.scopes': ['GAP'] } } } };
    const { tokens } = prepare([{ set: 'palette', disposition: 'in', data }], config());
    assert.deepEqual(tokens.spacing.s.$extensions['com.figma.scopes'], ['GAP']);
  });
});

describe('prepare — membership and aliases', () => {
  const semantic = {
    'base surface': { fill: { base: color('#00FF00', alias('system/color/green/500')) } },
  };

  test('resolves an alias whose target is a member into a DTCG reference', () => {
    const { tokens } = prepare(
      [
        { set: 'palette', disposition: 'in', data: palette },
        { set: 'theme', disposition: 'in', data: semantic },
      ],
      config(),
    );
    assert.equal(tokens['base surface'].fill.base.$value, '{system.color.green.500}');
  });

  test('keeps the literal value when the alias target is not a member', () => {
    const orphan = { 'base surface': { fill: { base: color('#123456', alias('nowhere/at/all')) } } };
    const { tokens } = prepare([{ set: 'theme', disposition: 'in', data: orphan }], config());
    assert.equal(tokens['base surface'].fill.base.$value.hex, '#123456');
  });

  test('reports unresolved alias targets, so a stale export cannot hide', () => {
    const orphan = {
      'base surface': {
        fill: {
          base: color('#123456', alias('brand/color/dark-blue/950')),
          raised: color('#123456', alias('brand/color/dark-blue/950')),
          brand: color('#000000', alias('focus')),
        },
      },
    };
    const { unresolvedAliases } = prepare([{ set: 'theme', disposition: 'in', data: orphan }], config());
    assert.equal(unresolvedAliases.get('brand/color/dark-blue/950'), 2);
    assert.equal(unresolvedAliases.get('focus'), 1);
  });

  test('reports nothing when every alias resolves', () => {
    const semantic = { 'base surface': { fill: { base: color('#0F0', alias('system/color/green/500')) } } };
    const { unresolvedAliases } = prepare(
      [
        { set: 'palette', disposition: 'in', data: palette },
        { set: 'theme', disposition: 'in', data: semantic },
      ],
      config(),
    );
    assert.equal(unresolvedAliases.size, 0);
  });

  test('membership spans rule sets, so a theme leaf can alias a palette leaf', () => {
    const { tokens } = prepare(
      [
        { set: 'palette', disposition: 'in', data: palette },
        { set: 'theme', disposition: 'in', data: semantic },
      ],
      config(),
    );
    assert.equal(typeof tokens['base surface'].fill.base.$value, 'string');
  });

  test('an alias targeting an ignored leaf falls back to its literal value', () => {
    const cfg = validateConfig({
      prefix: 'kirby',
      ruleSets: {
        palette: [
          { id: 'skip', match: 'system/color/green/**', ignore: true },
          { id: 'color', match: '{scope}/color/**', variable: '{prefix}-{scope}-color-{rest}', output: 'p/{scope}.css' },
        ],
        theme: [
          {
            id: 'surface',
            match: '{surface} surface/**',
            variable: '{prefix}-color-{rest}',
            selector: '.{prefix}-surface-{surface}',
            output: 'semantic/color.css',
          },
        ],
      },
    });
    const { tokens } = prepare(
      [
        { set: 'palette', disposition: 'in', data: palette },
        { set: 'theme', disposition: 'in', data: semantic },
      ],
      cfg,
    );
    assert.equal(tokens['base surface'].fill.base.$value.hex, '#00FF00');
  });
});

describe('prepare — ignore rules', () => {
  const cfg = () =>
    validateConfig({
      prefix: 'kirby',
      ruleSets: {
        theme: [
          { id: 'skip', match: 'font/weight/**', ignore: true },
          { id: 'group', match: '{group}/**', variable: '{prefix}-{path}', output: 's/{group}.css' },
        ],
      },
    });

  const data = {
    font: { family: { $type: 'string', $value: 'Jyske' }, weight: { light: { $type: 'number', $value: 300 } } },
  };

  test('omits ignored leaves from the tree', () => {
    const { tokens } = prepare([{ set: 'theme', disposition: 'in', data }], cfg());
    assert.ok(tokens.font.family);
    assert.equal(tokens.font.weight, undefined);
  });

  test('counts ignored leaves per rule so exclusions stay visible', () => {
    const { ignored } = prepare([{ set: 'theme', disposition: 'in', data }], cfg());
    assert.equal(ignored.get('theme/skip'), 1);
  });
});

describe('prepare — failure modes', () => {
  test('a leaf matching no rule fails, naming the path, the set and the rules tried', () => {
    const cfg = validateConfig({
      prefix: 'kirby',
      ruleSets: { palette: [{ id: 'only', match: 'a/b/c', variable: '{prefix}-x', output: 'x.css' }] },
    });
    assert.throws(
      () => prepare([{ set: 'palette', disposition: 'in', data: { zz: { yy: color('#000') } } }], cfg),
      /zz\/yy.*palette.*only/s,
    );
  });

  test('two leaves resolving to the same variable name under the same selector fail the build', () => {
    const cfg = validateConfig({
      prefix: 'kirby',
      ruleSets: {
        palette: [{ id: 'flat', match: '{a}/{b}', variable: '{prefix}-{b}', output: 'x.css' }],
      },
    });
    assert.throws(
      () =>
        prepare(
          [{ set: 'palette', disposition: 'in', data: { one: { dup: color('#000') }, two: { dup: color('#111') } } }],
          cfg,
        ),
      /duplicate variable name --kirby-dup under ":root"/,
    );
  });

  test('the same variable name under different selectors is the surface contract, not a clash', () => {
    const data = {
      'base surface': { fill: { base: color('#000') } },
      'raised surface': { fill: { base: color('#111') } },
    };
    assert.doesNotThrow(() => prepare([{ set: 'theme', disposition: 'in', data }], config()));
  });

  test('catches a clash between ":root" and a selector list containing :root', () => {
    const cfg = validateConfig({
      prefix: 'kirby',
      ruleSets: {
        palette: [{ id: 'scalar', match: '{collection}/**', variable: '{prefix}-{path}', output: 'p.css' }],
        theme: [
          {
            id: 'surface',
            match: 'base surface/**',
            variable: '{prefix}-{rest}',
            selector: ':root, .{prefix}-surface-base',
            output: 's.css',
          },
        ],
      },
    });
    assert.throws(
      () =>
        prepare(
          [
            { set: 'palette', disposition: 'in', data: { font: { weight: { light: { $type: 'number', $value: 300 } } } } },
            { set: 'theme', disposition: 'in', data: { 'base surface': { font: { weight: { light: color('#000') } } } } },
          ],
          cfg,
        ),
      /duplicate variable name --kirby-font-weight-light under ":root"/,
    );
  });

  test('a ref leaf cannot clash, because it is never emitted', () => {
    const cfg = validateConfig({
      prefix: 'kirby',
      ruleSets: {
        palette: [{ id: 'flat', match: '{a}/{b}', variable: '{prefix}-{b}', output: 'x.css' }],
      },
    });
    assert.doesNotThrow(() =>
      prepare(
        [
          { set: 'palette', disposition: 'ref', data: { one: { dup: color('#000') } } },
          { set: 'palette', disposition: 'in', data: { two: { dup: color('#111') } } },
        ],
        cfg,
      ),
    );
  });

  test('an unknown rule set is rejected', () => {
    assert.throws(() => prepare([{ set: 'nope', disposition: 'in', data: palette }], config()), /unknown rule set "nope"/);
  });
});

describe('prepare — dispositions', () => {
  test('ref leaves enter the tree but are not emitted', () => {
    const { tokens, emissions } = prepare([{ set: 'palette', disposition: 'ref', data: palette }], config());
    assert.ok(tokens.system.color.green['500']);
    assert.equal(tokens.system.color.green['500'].$extensions['kirby.emit'], false);
    assert.equal(emissions.length, 0);
  });

  test('ref leaves are still members, so an in leaf can alias them', () => {
    const semantic = { 'base surface': { fill: { base: color('#0F0', alias('system/color/green/500')) } } };
    const { tokens } = prepare(
      [
        { set: 'palette', disposition: 'ref', data: palette },
        { set: 'theme', disposition: 'in', data: semantic },
      ],
      config(),
    );
    assert.equal(tokens['base surface'].fill.base.$value, '{system.color.green.500}');
  });
});

describe('prepare — delta', () => {
  const paletteRef = {
    system: { color: { green: { 500: color('#0F0') }, red: { 500: color('#F00') } } },
  };

  const themeRef = {
    'base surface': {
      fill: {
        base: color('#0F0', alias('system/color/green/500')),
        same: color('#0F0', alias('system/color/green/500')),
      },
    },
  };

  /** Runs a delta build of `override` against the fixtures above. */
  const run = (override) =>
    prepare(
      [
        { set: 'palette', disposition: 'ref', data: paletteRef },
        { set: 'theme', disposition: 'ref', data: themeRef },
        { set: 'theme', disposition: 'delta', data: override },
      ],
      config(),
    );

  const flagged = (target, hex) => color(hex, { ...alias(target), 'com.figma.isOverride': true });

  test('emits a flagged leaf whose resolved value differs from the baseline', () => {
    const { tokens, deltaStats } = run({
      'base surface': { fill: { base: flagged('system/color/red/500', '#F00') } },
    });
    assert.equal(tokens['base surface'].fill.base.$extensions['kirby.emit'], true);
    assert.equal(tokens['base surface'].fill.base.$value, '{system.color.red.500}');
    assert.equal(deltaStats.included, 1);
  });

  test('skips a flagged leaf whose resolved value matches the baseline', () => {
    const { tokens, deltaStats } = run({
      'base surface': { fill: { same: flagged('system/color/green/500', '#0F0') } },
    });
    assert.equal(tokens['base surface'].fill.same.$extensions['kirby.emit'], false);
    assert.equal(deltaStats.flagged, 1);
    assert.equal(deltaStats.included, 0);
  });

  test('skips an unflagged leaf even when it differs', () => {
    const { tokens, deltaStats } = run({
      'base surface': { fill: { base: color('#F00', alias('system/color/red/500')) } },
    });
    assert.equal(tokens['base surface'].fill.base.$extensions['kirby.emit'], false);
    assert.equal(deltaStats.total, 1);
    assert.equal(deltaStats.flagged, 0);
    assert.equal(deltaStats.included, 0);
  });

  test('produces no emissions when nothing qualifies', () => {
    const { emissions } = run({
      'base surface': { fill: { same: flagged('system/color/green/500', '#0F0') } },
    });
    assert.equal(emissions.length, 0);
  });
});

describe('prepare — units', () => {
  const unitConfig = () =>
    validateConfig({
      prefix: 'kirby',
      units: {
        px: { scopes: ['GAP'], paths: ['background-blur/**'] },
        '%': { paths: ['transparency/**'] },
      },
      ruleSets: {
        palette: [{ id: 'scalar', match: '{collection}/**', variable: '{prefix}-{path}', output: 'p/{collection}.css' }],
      },
    });

  const num = (value, scopes) => ({
    $type: 'number',
    $value: value,
    $extensions: { 'com.figma.scopes': scopes },
  });

  test('assigns a unit by Figma scope', () => {
    const { tokens } = prepare(
      [{ set: 'palette', disposition: 'in', data: { spacing: { s: num(16, ['GAP']) } } }],
      unitConfig(),
    );
    assert.equal(tokens.spacing.s.$extensions['kirby.unit'], 'px');
  });

  test('assigns a unit by path when the scope carries no signal', () => {
    const { tokens } = prepare(
      [{ set: 'palette', disposition: 'in', data: { 'background-blur': { xl: num(110, ['ALL_SCOPES']) } } }],
      unitConfig(),
    );
    assert.equal(tokens['background-blur'].xl.$extensions['kirby.unit'], 'px');
  });

  test('supports a non-px unit', () => {
    const { tokens } = prepare(
      [{ set: 'palette', disposition: 'in', data: { transparency: { 6: num(6, ['OPACITY']) } } }],
      unitConfig(),
    );
    assert.equal(tokens.transparency['6'].$extensions['kirby.unit'], '%');
  });

  test('leaves a leaf matching no unit unannotated', () => {
    const { tokens } = prepare(
      [{ set: 'palette', disposition: 'in', data: { 'font-weight': { light: num(300, ['FONT_STYLE']) } } }],
      unitConfig(),
    );
    assert.equal(tokens['font-weight'].light.$extensions['kirby.unit'], undefined);
  });
});

describe('prepare — emissions', () => {
  test('collapses leaves sharing an output, rule and selector into one emission', () => {
    const data = {
      'base surface': { fill: { base: color('#000'), raised: color('#111') } },
    };
    const { emissions } = prepare([{ set: 'theme', disposition: 'in', data }], config());
    assert.equal(emissions.length, 1);
    assert.equal(emissions[0].output, 'semantic/color.css');
    assert.equal(emissions[0].ruleKey, 'theme/surface');
    assert.equal(emissions[0].selector, '.kirby-surface-base');
  });

  test('splits emissions when one rule yields several output files', () => {
    const cfg = validateConfig({
      prefix: 'kirby',
      ruleSets: {
        palette: [
          { id: 'scalar', match: '{collection}/**', variable: '{prefix}-{path}', output: 'primitives/{collection}.css' },
        ],
      },
    });
    const data = {
      spacing: { s: { $type: 'number', $value: 16 } },
      'border-radius': { xxs: { $type: 'number', $value: 2 } },
    };
    const { emissions } = prepare([{ set: 'palette', disposition: 'in', data }], cfg);
    assert.deepEqual(
      emissions.map((e) => e.output),
      ['primitives/spacing.css', 'primitives/border-radius.css'],
    );
  });

  test('splits emissions when one rule yields several selectors', () => {
    const cfg = validateConfig({
      prefix: 'kirby',
      ruleSets: {
        theme: [
          {
            id: 'surface',
            match: '{surface} surface/**',
            variable: '{prefix}-color-{rest}',
            selector: '.{prefix}-surface-{surface}',
            output: 'semantic/color.css',
          },
        ],
      },
    });
    const data = {
      'base surface': { fill: { base: color('#000') } },
      'raised surface': { fill: { base: color('#111') } },
    };
    const { emissions } = prepare([{ set: 'theme', disposition: 'in', data }], cfg);
    assert.deepEqual(
      emissions.map((e) => e.selector),
      ['.kirby-surface-base', '.kirby-surface-raised'],
    );
  });
});
